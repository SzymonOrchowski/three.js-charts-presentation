"use client";

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDifferenceMode } from '../../store/chartSlice';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Chart } from './Chart';
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';

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

  // Dark mode button styles
  const buttonClasses = "px-4 py-2 bg-gray-800 text-gray-200 rounded-md shadow-lg border border-gray-700 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    // Removed 'chart-background' and set a solid dark color
    <div className="w-full h-full relative bg-gray-900">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex gap-4">
        <button onClick={handlePrev} disabled={currentRowIndex === 0} className={buttonClasses}>Prev</button>
        <button 
          onClick={() => dispatch(toggleDifferenceMode())}
          className={buttonClasses}
        >
          {isDifferenceMode ? 'Hide Difference' : 'Show Difference'}
        </button>
        <button onClick={handleNext} disabled={currentRowIndex >= dataRowCount - 1} className={buttonClasses}>Next</button>
      </div>

      <Canvas
        flat
        camera={{
          position: [0, 2, 12],
          fov: 35,
        }}
      >
        <EffectComposer>
          <Bloom 
            intensity={1.0}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.2}
            mipmapBlur={true}
            radius={0.7}
          />
          <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        </EffectComposer>

        <ambientLight intensity={0.1} />
        <directionalLight
          position={[3.5, 2, 1.25]}
          intensity={0.2}
        />
        
        <OrbitControls makeDefault />
        <Chart rowIndex={currentRowIndex} />
      </Canvas>
    </div>
  );
}