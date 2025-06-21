"use client";

import { useSpring, animated } from '@react-spring/three';
import { Edges } from '@react-three/drei';

/**
 * Renders a bar that visually represents the difference between a previous and current value,
 * including the original transparency settings.
 * @param {object} props
 * @param {number} props.previousValue - The value from the previous data row.
 * @param {number} props.currentValue - The value from the current data row.
 */
export function BarWithDelta({ previousValue, currentValue }) {
  const delta = currentValue - previousValue;

  const { baseHeight, posDeltaHeight, negDeltaHeight } = useSpring({
    baseHeight: (delta >= 0 ? previousValue : currentValue) / 10,
    posDeltaHeight: (delta > 0 ? delta : 0) / 10,
    negDeltaHeight: (delta < 0 ? Math.abs(delta) : 0) / 10,
    config: { tension: 170, friction: 26 },
  });

  console.log('baseHeight -> ', baseHeight, '\nposDeltaHeight -> ', posDeltaHeight, '\nnegDeltaHeight -> ', negDeltaHeight);

  return (
    <>
      {/* Base Bar */}
      <animated.group scale-y={baseHeight}>
        <mesh position-y={0.5} castShadow>
          <boxGeometry args={[0.5, 1, 0.5]} />
          <meshStandardMaterial color="#5555ff" />
          <Edges color="black" />
        </mesh>
      </animated.group>

      {/* Positive Delta Bar (Green) */}
      {
        delta > 0 
        ?
            <animated.group position-y={baseHeight.to(h => h + 0.001)} scale-y={posDeltaHeight}>
                <mesh position-y={0.5} castShadow>
                    <boxGeometry args={[0.5, 1, 0.5]} />
                    <meshStandardMaterial color="#46AB64" />
                    <Edges color="black" />
                </mesh>
            </animated.group>
        : 
        null
      }
      
      {/* Negative Delta Ghost Bar (Red) - With original transparency */}
      {
        delta < 0 
        ?
        <animated.group position-y={baseHeight.to(h => h + 0.001)} scale-y={negDeltaHeight}>
            <mesh position-y={0.5}>
                <boxGeometry args={[0.5, 1, 0.5]} />
                <meshStandardMaterial color="#AA0000" transparent opacity={0.3} />
                <Edges color="black" transparent opacity={0.5} />
            </mesh>
        </animated.group>
        : 
        null
      }
    </>
  );
}