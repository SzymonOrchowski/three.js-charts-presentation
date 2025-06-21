"use client";

import { Html } from '@react-three/drei';

/**
 * Renders the X and Y axes and their corresponding labels.
 * @param {object} props
 * @param {string[]} props.columnNames - The names for the X-axis labels.
 * @param {string[]} props.valueLabels - The labels for the Y-axis.
 * @param {number} props.barSpacing - The spacing between bars.
 */
export function AxesAndLabels({ columnNames, valueLabels, barSpacing }) {
  const axisColor = "#333333";
  const axisLineWidth = 0.02;

  // Calculate the total width of the chart for the horizontal axis line
  const chartWidth = (columnNames.length - 1) * barSpacing;

  return (
    <>
      {/* Horizontal Axis (X-axis) */}
      <mesh position={[chartWidth / 2, 0, 0]}>
        <boxGeometry args={[chartWidth + 0.5, axisLineWidth, axisLineWidth]} />
        <meshBasicMaterial color={axisColor} />
      </mesh>
      
      {/* Vertical Axis (Y-axis) */}
      <mesh position={[-0.25, 2.5, 0]}>
        <boxGeometry args={[axisLineWidth, 5, axisLineWidth]} />
        <meshBasicMaterial color={axisColor} />
      </mesh>
      
      {/* Column Name Labels (X-axis) */}
      {columnNames.map((name, index) => (
        <Html key={name} position={[index * barSpacing, -0.25, 0]}>
          <div className="text-xs w-20 -translate-x-1/2 text-center text-slate-700">{name}</div>
        </Html>
      ))}

      {/* Value Labels (Y-axis) */}
      {valueLabels.map((label, index) => {
        const yPos = index * (5 / (valueLabels.length - 1));
        return (
          <Html key={label} position={[-0.45, yPos, 0]}>
            <div className="text-xs text-slate-700">{label}</div>
          </Html>
        );
      })}
    </>
  );
}