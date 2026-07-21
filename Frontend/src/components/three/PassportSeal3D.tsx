import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

function GoldMedalSeal() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 1.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[1.2, 1.2, 0.15, 64]} />
        <meshStandardMaterial color="#C9A227" roughness={0.15} metalness={0.95} />
      </mesh>
    </Float>
  );
}

export const PassportSeal3D: React.FC = () => {
  return (
    <div className="w-32 h-32 mx-auto relative rounded-full overflow-hidden bg-white border-2 border-[#C9A227]/40 shadow-inner">
      <Canvas style={{ background: '#FFFFFF' }}>
        <ambientLight intensity={1.8} />
        <directionalLight position={[3, 3, 3]} intensity={2.5} color="#FFE8B0" />
        <GoldMedalSeal />
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
  );
};
