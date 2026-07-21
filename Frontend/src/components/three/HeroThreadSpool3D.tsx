import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingGoldThreadRing() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.8;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -state.clock.elapsedTime * 0.6;
      ring2Ref.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.4) * 0.2;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
        <mesh ref={meshRef}>
          <torusGeometry args={[1.5, 0.12, 32, 100]} />
          <MeshWobbleMaterial
            color="#C9A227"
            factor={0.4}
            speed={1.5}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1}>
        <mesh ref={ring2Ref} scale={0.7}>
          <torusGeometry args={[1.8, 0.08, 32, 100]} />
          <meshStandardMaterial
            color="#FFE8B0"
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      </Float>
    </group>
  );
}

export const HeroThreadSpool3D: React.FC = () => {
  return (
    <div className="w-full h-[280px] sm:h-[340px] relative bg-transparent rounded-[6px] border border-[#C9A227]/40 overflow-hidden">
      <Canvas gl={{ alpha: true }}>
        <ambientLight intensity={1.8} />
        <directionalLight position={[4, 4, 4]} intensity={2.5} color="#FFE8B0" />
        <directionalLight position={[-4, -4, -2]} intensity={1.5} color="#C9A227" />
        <pointLight position={[0, 0, 3]} intensity={2} />
        
        <FloatingGoldThreadRing />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
      </Canvas>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-widest text-[#E8D8A8] bg-black/70 px-3 py-1 rounded border border-[#C9A227]/40 shadow pointer-events-none font-bold backdrop-blur-xs">
        Interactive 3D Silk Thread Spool • Drag to Rotate
      </div>
    </div>
  );
};
