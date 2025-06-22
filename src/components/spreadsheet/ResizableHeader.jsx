"use client";

import { useCallback } from 'react';

/**
 * A wrapper for header content that adds a handle for resizing.
 * @param {object} props
 * @param {React.ReactNode} props.children - The content of the header cell.
 * @param {(newWidth: number) => void} props.onResize - Callback when the column is resized by dragging.
 * @param {() => void} props.onAutoResize - Callback for auto-resizing on double-click.
 */
export function ResizableHeader({ children, onResize, onAutoResize }) {
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    const thElement = e.currentTarget.closest('th');
    const startX = e.clientX;
    const startWidth = thElement.offsetWidth;

    const handleMouseMove = (moveEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      if (newWidth > 50) { // Enforce a minimum width
        onResize(newWidth);
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [onResize]);

  const handleDoubleClick = useCallback((e) => {
    e.preventDefault();
    onAutoResize();
  }, [onAutoResize]);

  return (
    <div className="flex justify-between items-center h-full relative">
      {/* This div makes sure content doesn't overlap the resizer */}
      <div className="flex-grow pr-4">
        {children}
      </div>
      <div
        role="separator"
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
        className="absolute top-0 right-0 h-full w-2 cursor-col-resize"
      />
    </div>
  );
}