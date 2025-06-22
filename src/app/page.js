"use client";

import { useState } from 'react';
import { TopBar } from '@/components/layout/TopBar';
import { Spreadsheet } from '@/components/spreadsheet/Spreadsheet';
import { Visualization } from '@/components/3d/Visualization';
import { BackgroundPreview } from '@/components/layout/BackgroundPreview';

/**
 * The main page component that renders the application layout.
 */
export default function Home() {
  const [activeView, setActiveView] = useState('visualization'); // Default view

  return (
    <div className="flex flex-col h-screen w-screen bg-white">
      <TopBar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-grow">
        {activeView === 'spreadsheet' && <Spreadsheet />}
        {activeView === 'visualization' && <Visualization />}
        {activeView === 'background' && <BackgroundPreview />}
      </main>
    </div>
  );
}