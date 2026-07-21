import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function WovenFabricPlane({ textureUrl }: { textureUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = new THREE.TextureLoader().load(textureUrl);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.08;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[3.2, 4.2, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.4}
        metalness={0.1}
        bumpScale={0.05}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export const ProductViewer3D: React.FC<{ textureUrl: string; title: string }> = ({
  textureUrl,
  title,
}) => {
  return (
    <div className="relative w-full h-[480px] bg-white rounded-[6px] overflow-hidden border-2 border-[#C9A227] shadow-2xl group">
      
      {/* 3D Canvas */}
      <Canvas style={{ background: '#FFFFFF' }}>
        <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={50} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#FFE8B0" />
        <directionalLight position={[-5, -5, -2]} intensity={1} color="#C9A227" />
        <pointLight position={[0, 0, 3]} intensity={1.2} />
        
        <WovenFabricPlane textureUrl={textureUrl} />
        <OrbitControls enableZoom={true} maxDistance={6} minDistance={2.5} autoRotate autoRotateSpeed={0.8} />
      </Canvas>

      {/* Overlays */}
      <div className="absolute top-4 left-4 z-10 bg-white/95 text-[#3F0F17] text-[10px] uppercase font-mono px-3 py-1 rounded border border-[#C9A227]/60 shadow pointer-events-none font-bold">
        Interactive 3D Garment Relieff • Drag to Rotate
      </div>

      <div className="absolute bottom-4 right-4 z-10 bg-white/95 text-[#3F0F17] text-[10px] uppercase font-mono px-3 py-1 rounded border border-[#C9A227]/60 shadow pointer-events-none font-bold">
        300D Warp & Weft Relief
      </div>
    </div>
  );
};
