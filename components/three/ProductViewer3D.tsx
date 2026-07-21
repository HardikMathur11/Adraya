'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { ZoomIn, RotateCcw, AlertCircle } from 'lucide-react';

interface ProductViewer3DProps {
  textureUrl: string;
  macroTextureUrl: string;
  images: string[];
  productTitle: string;
}

function FabricMesh({
  textureUrl,
  macroTextureUrl,
}: {
  textureUrl: string;
  macroTextureUrl: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const [isMacro, setIsMacro] = useState(false);

  // Generate procedural weave normal map programmatically
  const normalTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#8080ff'; // Flat blue-purple normal map base
    ctx.fillRect(0, 0, 256, 256);

    // Draw fine weave grid pattern onto normal map
    ctx.fillStyle = '#a080ff';
    for (let i = 0; i < 256; i += 8) {
      ctx.fillRect(i, 0, 4, 256);
      ctx.fillRect(0, i, 256, 4);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(12, 12);
    return texture;
  }, []);

  // Load diffuse texture
  const diffuseTexture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load(isMacro ? macroTextureUrl : textureUrl);
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, [textureUrl, macroTextureUrl, isMacro]);

  // Create curved fabric drape geometry
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(2.4, 3.2, 64, 64);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Gentle sine curve for draped fabric effect
      const z = Math.sin(x * 1.5) * 0.15 + Math.cos(y * 1.2) * 0.08;
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame(() => {
    // Distance-based macro texture swapping
    const distance = camera.position.distanceTo(new THREE.Vector3(0, 0, 0));
    if (distance < 2.5 && !isMacro) {
      setIsMacro(true);
    } else if (distance >= 2.5 && isMacro) {
      setIsMacro(false);
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        map={diffuseTexture}
        normalMap={normalTexture}
        normalScale={new THREE.Vector2(0.6, 0.6)}
        roughness={0.75}
        metalness={0.08}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export const ProductViewer3D: React.FC<ProductViewer3DProps> = ({
  textureUrl,
  macroTextureUrl,
  images,
  productTitle,
}) => {
  const [webglSupported, setWebglSupported] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [is3DMode, setIs3DMode] = useState(true);
  const [macroNotice, setMacroNotice] = useState(false);

  useEffect(() => {
    // WebGL Capability Check
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  return (
    <div className="space-y-4">
      {/* Main Viewing Stage */}
      <div className="relative w-full h-[480px] sm:h-[560px] bg-[var(--color-wine)]/10 border border-[var(--color-gold)]/30 rounded-[var(--radius-card)] overflow-hidden shadow-fabric group">
        
        {webglSupported && is3DMode ? (
          <div className="w-full h-full cursor-grab active:cursor-grabbing">
            <Canvas
              camera={{ position: [0, 0, 3.6], fov: 45 }}
              onPointerDown={() => setMacroNotice(true)}
            >
              {/* Soft Key Light */}
              <directionalLight position={[4, 4, 4]} intensity={1.4} />
              {/* Ambient Fill */}
              <ambientLight intensity={0.7} />
              {/* Warm Rim Light matching oxblood/gold */}
              <pointLight position={[-4, -2, 2]} color="#C9A227" intensity={1.2} />
              
              <FabricMesh textureUrl={images[activeImageIndex] || textureUrl} macroTextureUrl={macroTextureUrl} />
              
              <OrbitControls
                enablePan={false}
                minDistance={1.8}
                maxDistance={5.0}
                maxPolarAngle={Math.PI / 1.8}
                minPolarAngle={Math.PI / 3}
                rotateSpeed={0.8}
              />
            </Canvas>

            {/* Stage Overlay Controls */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="px-2.5 py-1 text-[10px] font-semibold tracking-widest uppercase bg-[var(--color-wine)] text-[var(--color-gold-light)] border border-[var(--color-gold)]/40 rounded">
                Interactive 3D Weave
              </span>
              {macroNotice && (
                <span className="px-2.5 py-1 text-[10px] font-sans bg-[var(--color-oxblood)] text-[var(--color-ivory)] rounded animate-fade-in">
                  Zoom in to inspect macro thread detail
                </span>
              )}
            </div>

            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
              <button
                onClick={() => setIs3DMode(false)}
                className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-[var(--color-ivory)] text-[var(--color-wine)] border border-[var(--color-gold)]/50 rounded shadow-md hover:bg-[var(--color-gold-light)] transition-colors"
              >
                Switch to 2D Gallery
              </button>
            </div>
          </div>
        ) : (
          /* Non-WebGL / 2D Image Fallback Carousel */
          <div className="relative w-full h-full">
            <Image
              src={images[activeImageIndex] || textureUrl}
              alt={productTitle}
              fill
              className="object-cover"
            />
            {!webglSupported && (
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 bg-[var(--color-wine)]/90 text-[var(--color-gold-light)] text-[10px] rounded border border-[var(--color-gold)]/30">
                <AlertCircle className="w-3.5 h-3.5" />
                WebGL restricted — showing high-res filmstrip
              </div>
            )}
            {webglSupported && (
              <button
                onClick={() => setIs3DMode(true)}
                className="absolute bottom-4 right-4 z-10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-[var(--color-oxblood)] text-[var(--color-ivory)] border border-[var(--color-gold)]/50 rounded shadow-md hover:bg-[var(--color-wine)] transition-colors"
              >
                Launch 3D Weave Viewer
              </button>
            )}
          </div>
        )}

      </div>

      {/* Thumbnail Filmstrip for Texture & Angle Swapping */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImageIndex(idx)}
            className={`relative w-20 h-24 shrink-0 rounded overflow-hidden border-2 transition-all ${
              activeImageIndex === idx
                ? 'border-[var(--color-gold)] scale-105 shadow-md'
                : 'border-[var(--color-taupe)]/30 opacity-70 hover:opacity-100'
            }`}
          >
            <Image src={img} alt={`View angle ${idx + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};
