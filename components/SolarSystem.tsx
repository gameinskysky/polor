import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { PLANETS } from '../constants';
import { PlanetData } from '../types';

interface SolarSystemProps {
  onPlanetSelect: (planet: PlanetData) => void;
  selectedPlanetId: string | null;
}

export const SolarSystem: React.FC<SolarSystemProps> = ({ onPlanetSelect, selectedPlanetId }) => {
  return (
    <div className="w-full h-full absolute inset-0 bg-black">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 30, 60]} fov={60} />
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            enableRotate={true}
            maxDistance={150}
            minDistance={10}
          />
          
          <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <ambientLight intensity={0.1} />
          
          <Sun />

          {PLANETS.map((planet) => (
            <Planet
              key={planet.id}
              data={planet}
              onSelect={onPlanetSelect}
              isSelected={selectedPlanetId === planet.id}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};