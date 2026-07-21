import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  title: string;
  culturalMeaning: string;
  weaverName: string;
  village: string;
  macroTextureUrl: string;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  title,
  culturalMeaning,
  weaverName,
  village,
  macroTextureUrl,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative py-24 bg-[#3F0F17] text-[#F7F1E6] overflow-hidden border-y border-[#C9A227]/30"
    >
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center text-[#C9A227] opacity-40 pointer-events-none">
        <span className="font-editorial italic text-sm tracking-widest uppercase">
          — The Cultural Provenance Narrative —
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#E8D8A8] bg-[#6B1E28] px-3 py-1 rounded border border-[#C9A227]/30">
              Handcrafted in {village}
            </span>

            <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight text-[#F7F1E6]">
              {title}
            </h2>

            <p className="font-editorial text-lg sm:text-xl leading-relaxed text-[#F7F1E6]/90 italic border-l-2 border-[#C9A227] pl-4">
              "{culturalMeaning}"
            </p>

            <div className="pt-4 border-t border-[#C9A227]/20 flex items-center gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#8A7A68] font-semibold block">Artisan Weaver</span>
                <span className="font-display font-bold text-sm text-[#C9A227]">{weaverName}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div ref={layer1Ref} className="rounded-[6px] overflow-hidden border-2 border-[#C9A227] shadow-2xl">
              <img
                src={macroTextureUrl}
                alt="Macro Silk Texture"
                className="w-full h-[400px] object-cover scale-105"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
