import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

function WoodenShuttle3D() {
  const shuttleGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (shuttleGroup.current) {
      shuttleGroup.current.position.x = Math.sin(state.clock.elapsedTime * 2) * 0.8;
      shuttleGroup.current.rotation.z = Math.cos(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return (
    <group ref={shuttleGroup}>
      {/* Wooden Shuttle Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.8, 0.35, 0.45]} />
        <meshStandardMaterial color="#6B2D0C" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Gold Thread Bobbin Core */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 1.2, 32]} />
        <meshStandardMaterial color="#C9A227" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
}

export const WeaverLoom3D: React.FC = () => {
  return (
    <div className="w-full h-[300px] relative rounded-[6px] overflow-hidden border-2 border-[#C9A227] bg-white shadow-2xl">
      <Canvas style={{ background: '#FFFFFF' }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[4, 4, 4]} intensity={2.2} color="#FFE8B0" />
        <directionalLight position={[-4, -4, -2]} intensity={1.2} color="#C9A227" />
        <WoodenShuttle3D />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
      <div className="absolute top-3 left-3 bg-white/95 text-[#3F0F17] text-[10px] font-mono uppercase px-2.5 py-0.5 rounded border border-[#C9A227]/60 shadow font-bold pointer-events-none">
        Interactive 3D Wooden Pit Loom Shuttle • Drag to Rotate
      </div>
    </div>
  );
};
