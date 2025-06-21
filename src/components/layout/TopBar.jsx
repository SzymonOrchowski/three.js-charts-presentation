"use client";

/**
 * Renders the top navigation bar with tabs.
 * @param {object} props
 * @param {'spreadsheet' | 'visualization'} props.activeView - The currently active view.
 * @param {function(string): void} props.setActiveView - Function to set the active view.
 */
export function TopBar({ activeView, setActiveView }) {
  const baseClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors";
  const activeClasses = "bg-gray-900 text-white";
  const inactiveClasses = "text-gray-500 hover:bg-gray-200 hover:text-gray-900";

  return (
    <nav className="w-full p-4 bg-white border-b border-gray-200 flex justify-center">
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