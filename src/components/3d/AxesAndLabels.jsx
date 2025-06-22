"use client";

import { Text, Billboard } from '@react-three/drei';

/**
 * Renders the X and Y axes and their corresponding 3D text labels, now billboarded.
 * @param {object} props
 * @param {string[]} props.columnNames - The names for the X-axis labels.
 * @param {string[]} props.valueLabels - The labels for the Y-axis.
 * @param {number} props.barSpacing - The spacing between bars.
 */
export function AxesAndLabels({ columnNames, valueLabels, barSpacing }) {
  const axisColor = "#ffffff";
  const axisLineWidth = 0.01;

  const chartWidth = (columnNames.length - 1) * barSpacing;

  return (
    <>
      {/* Horizontal Axis (X-axis) */}
      <mesh position={[chartWidth / 2, -0.05, 0]}>
        <boxGeometry args={[chartWidth + 1, axisLineWidth, axisLineWidth]} />
        <meshBasicMaterial color={axisColor} />
      </mesh>
      
      {/* Vertical Axis (Y-axis) */}
      <mesh position={[-0.5, 2.5, 0]}>
        <boxGeometry args={[axisLineWidth, 5.1, axisLineWidth]} />
        <meshBasicMaterial color={axisColor} />
      </mesh>
      
      {/* Column Name Labels (X-axis) */}
      {columnNames.map((name, index) => {
        const xPos = index * barSpacing;
        return (
          <Text
            key={name}
            position={[xPos, -0.1, 0]}
            fontSize={0.2}
            color="white"
            anchorX="left"
            anchorY="top"
            rotation={[0, 0, -Math.PI / 4]}
          >
            {name}
          </Text>
        );
      })}

      {/* Value Labels (Y-axis) */}
      {valueLabels.map((label, index) => {
        const yPos = index * (5 / (valueLabels.length - 1));
        return (
          <Billboard key={label} position={[-0.8, yPos, 0]}>
            <Text
              fontSize={0.2}
              color="white"
              anchorX="right"
              anchorY="middle"
            >
              {label}
            </Text>
          </Billboard>
        );
      })}
    </>
  );
}