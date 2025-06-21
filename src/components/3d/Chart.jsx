"use client";

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Bar } from './Bar';
import { AxesAndLabels } from './AxesAndLabels';
import { BarWithDelta } from './BarWithDelta';
import { Edges } from '@react-three/drei';

export function Chart({ rowIndex }) {
  const { currentChartData, isDifferenceMode } = useSelector((state) => state.chart);

  const chartData = useMemo(() => {
    if (!currentChartData || !currentChartData.data[rowIndex]) return null;

    const BAR_SPACING = 0.75;
    const values = currentChartData.data[rowIndex].values;
    // The chart's total width is the number of gaps between bars * spacing
    const chartWidth = (values.length - 1) * BAR_SPACING;
    // The shift required to center the chart at the origin
    const horizontalShift = chartWidth / 2;

    return { 
      values, 
      columnNames: currentChartData.columnNames,
      valueLabels: currentChartData.valueLabels,
      BAR_SPACING, 
      horizontalShift,
      chartWidth, // Pass the calculated width for the base
    };
  }, [currentChartData, rowIndex]);

  if (!chartData) return null;

  const previousRowData = currentChartData.data[rowIndex - 1];

  return (
    <group position={[-chartData.horizontalShift, -2.5, 0]}>
      <mesh position={[chartData.horizontalShift, -0.01, 0]}>
        <boxGeometry args={[chartData.chartWidth + 0.75, 0.01, 0.6]} />
        <meshBasicMaterial color="#777777" />
        <Edges color="black" transparent opacity={0.5} />
      </mesh>

      <AxesAndLabels 
        columnNames={chartData.columnNames}
        valueLabels={chartData.valueLabels}
        barSpacing={chartData.BAR_SPACING}
      />
      {chartData.values.map((value, index) => {
        const xPosition = index * chartData.BAR_SPACING;

        if (isDifferenceMode && rowIndex > 0 && previousRowData) {
          const currentValue = parseFloat(value) || 0;
          const previousValue = parseFloat(previousRowData.values[index]) || 0;

          return (
            <group key={index} position={[xPosition, 0, 0]}>
              <BarWithDelta 
                previousValue={previousValue} 
                currentValue={currentValue} 
              />
            </group>
          );
        }

        const height = parseFloat(value) / 10 || 0;
        return (
          <Bar
            key={index}
            position={[xPosition, 0, 0]}
            height={height}
            color="#5555ff"
          />
        );
      })}
    </group>
  );
}