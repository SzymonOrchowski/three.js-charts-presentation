"use client";

/**
 * A self-contained component that renders a dynamic, animated, blurred gradient background.
 */
export function AnimatedGradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gray-900" />
      
      <div className="relative w-full h-full filter blur-3xl">
        {/* Blob 1 - Size reduced to 80% (32rem), color changed from 400 to 600 shade */}
        <div 
          className="absolute top-1/4 -left-52 w-[32rem] h-[32rem] bg-rose-600/40 animate-move-blob-1"
        />
        {/* Blob 2 - Size reduced to 80% (30rem), color changed from 400 to 600 shade */}
        <div 
          className="absolute top-1/2 -right-52 w-[30rem] h-[30rem] bg-lime-600/40 animate-move-blob-2"
        />
        {/* Blob 3 - Size reduced to 80% (28rem), color changed from 400 to 600 shade */}
         <div 
          className="absolute bottom-1/4 left-20 w-[28rem] h-[28rem] bg-sky-600/30 animate-move-blob-3"
        />
      </div>

      <svg className="w-0 h-0 absolute">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.6" 
            stitchTiles="stitch"
          />
        </filter>
      </svg>
      <div 
        className="w-full h-full absolute inset-0" 
        style={{ filter: "url(#noiseFilter)", opacity: 0.15 }} 
      />
    </div>
  );
}