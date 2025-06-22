"use client";

import { AnimatedGradientBackground } from './AnimatedGradientBackground';

/**
 * A simple component to display the animated background for debugging and styling.
 */
export function BackgroundPreview() {
  return (
    // This container has a solid dark background so we can see the blurred blobs on top.
    // The relative positioning is important for the absolutely positioned blobs inside.
    <div className="w-full h-full relative">
      <AnimatedGradientBackground />
    </div>
  );
}