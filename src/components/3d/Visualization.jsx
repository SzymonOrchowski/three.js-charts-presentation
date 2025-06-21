"use client";

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDifferenceMode } from '../../store/chartSlice'; // Import the new action
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Chart } from './Chart'; // Import our new Chart component

export function Visualization() {
  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const dispatch = useDispatch();
  // Get the new states from Redux
  const { dataRowCount, isDifferenceMode } = useSelector((state) => ({
    dataRowCount: state.chart.currentChartData?.data.length || 0,
    isDifferenceMode: state.chart.isDifferenceMode,
  }));

  const handleNext = () => {
    setCurrentRowIndex((prevIndex) => Math.min(prevIndex + 1, dataRowCount - 1));
  };

  const handlePrev = () => {
    setCurrentRowIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className="w-full h-full relative">
      {/* UI for navigating between data rows */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex gap-4">
        <button onClick={handlePrev} disabled={currentRowIndex === 0} className="px-4 py-2 bg-white rounded-md shadow disabled:opacity-50">Prev</button>
        <button
          onClick={() => dispatch(toggleDifferenceMode())}
          className="px-4 py-2 bg-white rounded-md shadow"
        >
          {isDifferenceMode ? 'Hide Difference' : 'Show Difference'}
        </button>
        <button onClick={handleNext} disabled={currentRowIndex >= dataRowCount - 1} className="px-4 py-2 bg-white rounded-md shadow disabled:opacity-50">Next</button>
      </div>

      <Canvas
        shadows
        camera={{
          position: [0, 2, 12],
          fov: 35,
        }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight
          position={[3.5, 5, 4]}
          intensity={3}
          castShadow
        />
        <Environment preset="city" />
        <OrbitControls makeDefault />

        {/* Render the chart with the currently selected row index */}
        <Chart rowIndex={currentRowIndex} />
      </Canvas>
    </div>
  );
}