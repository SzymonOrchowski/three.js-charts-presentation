"use client";

import { Html } from '@react-three/drei';

/**
 * Renders the X and Y axes, their labels, and 3D tick marks.
 * @param {object} props
 * @param {string[]} props.columnNames - The names for the X-axis labels.
 * @param {string[]} props.valueLabels - The labels for the Y-axis.
 * @param {number} props.barSpacing - The spacing between bars.
 */
export function AxesAndLabels({ columnNames, valueLabels, barSpacing }) {
  const axisColor = "#333333";
  const axisLineWidth = 0.02;

  const chartWidth = (columnNames.length - 1) * barSpacing;

  return (
    <>
      {/* Horizontal Axis (X-axis) */}
      <mesh position={[chartWidth / 2, -0.125, 0]}>
        <boxGeometry args={[chartWidth + 1.01, axisLineWidth, axisLineWidth]} />
        <meshBasicMaterial color={axisColor} />
      </mesh>
      
      {/* Vertical Axis (Y-axis) */}
      <mesh position={[-0.5, 2.5, 0]}>
        <boxGeometry args={[axisLineWidth, 5.25, axisLineWidth]} />
        <meshBasicMaterial color={axisColor} />
      </mesh>
      
      {/* Column Name Labels and Tick Marks (X-axis) */}
      {columnNames.map((name, index) => {
        const xPos = index * barSpacing;
        return (
          <group key={name} position={[xPos, 0, 0]}>
            {/* The 3D tick mark mesh */}
            <mesh position={[0, -0.125, 0]}>
                <boxGeometry args={[axisLineWidth, 0.25, axisLineWidth]} />
                <meshBasicMaterial color={axisColor} />
            </mesh>
            {/* The HTML label */}
            <Html position={[0, -0.25, 0]}>
              <div className="text-xs w-20 -translate-x-1/2 text-center text-slate-700 border border-slate-300 bg-white/80 px-1 py-0.5 rounded">
                {name}
              </div>
            </Html>
          </group>
        );
      })}

      {/* Value Labels and Tick Marks (Y-axis) */}
      {valueLabels.map((label, index) => {
        const yPos = index * (5 / (valueLabels.length - 1));
        return (
          <group key={label} position={[-0.5, yPos, 0]}>
            {/* The 3D tick mark mesh */}
            <mesh>
                <boxGeometry args={[0.25, axisLineWidth, axisLineWidth]} />
                <meshBasicMaterial color={axisColor} />
            </mesh>
            {/* The HTML label */}
            <Html position={[-0.46, 0.1, -0.1]}>
              <div className="text-xs text-slate-700 border border-slate-300 bg-white/80 px-2 py-0.5 rounded">
                  {label}
              </div>
            </Html>
          </group>
        );
      })}
    </>
  );
}