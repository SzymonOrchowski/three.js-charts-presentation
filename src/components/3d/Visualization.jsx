"use client";

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDifferenceMode } from '../../store/chartSlice';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Chart } from './Chart';

export function Visualization() {
  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const dispatch = useDispatch();
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
    // MODIFIED: Added a 'chart-background' class for the paper texture
    <div className="w-full h-full relative chart-background">
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
        gl={{ alpha: true }} 
        camera={{
          position: [0, 2, 12],
          fov: 35,
        }}
      >
        {/* --- REPLICATION OF ORIGINAL LIGHTING --- */}
        {/* Replaced <Environment> with the original ambient and directional light setup */}
        <ambientLight intensity={2} />
        <directionalLight
          position={[3.5, 2, 1.25]}
          intensity={3}
        />
        
        <OrbitControls makeDefault />

        <Chart rowIndex={currentRowIndex} />
      </Canvas>
    </div>
  );
}