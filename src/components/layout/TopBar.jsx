"use client";

import { useDispatch, useSelector } from 'react-redux';
import { loadPreset, addPreset } from '../../store/chartSlice';
import { useState } from 'react';

export function TopBar({ activeView, setActiveView }) {
  const dispatch = useDispatch();
  const { presetNames, activePresetName } = useSelector((state) => state.chart);
  const [showTooltip, setShowTooltip] = useState(false);

  const handlePresetChange = (e) => {
    dispatch(loadPreset(e.target.value));
  };

  const handleAddPreset = () => {
    dispatch(addPreset());
  };

  // Dark mode styles
  const baseClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors";
  const activeClasses = "bg-blue-600 text-white";
  const inactiveClasses = "text-gray-300 hover:bg-gray-700";
  const buttonClasses = "w-8 h-8 flex items-center justify-center rounded-md text-lg text-gray-300 hover:bg-gray-700 transition-colors";

  return (
    <nav className="w-full p-2 bg-gray-900 border-b border-slate-700 flex justify-center items-center relative">
      <div className="absolute left-4 flex items-center gap-2">
        <label htmlFor="preset-select" className="mr-2 text-sm font-medium text-gray-400">Load Preset:</label>
        
        <select 
          id="preset-select" 
          value={activePresetName} 
          onChange={handlePresetChange} 
          className="mr-2 rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
        >
          {presetNames.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
        
        <button onClick={handleAddPreset} className="w-6 h-6 flex items-center justify-center rounded-md border border-gray-400 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors font-bold">
          +
        </button>
      </div>

      <div className="flex space-x-2 p-1 bg-gray-800 rounded-lg">
        <button
          onClick={() => setActiveView('visualization')}
          className={`${baseClasses} ${activeView === 'visualization' ? activeClasses : inactiveClasses}`}
        >
          Visualization
        </button>
        <button
          onClick={() => setActiveView('spreadsheet')}
          className={`${baseClasses} ${activeView === 'spreadsheet' ? activeClasses : inactiveClasses}`}
        >
          Spreadsheet
        </button>
      </div>

      <div className="absolute top-1/2 right-4 -translate-y-1/2">
        <div
          className="relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <button className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-400 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors font-bold">
            ?
          </button>
          {showTooltip && (
                  <div className="absolute top-full right-0 mt-2 w-80 p-4 bg-gray-800 text-slate-200 text-sm rounded-lg shadow-lg z-50 border border-slate-700">
                      <h4 className="font-bold mb-2 text-base">Welcome to the Interactive Chart!</h4>
                      <div className="space-y-3">
                        <p>
                          This application demonstrates how data from a spreadsheet can be rendered as an interactive 3D bar chart.
                        </p>
                        <p>
                          In the 3D view, the 'Prev' and 'Next' buttons let you step through the different rows of data from your spreadsheet. Activate 'Show Difference' to instantly see how the values have changed compared to the previous row.
                        </p>
                         <p>
                          This is a front-end demonstration only. Any changes you make or new presets you create are stored just for your current session and will be lost when you refresh the page.
                        </p>
                      </div>
                  </div>
              )}
        </div>
      </div>
    </nav>
  );
}