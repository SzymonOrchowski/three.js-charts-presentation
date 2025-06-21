"use client";

import { useDispatch, useSelector } from 'react-redux';
import { loadPreset } from '../../store/chartSlice';
import * as presets from '../../data/data';

/**
 * Renders the top navigation bar with tabs and a preset loader.
 * @param {object} props
 * @param {'spreadsheet' | 'visualization'} props.activeView - The currently active view.
 * @param {function(string): void} props.setActiveView - Function to set the active view.
 */
export function TopBar({ activeView, setActiveView }) {
  const dispatch = useDispatch();
  const { activeChart } = useSelector((state) => state.chart);

  const handlePresetChange = (e) => {
    const presetName = e.target.value;
    if (presetName && presets[presetName]) {
      dispatch(loadPreset({ chartId: activeChart, presetName }));
    }
  };

  const baseClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors";
  const activeClasses = "bg-gray-900 text-white";
  const inactiveClasses = "text-gray-500 hover:bg-gray-200 hover:text-gray-900";

  return (
    <nav className="w-full p-4 bg-white border-b border-gray-200 flex justify-center items-center relative">
      <div className="absolute left-4">
        <label htmlFor="preset-select" className="mr-2 text-sm font-medium text-gray-700">Load Preset:</label>
        <select id="preset-select" onChange={handlePresetChange} className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          <option value="chart1">Chart 1</option>
          <option value="chart2">Chart 2</option>
        </select>
      </div>

      <div className="flex space-x-4 p-1 bg-gray-100 rounded-lg">
        <button
          onClick={() => setActiveView('spreadsheet')}
          className={`${baseClasses} ${activeView === 'spreadsheet' ? activeClasses : inactiveClasses}`}
        >
          Spreadsheet
        </button>
        <button
          onClick={() => setActiveView('visualization')}
          className={`${baseClasses} ${activeView === 'visualization' ? activeClasses : inactiveClasses}`}
        >
          Visualization
        </button>
      </div>
    </nav>
  );
}