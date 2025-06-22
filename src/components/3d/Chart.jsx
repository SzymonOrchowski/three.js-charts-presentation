"use client";

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Bar } from './Bar';
import { AxesAndLabels } from './AxesAndLabels';
import { BarWithDelta } from './BarWithDelta';
import { Edges } from '@react-three/drei';
import { getChartScale } from '../../utils/scaling';

// A constant defining the total height of our chart in the 3D scene
const CHART_MAX_HEIGHT = 5;
const MIN_BAR_HEIGHT = 0.01; // The minimum height for a bar

export function Chart({ rowIndex }) {
  const { currentChartData, isDifferenceMode } = useSelector((state) => state.chart);

  // useMemo will now also calculate the dynamic scale
  const chartDisplayData = useMemo(() => {
    if (!currentChartData || !currentChartData.data[rowIndex]) return null;
    
    // Get the dynamic scale for the entire dataset
    const { yMax, valueLabels } = getChartScale(currentChartData);

    const BAR_SPACING = 0.75;
    const values = currentChartData.data[rowIndex].values;
    const chartWidth = (values.length - 1) * BAR_SPACING;
    const horizontalShift = chartWidth / 2;

    return { 
      values, 
      columnNames: currentChartData.columnNames,
      dynamicValueLabels: valueLabels, // Use the dynamically generated labels
      yMax, // The new maximum value for the Y-axis
      BAR_SPACING, 
      horizontalShift,
      chartWidth,
    };
  }, [currentChartData, rowIndex]);

  if (!chartDisplayData) return null;

  const previousRowData = currentChartData.data[rowIndex - 1];

  return (
    <group position={[-chartDisplayData.horizontalShift, -2.5, 0]}>
      <mesh position={[chartDisplayData.horizontalShift, -0.005, 0]}>
        <boxGeometry args={[chartDisplayData.chartWidth + 1.5, 0.01, 0.6]} />
        <meshBasicMaterial color="#333333" />
      </mesh>

      <AxesAndLabels 
        columnNames={chartDisplayData.columnNames}
        valueLabels={chartDisplayData.dynamicValueLabels} // Pass the new labels
        barSpacing={chartDisplayData.BAR_SPACING}
      />
      {chartDisplayData.values.map((value, index) => {
        const xPosition = index * chartDisplayData.BAR_SPACING;
        
        if (isDifferenceMode && rowIndex > 0 && previousRowData) {
          const originalValue = parseFloat(value) || 0;
          const originalPreviousValue = parseFloat(previousRowData.values[index]) || 0;

          return (
            <group key={index} position={[xPosition, 0, 0]}>
              <BarWithDelta
                currentValue={originalValue}
                previousValue={originalPreviousValue}
                yMax={chartDisplayData.yMax}
              />
            </group>
          );
        }

        const height = (parseFloat(value) / chartDisplayData.yMax) * CHART_MAX_HEIGHT;

        return (
          <Bar
            key={index}
            value={value}
            position={[xPosition, 0, 0]}
            height={Math.max(height, MIN_BAR_HEIGHT)}
            color="#5555ff"
          />
        );
      })}
    </group>
  );
}