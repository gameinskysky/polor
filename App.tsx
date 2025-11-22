import React, { useState } from 'react';
import { SolarSystem } from './components/SolarSystem';
import { InfoPanel } from './components/InfoPanel';
import { PlanetData } from './types';
import { Info } from 'lucide-react';

const App: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-sans">
      {/* 3D Canvas Layer */}
      <SolarSystem 
        onPlanetSelect={setSelectedPlanet} 
        selectedPlanetId={selectedPlanet?.id || null} 
      />

      {/* HUD Overlay */}
      <div className="absolute top-6 left-6 pointer-events-none z-10">
        <h1 className="text-4xl font-black tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
          Cosmic Explorer
        </h1>
        <p className="text-gray-400 text-sm mt-1 max-w-xs">
          Interactive 3D Solar System. Click on a planet to reveal its secrets.
        </p>
      </div>

      {/* Interaction Prompt / Intro Toast */}
      {showIntro && !selectedPlanet && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-3 animate-bounce z-10">
          <Info size={20} className="text-blue-400" />
          <span className="text-sm font-medium">Drag to Rotate &bull; Scroll to Zoom &bull; Click a Planet</span>
          <button 
            onClick={() => setShowIntro(false)} 
            className="ml-2 text-gray-400 hover:text-white text-xs underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Side Panel (Right) */}
      <InfoPanel 
        planet={selectedPlanet} 
        onClose={() => setSelectedPlanet(null)} 
      />
    </div>
  );
};

export default App;