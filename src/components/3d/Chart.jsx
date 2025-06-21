"use client";

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Bar } from './Bar';
import { AxesAndLabels } from './AxesAndLabels'; // Import the new component

export function Chart({ rowIndex }) {
  const { currentChartData } = useSelector((state) => state.chart);

  const chartData = useMemo(() => {
    if (!currentChartData || !currentChartData.data[rowIndex]) return null;

    const BAR_SPACING = 0.75;
    const values = currentChartData.data[rowIndex].values;
    const chartWidth = (values.length - 1) * BAR_SPACING;
    const horizontalShift = chartWidth / 2;

    return { 
      values, 
      columnNames: currentChartData.columnNames,
      valueLabels: currentChartData.valueLabels,
      BAR_SPACING, 
      horizontalShift 
    };
  }, [currentChartData, rowIndex]);

  if (!chartData) return null; 

  return (
    <group position={[-chartData.horizontalShift, -2.5, 0]}>
      <AxesAndLabels 
        columnNames={chartData.columnNames}
        valueLabels={chartData.valueLabels}
        barSpacing={chartData.BAR_SPACING}
      />
      {chartData.values.map((value, index) => {
        const height = parseFloat(value) / 10 || 0;
        const xPosition = index * chartData.BAR_SPACING;
        
        return (
          <Bar
            key={index}
            position={[xPosition, 0, 0]} // Base of the bar is at y=0
            height={height}
            color="#5555ff"
          />
        );
      })}
    </group>
  );
}