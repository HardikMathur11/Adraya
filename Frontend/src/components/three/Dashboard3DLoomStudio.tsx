import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles, MeshWobbleMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedLoomModel({ lightingMode }: { lightingMode: 'golden' | 'daylight' | 'night' }) {
  const shuttleGroup = useRef<THREE.Group>(null);
  const fabricMesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (shuttleGroup.current) {
      shuttleGroup.current.position.x = Math.sin(state.clock.elapsedTime * 2.8) * 1.6;
      shuttleGroup.current.rotation.z = Math.cos(state.clock.elapsedTime * 1.5) * 0.15;
    }
    if (fabricMesh.current) {
      fabricMesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      
      {/* 3D Pit Loom Frame Pillars */}
      <mesh position={[-2.2, 0, 0]}>
        <boxGeometry args={[0.25, 3.2, 0.25]} />
        <meshStandardMaterial color="#4A2A18" roughness={0.4} />
      </mesh>
      <mesh position={[2.2, 0, 0]}>
        <boxGeometry args={[0.25, 3.2, 0.25]} />
        <meshStandardMaterial color="#4A2A18" roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[4.65, 0.25, 0.25]} />
        <meshStandardMaterial color="#4A2A18" roughness={0.4} />
      </mesh>

      {/* Gold Zari Warp Threads Layer */}
      <group position={[0, 0, 0]}>
        {Array.from({ length: 24 }).map((_, i) => (
          <mesh key={i} position={[-2 + i * 0.17, 0, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 3, 8]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#C9A227' : '#FFE8B0'}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Moving Pit Loom Shuttle with Gold Bobbin */}
      <group ref={shuttleGroup} position={[0, 0, 0.2]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.6, 0.28, 0.35]} />
          <meshStandardMaterial color="#8A4A28" roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.09, 0.09, 0.8, 16]} />
          <meshStandardMaterial color="#FFE8B0" roughness={0.1} metalness={0.9} />
        </mesh>
      </group>

      {/* Floating Gold Sparkle Particles */}
      <Sparkles
        count={80}
        scale={[6, 4, 4]}
        size={3.5}
        speed={0.4}
        color="#FFE8B0"
      />
    </group>
  );
}

export const Dashboard3DLoomStudio: React.FC = () => {
  const [lightingMode, setLightingMode] = useState<'golden' | 'daylight' | 'night'>('golden');

  return (
    <div className="relative w-full h-[380px] bg-[#0A0808] rounded-[6px] overflow-hidden border-2 border-[#C9A227] shadow-2xl group">
      
      {/* 3D Canvas matching video background color #0A0808 */}
      <Canvas style={{ background: '#0A0808' }}>
        <PerspectiveCamera makeDefault position={[0, 0, 4.8]} fov={50} />
        <ambientLight intensity={1.2} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={2.2}
          color="#FFE8B0"
        />
        <directionalLight position={[-5, -5, -2]} intensity={0.8} color="#C9A227" />
        
        <AnimatedLoomModel lightingMode={lightingMode} />
        <OrbitControls enableZoom={true} maxDistance={7} minDistance={3} autoRotate autoRotateSpeed={0.6} />
      </Canvas>

      {/* Controls Overlay */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2 pointer-events-auto">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8D8A8] bg-black/90 px-3 py-1 rounded border border-[#C9A227]/40 shadow font-bold">
          Interactive 3D Loom Studio
        </span>

        {/* Lighting Mode Toggles */}
        <div className="flex bg-black/90 p-0.5 rounded border border-[#C9A227]/40 text-[10px] shadow">
          <button
            onClick={() => setLightingMode('golden')}
            className={`px-2 py-0.5 rounded font-bold uppercase transition-colors cursor-pointer ${
              lightingMode === 'golden' ? 'bg-[#C9A227] text-[#3F0F17]' : 'text-[#E8D8A8]'
            }`}
          >
            Golden Hour
          </button>
          <button
            onClick={() => setLightingMode('daylight')}
            className={`px-2 py-0.5 rounded font-bold uppercase transition-colors cursor-pointer ${
              lightingMode === 'daylight' ? 'bg-[#C9A227] text-[#3F0F17]' : 'text-[#E8D8A8]'
            }`}
          >
            Daylight
          </button>
          <button
            onClick={() => setLightingMode('night')}
            className={`px-2 py-0.5 rounded font-bold uppercase transition-colors cursor-pointer ${
              lightingMode === 'night' ? 'bg-[#C9A227] text-[#3F0F17]' : 'text-[#E8D8A8]'
            }`}
          >
            Night Loom
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-10 bg-black/90 text-[#E8D8A8] text-[10px] font-mono uppercase px-3 py-1 rounded border border-[#C9A227]/30 shadow pointer-events-none font-bold">
        42 Picks/Min • Active Shuttle Motion • Drag to Rotate 360°
      </div>
    </div>
  );
};
