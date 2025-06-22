"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateCellValue,
  updateColumnName,
  updateRowName,
  addColumn,
  deleteColumn,
  addRow,
  deleteRow
} from '../../store/chartSlice';
import { ContextMenu } from '../layout/ContextMenu';
import { ResizableHeader } from './ResizableHeader';
import { AnimatedGradientBackground } from '../layout/AnimatedGradientBackground';

/**
 * Renders a modern, semi-transparent ("glassmorphism") spreadsheet.
 */
export function Spreadsheet() {
  const dispatch = useDispatch();
  const { chartData } = useSelector((state) => ({
    chartData: state.chart.currentChartData,
  }));
  
  const [columnWidths, setColumnWidths] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    if (chartData?.columnNames) {
      setColumnWidths([160, ...Array(chartData.columnNames.length).fill(128)]);
    }
  }, [chartData?.columnNames.length]);

  const handleValueChange = (rowIndex, valueIndex, event) => {
    dispatch(updateCellValue({ rowIndex, valueIndex, newValue: event.target.value }));
  };
  const handleColumnNameChange = (columnIndex, event) => {
    dispatch(updateColumnName({ columnIndex, newName: event.target.value }));
  };
  const handleRowNameChange = (rowIndex, event) => {
    dispatch(updateRowName({ rowIndex, newName: event.target.value }));
  };
  const onAddColumn = (index) => dispatch(addColumn({ columnIndex: index }));
  const onDeleteColumn = (index) => dispatch(deleteColumn({ columnIndex: index }));
  const onAddRow = (index) => dispatch(addRow({ rowIndex: index }));
  const onDeleteRow = (index) => dispatch(deleteRow({ rowIndex: index }));
  const handleColumnResize = useCallback((columnIndex, newWidth) => {
    setColumnWidths(currentWidths => {
      const newWidths = [...currentWidths];
      newWidths[columnIndex + 1] = newWidth;
      return newWidths;
    });
  }, []);
  const handleAutoResizeColumn = useCallback((columnIndex) => {
    if (!chartData) return;
    const headerText = chartData.columnNames[columnIndex] || '';
    const dataTexts = chartData.data.map(row => String(row.values[columnIndex] || ''));
    const longestText = [headerText, ...dataTexts].reduce((a, b) => (a.length > b.length ? a : b), '');
    const newWidth = Math.max(80, (longestText.length * 8) + 40);
    handleColumnResize(columnIndex, newWidth);
  }, [chartData, handleColumnResize]);
  
  if (!chartData || columnWidths.length === 0) return (
    <div className="w-full h-full relative">
      <AnimatedGradientBackground />
      <div className="flex items-center justify-center h-full text-white">Loading...</div>
    </div>
  );

  const inputBaseStyles = "w-full h-full p-2 bg-transparent focus:bg-slate-700/50 focus:ring-2 focus:ring-blue-500 focus:outline-none";
  const dataInputStyles = "w-full h-full p-2 bg-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-right font-mono text-gray-800";

  return (
    <div className="w-full h-full p-4 sm:p-8 relative">
      <AnimatedGradientBackground />
      
      <div className="max-w-full mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-slate-100">Spreadsheet</h1>
        <div className="overflow-auto h-[calc(100vh-12rem)] rounded-lg border border-slate-700 bg-slate-800/50 backdrop-blur-lg">
          <table className="min-w-full text-sm border-collapse">
            <colgroup>
              {columnWidths.map((width, index) => (
                <col key={index} style={{ width: `${width}px` }} />
              ))}
              <col />
            </colgroup>
            
            <thead className="bg-slate-900/60">
              <tr>
                <th className="sticky top-0 left-0 z-20 p-0 border-b border-r border-slate-700 bg-slate-900/60"></th>
                {chartData.columnNames.map((name, colIndex) => (
                  <th key={colIndex} className="sticky top-0 z-10 p-0 border-b border-l border-slate-700 font-semibold bg-slate-900/60">
                    <ResizableHeader onResize={(newWidth) => handleColumnResize(colIndex, newWidth)} onAutoResize={() => handleAutoResizeColumn(colIndex)}>
                      <div className="flex items-center justify-between px-1 h-full">
                        <input type="text" value={name} onChange={(e) => handleColumnNameChange(colIndex, e)} className={`${inputBaseStyles} text-center font-semibold text-slate-200`} />
                        <ContextMenu options={[{ label: 'Insert left', action: () => onAddColumn(colIndex) }, { label: 'Insert right', action: () => onAddColumn(colIndex + 1) }, { label: 'Delete column', action: () => onDeleteColumn(colIndex) }]} />
                      </div>
                    </ResizableHeader>
                  </th>
                ))}
                <th className="sticky top-0 z-10 p-0 border-b border-l border-slate-700 bg-slate-900/60 w-8">
                  <button onClick={() => onAddColumn(chartData.columnNames.length)} className="w-full h-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/50">+</button>
                </th>
              </tr>
            </thead>
            
            <tbody>
              {chartData.data.map((row, rowIndex) => {
                const isValidValue = (val) => val === '' || (!isNaN(parseFloat(val)) && isFinite(val));
                return (
                  <tr key={rowIndex} className="hover:bg-slate-700/60 even:bg-slate-800/40">
                    <td className="sticky left-0 z-10 p-0 border-b border-r border-slate-700 bg-slate-900/60 group-hover:bg-slate-800/80">
                       <div className="flex items-center justify-between px-1 h-full">
                        <input type="text" value={row.name} onChange={(e) => handleRowNameChange(rowIndex, e)} className={`${inputBaseStyles} font-semibold text-slate-200`} />
                        <ContextMenu options={[{ label: 'Insert above', action: () => onAddRow(rowIndex) }, { label: 'Insert below', action: () => onAddRow(rowIndex + 1) }, { label: 'Delete row', action: () => onDeleteRow(rowIndex) }]} />
                       </div>
                    </td>
                    {row.values.map((value, valueIndex) => (
                      <td key={valueIndex} className="p-0 border-b border-l border-slate-700">
                        <input type="text" value={value} onChange={(e) => handleValueChange(rowIndex, valueIndex, e)} className={`${inputBaseStyles} text-right font-mono text-slate-100 ${!isValidValue(value) ? 'ring-2 ring-red-500' : ''}`} />
                      </td>
                    ))}
                     <td className="border-b border-l border-slate-700"></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button onClick={() => onAddRow(chartData.data.length)} className="sticky bottom-0 left-0 h-8 flex items-center justify-center text-sm font-semibold bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-700/80 border-t border-r border-slate-700" style={{width: `${columnWidths[0]}px`}}>
            + Add Row
          </button>
        </div>
      </div>
    </div>
  );
}