"use client";

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

/**
 * Renders a full-featured, editable spreadsheet.
 */
export function Spreadsheet() {
  const dispatch = useDispatch();
  const { chart1: chartData, activeChart } = useSelector((state) => state.chart);

  // --- Handlers ---
  const handleValueChange = (rowIndex, valueIndex, event) => {
    dispatch(updateCellValue({ chartId: activeChart, rowIndex, valueIndex, newValue: event.target.value }));
  };

  const handleColumnNameChange = (columnIndex, event) => {
    dispatch(updateColumnName({ chartId: activeChart, columnIndex, newName: event.target.value }));
  };
  
  const handleRowNameChange = (rowIndex, event) => {
    dispatch(updateRowName({ chartId: activeChart, rowIndex, newName: event.target.value }));
  };

  // --- Add/Delete Handlers ---
  const onAddColumn = (index) => dispatch(addColumn({ chartId: activeChart, columnIndex: index }));
  const onDeleteColumn = (index) => dispatch(deleteColumn({ chartId: activeChart, columnIndex: index }));
  const onAddRow = (index) => dispatch(addRow({ chartId: activeChart, rowIndex: index }));
  const onDeleteRow = (index) => dispatch(deleteRow({ chartId: activeChart, rowIndex: index }));

  if (!chartData) return <div>Loading...</div>;

  const inputBaseStyles = "w-full h-full p-2 bg-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none";

  return (
    <div className="p-4 sm:p-8 h-full overflow-auto bg-gray-50">
      <div className="max-w-full mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-slate-800">Spreadsheet</h1>
        <div className="overflow-auto h-[calc(100vh-12rem)] shadow-md rounded-lg border border-slate-300">
          <table className="min-w-full text-sm border-collapse">
            <thead className="bg-slate-200">
              <tr>
                <th className="sticky top-0 left-0 z-20 w-40 border-b border-slate-300 bg-slate-200"></th>
                {chartData.columnNames.map((name, colIndex) => (
                  <th key={colIndex} className="sticky top-0 z-10 w-32 p-0 border-b border-l border-slate-300 font-semibold bg-slate-200">
                    <div className="flex items-center justify-between px-1">
                      <input type="text" value={name} onChange={(e) => handleColumnNameChange(colIndex, e)} className={`${inputBaseStyles} text-center font-semibold text-slate-700`} />
                      <ContextMenu options={[
                        { label: 'Insert left', action: () => onAddColumn(colIndex) },
                        { label: 'Insert right', action: () => onAddColumn(colIndex + 1) },
                        { label: 'Delete column', action: () => onDeleteColumn(colIndex) },
                      ]} />
                    </div>
                  </th>
                ))}
                {/* Add new column button */}
                <th className="sticky top-0 z-10 p-0 border-b border-l border-slate-300 bg-slate-200">
                  <button onClick={() => onAddColumn(chartData.columnNames.length)} className="w-full h-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-300">+</button>
                </th>
              </tr>
            </thead>
            <tbody>
              {chartData.data.map((row, rowIndex) => {
                const rowContextMenuOptions = [
                  { label: 'Insert above', action: () => onAddRow(rowIndex) },
                  { label: 'Insert below', action: () => onAddRow(rowIndex + 1) },
                  { label: 'Delete row', action: () => onDeleteRow(rowIndex) },
                ];

                return (
                  <tr key={rowIndex} className="group hover:bg-slate-100">
                    <td className="sticky left-0 z-10 w-40 p-0 border-b border-l border-slate-300 bg-slate-200 group-hover:bg-slate-300">
                       <div className="flex items-center justify-between px-1">
                        <input type="text" value={row.name} onChange={(e) => handleRowNameChange(rowIndex, e)} className={`${inputBaseStyles} font-semibold text-slate-700`} />
                        <ContextMenu options={rowContextMenuOptions} />
                       </div>
                    </td>
                    {row.values.map((value, valueIndex) => {
                      const isValid = value === '' || (!isNaN(parseFloat(value)) && isFinite(value));
                      return (
                        <td key={valueIndex} className="w-32 p-0 border-b border-l border-slate-300">
                          <input
                            type="text" // Change to text to allow any input
                            value={value}
                            onChange={(e) => handleValueChange(rowIndex, valueIndex, e)}
                            className={`${inputBaseStyles} text-right font-mono ${!isValid ? 'ring-2 ring-red-400' : ''}`}
                          />
                        </td>
                      );
                    })}
                     <td className="border-b border-l border-slate-300"></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Add new row button */}
          <button onClick={() => onAddRow(chartData.data.length)} className="sticky bottom-0 left-0 w-40 h-8 flex items-center justify-center text-sm font-semibold bg-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-300 border-t border-l border-slate-300">
            + Add Row
          </button>
        </div>
      </div>
    </div>
  );
}