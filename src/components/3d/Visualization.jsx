"use client";

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDifferenceMode } from '../../store/chartSlice';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Chart } from './Chart';
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import { AnimatedGradientBackground } from '../layout/AnimatedGradientBackground';

export function Visualization() {
  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const dispatch = useDispatch();
  
  // MODIFIED: Select the full chart data object to access the row name
  const { chartData, isDifferenceMode } = useSelector((state) => ({
      chartData: state.chart.currentChartData,
      isDifferenceMode: state.chart.isDifferenceMode,
  }));

  // Safely get the number of rows and the current row's name
  const dataRowCount = chartData?.data?.length || 0;
  const currentRowName = chartData?.data?.[currentRowIndex]?.name || 'Loading...';

  const handleNext = () => {
    setCurrentRowIndex((prevIndex) => Math.min(prevIndex + 1, dataRowCount - 1));
  };

  const handlePrev = () => {
    setCurrentRowIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };
  
  const buttonClasses = "px-4 py-2 bg-gray-800/50 text-gray-200 rounded-md shadow-lg border border-gray-700 hover:bg-gray-700 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="w-full h-full relative">
      <AnimatedGradientBackground />
      
      {/* --- NEW: DIV FOR CURRENT ROW NAME --- */}
      <div className="absolute top-4 left-4 z-10">
        <div className={`px-4 py-2 text-gray-200 rounded-md shadow-lg border border-gray-700 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 text-2xl font-semibold bg-[rgba(255,255,255,0.025)]`}>
          {currentRowName}
        </div>
      </div>

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
        gl={{
          alpha: true,
          antialias: true,
        }}
        dpr={[1, 2]} 
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