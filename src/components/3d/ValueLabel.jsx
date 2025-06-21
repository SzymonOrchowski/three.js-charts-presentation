"use client";

import { Html } from '@react-three/drei';
import { animated } from '@react-spring/three';

/**
 * Renders an HTML label that displays the value of a bar.
 * @param {object} props
 * @param {object} props.animatedProps - The animated properties from the bar's useSpring hook.
 */
export function ValueLabel({ animatedProps }) {
  return (
    // This <Html> component will be positioned relative to its parent mesh
    <Html position={[0, 0.5, 0]}>
      <animated.div
        className="px-2 py-1 text-xs text-black bg-white/70 rounded-md"
        style={{
          // Animate the opacity and transform based on the bar's height
          opacity: animatedProps.springHeight.to(h => (h > 0.1 ? 1 : 0)),
          transform: animatedProps.springHeight.to(h => `translateY(-${h * 5}px)`), // * 5 to match scale
        }}
      >
        {/* Animate the text content */}
        <animated.span>
          {animatedProps.springHeight.to(h => Math.round(h * 10))}
        </animated.span>
      </animated.div>
    </Html>
  );
}