"use client";

import { useMemo } from 'react';
import { Text } from '@react-three/drei';

/**
 * Renders the change (delta) value as 3D text with appropriate color.
 */
export function DeltaLabel({ delta }) {
  const { label, color } = useMemo(() => {
    const roundedDelta = Math.round(delta);
    if (roundedDelta > 0) {
      return {
        label: `∆ +${roundedDelta}`,
        color: '#65f58d', // A bright green to catch the bloom
      };
    } else if (roundedDelta < 0) {
      return {
        label: `∆ ${roundedDelta}`,
        color: '#f56565', // A bright red
      };
    }
    return { label: '', color: 'white' };
  }, [delta]);

  if (Math.round(delta) === 0) return null;

  return (
    <Text
      position={[0, 1.0, 0]} // Positioned slightly above the main value label
      fontSize={0.3}
      color={color}
      anchorX="center"
      anchorY="middle"
      emissive={color}
      emissiveIntensity={2}
      toneMapped={false}
    >
      {label}
    </Text>
  );
}