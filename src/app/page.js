"use client";

import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { Spreadsheet } from '@/components/spreadsheet/Spreadsheet';
import { Visualization } from '@/components/3d/Visualization';

/**
 * The main page component that renders the application layout.
 */
export default function Home() {
  const [activeView, setActiveView] = useState('visualization'); // Default view

  return (
    <div className="flex flex-col h-screen w-screen bg-white">
      {/* By adding relative positioning and a z-index, we ensure the TopBar and its children (like the tooltip) are on a higher layer. */}
      <div className="relative z-50">
        <TopBar activeView={activeView} setActiveView={setActiveView} />
      </div>
      
      {/* This main content area now sits on a lower layer. */}
      <main className="flex-grow relative z-0">
        {activeView === 'spreadsheet' && <Spreadsheet />}
        {activeView === 'visualization' && <Visualization />}
      </main>
    </div>
  );
}