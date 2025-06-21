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

/**
 * Renders a full-featured, editable spreadsheet with resizable columns.
 */
export function Spreadsheet() {
  const dispatch = useDispatch();
  const { currentChartData: chartData } = useSelector((state) => state.chart);
  
  const [columnWidths, setColumnWidths] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    if (chartData?.columnNames) {
      setColumnWidths(currentWidths => {
          const newWidths = [currentWidths[0] || 160];
          for (let i = 0; i < chartData.columnNames.length; i++) {
              newWidths.push(currentWidths[i + 1] || 128);
          }
          return newWidths;
      });
    }
  }, [chartData?.columnNames.length]);

  const handleValueChange = (rowIndex, valueIndex, event) => {
    dispatch(updateCellValue({ chartId: activeChart, rowIndex, valueIndex, newValue: event.target.value }));
  };
  const handleColumnNameChange = (columnIndex, event) => {
    dispatch(updateColumnName({ chartId: activeChart, columnIndex, newName: event.target.value }));
  };
  const handleRowNameChange = (rowIndex, event) => {
    dispatch(updateRowName({ chartId: activeChart, rowIndex, newName: event.target.value }));
  };
  const onAddColumn = (index) => dispatch(addColumn({ chartId: activeChart, columnIndex: index }));
  const onDeleteColumn = (index) => dispatch(deleteColumn({ chartId: activeChart, columnIndex: index }));
  const onAddRow = (index) => dispatch(addRow({ chartId: activeChart, rowIndex: index }));
  const onDeleteRow = (index) => dispatch(deleteRow({ chartId: activeChart, rowIndex: index }));
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
  
  if (!chartData || columnWidths.length === 0) return <div>Loading...</div>;

  const inputBaseStyles = "w-full h-full p-2 bg-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none";
  // --- THIS LINE IS CHANGED ---
  const dataInputStyles = "w-full h-full p-2 bg-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-right font-mono text-gray-800";

  return (
    <div className="p-4 sm:p-8 h-full overflow-auto bg-gray-50">
      <div className="max-w-full mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-slate-800">Spreadsheet</h1>
        <div className="overflow-auto h-[calc(100vh-12rem)] shadow-md rounded-lg border border-slate-300">
          <table className="text-sm border-collapse table-fixed">
            <colgroup>
              {columnWidths.map((width, index) => (
                <col key={index} style={{ width: `${width}px` }} />
              ))}
              <col />
            </colgroup>
            
            <thead className="bg-slate-200">
              <tr>
                <th className="sticky top-0 left-0 z-20 p-0 border-b border-r border-slate-300 bg-slate-200"></th>
                {chartData.columnNames.map((name, colIndex) => (
                  <th key={colIndex} className="sticky top-0 z-10 p-0 border-b border-l border-slate-300 font-semibold bg-slate-200">
                    <ResizableHeader
                      onResize={(newWidth) => handleColumnResize(colIndex, newWidth)}
                      onAutoResize={() => handleAutoResizeColumn(colIndex)}
                    >
                      <div className="flex items-center justify-between px-1 h-full">
                        <input type="text" value={name} onChange={(e) => handleColumnNameChange(colIndex, e)} className={`${inputBaseStyles} text-center font-semibold text-slate-700`} />
                        <ContextMenu options={[
                          { label: 'Insert left', action: () => onAddColumn(colIndex) },
                          { label: 'Insert right', action: () => onAddColumn(colIndex + 1) },
                          { label: 'Delete column', action: () => onDeleteColumn(colIndex) },
                        ]} />
                      </div>
                    </ResizableHeader>
                  </th>
                ))}
                <th className="sticky top-0 z-10 p-0 border-b border-l border-slate-300 bg-slate-200 w-8">
                  <button onClick={() => onAddColumn(chartData.columnNames.length)} className="w-full h-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-300">+</button>
                </th>
              </tr>
            </thead>
            
            <tbody>
              {chartData.data.map((row, rowIndex) => (
                <tr key={rowIndex} className="group hover:bg-slate-100">
                  <td className="sticky left-0 z-10 p-0 border-b border-r border-slate-300 bg-slate-200 group-hover:bg-slate-300">
                     <div className="flex items-center justify-between px-1 h-full">
                      <input type="text" value={row.name} onChange={(e) => handleRowNameChange(rowIndex, e)} className={`${inputBaseStyles} font-semibold text-slate-700`} />
                      <ContextMenu options={[
                        { label: 'Insert above', action: () => onAddRow(rowIndex) },
                        { label: 'Insert below', action: () => onAddRow(rowIndex + 1) },
                        { label: 'Delete row', action: () => onDeleteRow(rowIndex) },
                      ]} />
                     </div>
                  </td>
                  {row.values.map((value, valueIndex) => {
                    const isValid = value === '' || (!isNaN(parseFloat(value)) && isFinite(value));
                    return (
                      <td key={valueIndex} className="p-0 border-b border-l border-slate-300">
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleValueChange(rowIndex, valueIndex, e)}
                          className={`${dataInputStyles} ${!isValid ? 'ring-2 ring-red-400' : ''}`}
                        />
                      </td>
                    );
                  })}
                   <td className="border-b border-l border-slate-300"></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => onAddRow(chartData.data.length)} className="sticky bottom-0 left-0 h-8 flex items-center justify-center text-sm font-semibold bg-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-300 border-t border-r border-slate-300" style={{width: `${columnWidths[0]}px`}}>
            + Add Row
          </button>
        </div>
      </div>
    </div>
  );
}