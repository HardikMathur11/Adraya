import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function GoldThreadSpool() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 1.5;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <torusGeometry args={[1.2, 0.08, 16, 100]} />
      <meshStandardMaterial color="#C9A227" roughness={0.2} metalness={0.8} />
    </group>
  );
}

export const ThreadLoader: React.FC = () => {
  return (
    <div className="w-16 h-16 mx-auto">
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 2, 2]} intensity={1.5} color="#E8D8A8" />
        <GoldThreadSpool />
      </Canvas>
    </div>
  );
};
