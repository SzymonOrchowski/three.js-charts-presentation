"use client";

import { Html } from '@react-three/drei';
import { animated } from '@react-spring/web';

/**
 * Renders an HTML label that displays the main value of a bar.
 */
export function ValueLabel({ animatedProps }) {
  return (
    <Html position={[-0.2, 0.85, 0]}>
      <animated.div
        className="px-2 py-1 text-xs text-black bg-white/70 rounded-md"
        style={{
          opacity: animatedProps.springHeight.to(h => (h > 0.05 ? 1 : 0)),
        }}
      >
        <animated.span>
          {animatedProps.springHeight.to(h => Math.round(h * 10))}
        </animated.span>
      </animated.div>
    </Html>
  );
}