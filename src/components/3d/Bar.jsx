"use client";

import { useSpring, animated } from '@react-spring/three';
import { Edges } from '@react-three/drei';
import { ValueLabel } from './ValueLabel'; // Import the new component

export function Bar({ position, height, color, value }) {
  // Pass the entire spring object to the label component
  const animatedProps = useSpring({
    springHeight: height,
    springY: height / 2,
    config: { tension: 100, friction: 26 },
  });

  return (
    <animated.group position-x={position[0]} position-y={animatedProps.springY} position-z={position[2]}>
      <animated.mesh
        castShadow
        receiveShadow
        scale-y={animatedProps.springHeight}
      >
        <boxGeometry args={[0.5, 1, 0.5]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={1.5}
          toneMapped={false}
        />
        <Edges color="black" />
      </animated.mesh>
      
      <animated.group position-y={animatedProps.springHeight.to(h => h / 2)}>
        <ValueLabel animatedProps={animatedProps} value={value} />
      </animated.group>
    </animated.group>
  );
}