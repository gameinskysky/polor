import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Sun: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
    }
    if (glowRef.current) {
      glowRef.current.rotation.z -= delta * 0.02;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
      glowRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* Core Sun */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[3, 64, 64]} />
        <meshStandardMaterial 
          emissive="#FFD700" 
          emissiveIntensity={2} 
          color="#FFA500" 
          toneMapped={false}
        />
      </mesh>
      
      {/* Glow / Atmosphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[3.2, 64, 64]} />
        <meshBasicMaterial 
          color="#FF4500" 
          transparent 
          opacity={0.3} 
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Outer Glow Halo */}
      <mesh>
         <sphereGeometry args={[3.6, 32, 32]} />
         <meshBasicMaterial 
            color="#FF8C00"
            transparent
            opacity={0.15}
            side={THREE.BackSide}
         />
      </mesh>

      <pointLight intensity={800} distance={200} decay={1.5} color="#FFFACD" />
    </group>
  );
};