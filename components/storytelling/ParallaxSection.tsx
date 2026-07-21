'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxSectionProps {
  title: string;
  culturalMeaning: string;
  weaverName: string;
  village: string;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  title,
  culturalMeaning,
  weaverName,
  village,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const layer4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Scrub animations at different speeds
      if (layer1Ref.current) {
        gsap.to(layer1Ref.current, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (layer2Ref.current) {
        gsap.to(layer2Ref.current, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (layer3Ref.current) {
        gsap.to(layer3Ref.current, {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative py-24 bg-[var(--color-wine)] text-[var(--color-ivory)] overflow-hidden border-y border-[var(--color-gold)]/30"
    >
      {/* Decorative Gold Crest Motif */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center text-[var(--color-gold)] opacity-40 pointer-events-none">
        <span className="font-editorial italic text-sm tracking-widest uppercase">
          — The Cultural Provenance Narrative —
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Narrative Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--color-gold-light)] bg-[var(--color-oxblood)] px-3 py-1 rounded border border-[var(--color-gold)]/30">
              Handcrafted in {village}
            </span>

            <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight text-[var(--color-ivory)]">
              {title}
            </h2>

            <p className="font-editorial text-lg sm:text-xl leading-relaxed text-[var(--color-ivory)]/90 italic border-l-2 border-[var(--color-gold)] pl-4">
              "{culturalMeaning}"
            </p>

            <div className="pt-4 border-t border-[var(--color-gold)]/20 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-[var(--color-gold)] bg-[var(--color-oxblood)] flex items-center justify-center font-display font-bold text-[var(--color-gold)]">
                {weaverName.charAt(0)}
              </div>
              <div>
                <h4 className="font-display font-semibold text-sm text-[var(--color-gold-light)]">
                  Master Artisan {weaverName}
                </h4>
                <p className="text-xs text-[var(--color-ivory)]/75">
                  Loom Courtyard • {village}
                </p>
              </div>
            </div>
          </div>

          {/* Layered Parallax Image Showcase */}
          <div className="lg:col-span-7 relative h-[520px] sm:h-[600px] w-full">
            
            {/* Layer 1: Wide Village Shot Background */}
            <div
              ref={layer1Ref}
              className="absolute top-0 left-0 w-3/4 h-64 sm:h-72 rounded-[var(--radius-card)] overflow-hidden border border-[var(--color-gold)]/30 shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1000"
                alt="Village courtyard loom"
                fill
                className="object-cover brightness-90"
              />
            </div>

            {/* Layer 2: Hands Close-Up Foreground Overlay */}
            <div
              ref={layer2Ref}
              className="absolute top-32 right-0 w-2/3 h-64 sm:h-72 rounded-[var(--radius-card)] overflow-hidden border-2 border-[var(--color-gold)] shadow-2xl z-20"
            >
              <Image
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000"
                alt="Artisan hands spinning thread"
                fill
                className="object-cover"
              />
            </div>

            {/* Layer 3: Loom Shuttle Mid-Shot Floating */}
            <div
              ref={layer3Ref}
              className="absolute bottom-4 left-12 w-1/2 h-48 sm:h-56 rounded-[var(--radius-card)] overflow-hidden border border-[var(--color-gold-light)]/40 shadow-2xl z-30"
            >
              <Image
                src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=1000"
                alt="Loom shuttle threading silk"
                fill
                className="object-cover"
              />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
