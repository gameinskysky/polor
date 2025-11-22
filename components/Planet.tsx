import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Trail, Line } from '@react-three/drei';
import * as THREE from 'three';
import { PlanetData } from '../types';

interface PlanetProps {
  data: PlanetData;
  onSelect: (planet: PlanetData) => void;
  isSelected: boolean;
}

export const Planet: React.FC<PlanetProps> = ({ data, onSelect, isSelected }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Orbit parameters: Elliptical shape
  const radiusX = data.distance;
  const radiusZ = data.distance * 0.85; // Slightly eccentric orbit

  // Random start angle to avoid alignment
  const startAngle = useRef(Math.random() * Math.PI * 2).current;

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Calculate elliptical position
      const t = clock.getElapsedTime() * data.speed * 0.15 + startAngle;
      const x = Math.cos(t) * radiusX;
      const z = Math.sin(t) * radiusZ;
      groupRef.current.position.set(x, 0, z);
      
      // Rotate planet on its axis
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.01 / (data.speed + 0.1); // Approximate rotation relation
      }
    }
  });

  // Pre-calculate orbit points for the Line component
  const orbitPoints = useMemo(() => {
    const points = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * radiusX, 0, Math.sin(theta) * radiusZ));
    }
    return points;
  }, [radiusX, radiusZ]);

  return (
    <>
      {/* Orbit Path Visual */}
      <Line 
        points={orbitPoints} 
        color="#FFFFFF" 
        opacity={0.15} 
        transparent 
        lineWidth={1} 
        dashed={false}
      />

      <group ref={groupRef}>
        <Trail
          width={data.size * 0.8} // Width of the trail
          length={12} // Length of the trail
          color={data.color} // Color of the trail
          attenuation={(t) => t * t} // Transparency fade
        >
          <mesh
            ref={meshRef}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(data);
            }}
            onPointerOver={() => {
              document.body.style.cursor = 'pointer';
              setHovered(true);
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'auto';
              setHovered(false);
            }}
          >
            <sphereGeometry args={[data.size, 32, 32]} />
            <meshStandardMaterial
              color={data.color}
              emissive={isSelected ? data.color : '#000'}
              emissiveIntensity={isSelected ? 0.5 : 0}
              roughness={0.4}
              metalness={0.3}
            />
          </mesh>
        </Trail>

        {/* Rings for Saturn-like planets */}
        {data.hasRing && data.ringSize && (
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[data.size + 0.6, data.size + 2.2, 64]} />
            <meshStandardMaterial
              color={data.ringColor}
              side={THREE.DoubleSide}
              transparent
              opacity={0.6}
            />
          </mesh>
        )}

        {/* Label on Hover/Select */}
        {(hovered || isSelected) && (
          <Html distanceFactor={20} position={[0, data.size + 1.5, 0]} zIndexRange={[100, 0]}>
            <div className={`bg-black/80 text-white px-3 py-1.5 rounded-md text-sm backdrop-blur-md border ${isSelected ? 'border-blue-400' : 'border-white/20'} whitespace-nowrap transition-all duration-200`}>
              <span className="font-bold">{data.name}</span>
            </div>
          </Html>
        )}
      </group>
    </>
  );
};