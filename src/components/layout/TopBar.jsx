"use client";

import { useDispatch, useSelector } from 'react-redux';
import { loadPreset } from '../../store/chartSlice';

export function TopBar({ activeView, setActiveView }) {
  const dispatch = useDispatch();
  // Get the list of preset names and the currently active one from the store
  const { presetNames, activePresetName } = useSelector((state) => state.chart);

  const handlePresetChange = (e) => {
    dispatch(loadPreset(e.target.value));
  };

  const baseClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors";
  const activeClasses = "bg-gray-900 text-white";
  const inactiveClasses = "text-gray-500 hover:bg-gray-200 hover:text-gray-900";

  return (
    <nav className="w-full p-4 bg-white border-b border-gray-200 flex justify-center items-center relative">
      <div className="absolute left-4">
        <label htmlFor="preset-select" className="mr-2 text-sm font-medium text-gray-600">Load Preset:</label>
        <select 
          id="preset-select" 
          value={activePresetName} 
          onChange={handlePresetChange} 
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
        >
          {presetNames.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
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