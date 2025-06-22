"use client";

import { useMemo } from 'react';
import { Html } from '@react-three/drei';

/**
 * Renders the change (delta) value with appropriate color.
 * @param {object} props
 * @param {number} props.delta - The calculated difference.
 */
export function DeltaLabel({ delta }) {
  // Memoize the label's style and text based on the delta value
  const { label, className } = useMemo(() => {
    if (delta > 0) {
      return {
        label: `∆ +${Math.round(delta)}`,
        className: 'text-green-600',
      };
    } else if (delta < 0) {
      return {
        label: `∆ ${Math.round(delta)}`,
        className: 'text-red-600',
      };
    }
    return { label: '∆ 0', className: 'text-black' };
  }, [delta]);

  return (
    // Position this HTML element relative to its parent in 3D space
    <Html position={[-0.3, 0.4, 0]}> 
      <div className={`px-2 py-1 text-[9px] bg-white/70 rounded-md whitespace-nowrap ${className}`}>
        {label}
      </div>
    </Html>
  );
}