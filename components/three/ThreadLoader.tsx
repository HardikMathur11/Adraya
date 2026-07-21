'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSessionStore } from '@/store/useSessionStore';

function AnimatedThreadSpline() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [progress, setProgress] = useState(0);

  // Generate a smooth loom curve
  const curve = useRef(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2, 0, 0),
      new THREE.Vector3(-1, 1, 0.5),
      new THREE.Vector3(0, -0.8, -0.5),
      new THREE.Vector3(1, 1.2, 0.5),
      new THREE.Vector3(2, 0, 0),
    ])
  ).current;

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.8;
      meshRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <tubeGeometry args={[curve, 64, 0.04, 12, false]} />
        <meshStandardMaterial
          color="#C9A227"
          metalness={0.8}
          roughness={0.2}
          emissive="#6B1E28"
          emissiveIntensity={0.2}
        />
      </mesh>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
    </group>
  );
}

export const ThreadLoader: React.FC = () => {
  const { isLoadingThread, setLoadingThread } = useSessionStore();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Initial page splash load trigger for 1.2s
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setLoadingThread(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, [setLoadingThread]);

  if (!visible && !isLoadingThread) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[var(--color-wine)]/95 flex flex-col items-center justify-center text-[var(--color-ivory)] transition-opacity duration-500"
      role="alert"
      aria-busy="true"
      aria-label="Loading your heritage catalogue"
    >
      <div className="w-48 h-48 relative flex items-center justify-center">
        {prefersReducedMotion ? (
          <div className="w-24 h-24 rounded-full border-2 border-[var(--color-gold)] bg-[var(--color-oxblood)] flex items-center justify-center animate-pulse">
            <span className="font-display font-bold text-[var(--color-gold)] text-4xl">W</span>
          </div>
        ) : (
          <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
            <AnimatedThreadSpline />
          </Canvas>
        )}
      </div>

      <div className="text-center mt-4 space-y-2">
        <h3 className="font-display text-lg font-semibold text-[var(--color-gold-light)] tracking-widest uppercase">
          WEAVEHERITAGE
        </h3>
        <p className="font-editorial text-sm italic text-[var(--color-ivory)]/80">
          Loading your heritage catalogue…
        </p>
      </div>
    </div>
  );
};
