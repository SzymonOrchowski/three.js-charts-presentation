"use client";

import { useSpring, animated } from '@react-spring/three';
import { Edges } from '@react-three/drei';

/**
 * Renders a bar that visually represents the difference between a previous and current value.
 * @param {object} props
 * @param {number} props.previousValue - The value from the previous data row.
 * @param {number} props.currentValue - The value from the current data row.
 */
export function BarWithDelta({ previousValue, currentValue }) {
  const delta = currentValue - previousValue;

  // Animate the three potential parts of the bar
  const { baseHeight, posDeltaHeight, negDeltaHeight } = useSpring({
    baseHeight: delta >= 0 ? previousValue : currentValue, // If negative, the base is the smaller current value
    posDeltaHeight: delta > 0 ? delta : 0,
    negDeltaHeight: delta < 0 ? Math.abs(delta) : 0,
    config: { tension: 170, friction: 26 },
  });

  return (
    <>
      {/* Base Bar (previous value, or current value if negative delta) */}
      <animated.mesh
        position-y={baseHeight.to(h => h / 20)} // height is /10, so pos is /20
        scale-y={baseHeight.to(h => h / 10)}
        castShadow
      >
        <boxGeometry args={[0.5, 1, 0.5]} />
        <meshStandardMaterial color="#5555ff" />
        <Edges color="black" />
      </animated.mesh>

      {/* Positive Delta Bar (Green) */}
      <animated.mesh
        position-y={baseHeight.to(h => (h / 10) + (posDeltaHeight.get() / 20))}
        scale-y={posDeltaHeight.to(h => h / 10)}
        castShadow
      >
        <boxGeometry args={[0.5, 1, 0.5]} />
        <meshStandardMaterial color="#46AB64" />
        <Edges color="black" />
      </animated.mesh>
      
      {/* Negative Delta Ghost Bar (Red, semi-transparent) */}
      <animated.mesh
        position-y={baseHeight.to(h => (h / 10) + (negDeltaHeight.get() / 20))}
        scale-y={negDeltaHeight.to(h => h / 10)}
      >
        <boxGeometry args={[0.5, 1, 0.5]} />
        <meshStandardMaterial color="#AA0000" transparent opacity={0.3} />
        <Edges color="black" opacity={0.5} transparent />
      </animated.mesh>
    </>
  );
}