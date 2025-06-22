"use client";

import { Text } from '@react-three/drei';
import { animated } from '@react-spring/three';

const AnimatedText = animated(Text);

/**
 * Renders a 3D text label that displays the main value of a bar.
 */
export function ValueLabel({ animatedProps, value }) {
  // The <Text> component from drei needs to be wrapped with `animated`
  // to accept an animated value as a child.
  return (
    <AnimatedText
      position={[0, 0.5, 0]}
      fontSize={0.4}
      color="white"
      anchorX="center"
      anchorY="middle"
      depthWrite={false}
    >
      {value}
    </AnimatedText>
  );
}