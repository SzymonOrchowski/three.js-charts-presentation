"use client";

import { useSpring, animated } from '@react-spring/three';
import { Edges } from '@react-three/drei';
import { useMemo } from 'react'; // Import useMemo
import { ValueLabel } from './ValueLabel'; // Import the new components
import { DeltaLabel } from './DeltaLabel'; //

const CHART_MAX_HEIGHT = 5; // The max height of the chart in 3D space

/**
 * Renders a bar that visually represents the difference between a previous and current value.
 */
export function BarWithDelta({ previousValue, currentValue, yMax }) {
  const delta = currentValue - previousValue;

  // Perform all scaling calculations inside this component for consistency.
  const scaled = useMemo(() => {
    if (yMax === 0) return { current: 0, previous: 0 }; // Avoid division by zero
    return {
      current: (currentValue / yMax) * CHART_MAX_HEIGHT,
      previous: (previousValue / yMax) * CHART_MAX_HEIGHT,
    }
  }, [currentValue, previousValue, yMax]);

  // A single, stable useSpring hook that uses the correct scaled values.
  const { animatedCurrentHeight, baseHeight, posDeltaHeight, negDeltaHeight } = useSpring({
    animatedCurrentHeight: scaled.current,
    baseHeight: delta >= 0 ? scaled.previous : scaled.current,
    posDeltaHeight: delta > 0 ? scaled.current - scaled.previous : 0,
    negDeltaHeight: delta < 0 ? scaled.previous - scaled.current : 0,
    config: { tension: 170, friction: 26 },
  });

  return (
    <>
      {/* Labels use the original, unscaled values and are positioned by the final animated height */}
      <animated.group position-y={animatedCurrentHeight}>
        <ValueLabel value={currentValue} />
        <DeltaLabel delta={delta} />
      </animated.group>

      {/* Base Bar */}
      <animated.group scale-y={baseHeight}>
        <mesh position-y={0.5} castShadow>
          <boxGeometry args={[0.5, 1, 0.5]} />
          <meshStandardMaterial color="#5555ff" emissive="#5555ff" emissiveIntensity={1.5} toneMapped={false}/>
          <Edges color="black" />
        </mesh>
      </animated.group>

      {/* Positive Delta Bar (Green) */}
      {
        delta > 0 && (
          <animated.group position-y={baseHeight.to(h => h + 0.001)} scale-y={posDeltaHeight}>
            <mesh position-y={0.5} castShadow>
              <boxGeometry args={[0.5, 1, 0.5]} />
              <meshStandardMaterial color="#46AB64" emissive="#46AB64" emissiveIntensity={1.5} toneMapped={false}/>
              <Edges color="black" />
            </mesh>
          </animated.group>
        )
      }
      
      {/* Negative Delta Ghost Bar (Red) */}
      {
        delta < 0 && (
          <animated.group position-y={baseHeight.to(h => h + 0.001)} scale-y={negDeltaHeight}>
            <mesh position-y={0.5}>
              <boxGeometry args={[0.5, 1, 0.5]} />
              <meshStandardMaterial color="#AA0000" transparent emissive="#aa0000" emissiveIntensity={0.3} opacity={0.3} depthWrite={false}/>
              <Edges color="#aa0000" transparent opacity={0.5} />
            </mesh>
          </animated.group>
        )
      }
    </>
  );
}