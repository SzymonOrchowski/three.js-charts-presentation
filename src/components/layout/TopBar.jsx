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

  // Dark mode styles for the tabs
  const baseClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors";
  const activeClasses = "bg-blue-600 text-white";
  const inactiveClasses = "text-gray-300 hover:bg-gray-700";

  return (
    // Updated nav background and border color
    <nav className="w-full p-2 bg-gray-900 border-b border-gray-700 flex justify-center items-center relative">
      <div className="absolute left-4">
        <label htmlFor="preset-select" className="mr-2 text-sm font-medium text-gray-400">Load Preset:</label>
        {/* Updated select styles for dark mode */}
        <select 
          id="preset-select" 
          value={activePresetName} 
          onChange={handlePresetChange} 
          className="rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {presetNames.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      {/* Updated tab container background */}
      <div className="flex space-x-2 p-1 bg-gray-800 rounded-lg">
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