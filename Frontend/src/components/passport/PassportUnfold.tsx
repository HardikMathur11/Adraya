import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ChevronDown, CheckCircle2 } from 'lucide-react';
import { PassportRecord } from '../../lib/api/types';
import { PassportSeal3D } from '../three/PassportSeal3D';

export const PassportUnfold: React.FC<{ passport?: PassportRecord; autoUnfold?: boolean }> = ({
  passport,
  autoUnfold = false,
}) => {
  const [isOpen, setIsOpen] = useState(autoUnfold);

  const pass = passport || {
    qrId: 'PASSPORT-PC-2026-8841',
    productTitle: 'Pochampally Ikat Silk Saree',
    weaverName: 'Radha Devi',
    village: 'Pochampally',
    clusterName: 'Pochampally Ikat Guild',
    material: 'Pure Mulberry Silk & Botanical Dyes',
    weavingHours: 140,
    storySnapshot: 'Handwoven in Pochampally over 140 hours using double-Ikat resist-dyeing.',
    ledgerRef: '0x8841...PC2026 (Polygon GI Registry)',
  };

  return (
    <div className="w-full">
      {!autoUnfold && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-[#3F0F17] text-[#F7F1E6] border-2 border-[#C9A227] rounded-[6px] p-6 shadow-2xl flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full border border-[#C9A227] bg-[#6B1E28] flex items-center justify-center text-[#C9A227] group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6 stroke-[1.25]" />
            </div>
            <div>
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#E8D8A8] block">
                Digital Authenticity Ledger
              </span>
              <h3 className="font-display font-semibold text-lg text-[#F7F1E6] group-hover:text-[#C9A227] transition-colors">
                Unfold Authenticity Passport
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#E8D8A8] font-semibold uppercase tracking-wider">
            <span>{isOpen ? 'Fold Ledger' : 'Tap to Unfold'}</span>
            <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
          </div>
        </button>
      )}

      {/* Unfolding Parchment Card */}
      <AnimatePresence>
        {(isOpen || autoUnfold) && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.1, rotateX: -30 }}
            animate={{ opacity: 1, scaleY: 1, rotateX: 0 }}
            exit={{ opacity: 0, scaleY: 0.1, rotateX: -30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'top center' }}
            className="mt-4 bg-[#FBF7EF] text-[#2B2320] border-4 border-double border-[#C9A227] rounded-[6px] p-8 shadow-2xl relative bg-woven-pattern overflow-hidden"
          >
            {/* Corner Borders */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#C9A227] pointer-events-none" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#C9A227] pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#C9A227] pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#C9A227] pointer-events-none" />

            {/* Passport Header with 3D GI Medal Seal */}
            <div className="text-center pb-6 border-b border-[#C9A227]/40 space-y-2">
              <PassportSeal3D />
              <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#6B1E28] font-bold block pt-2">
                REPUBLIC OF INDIA • GEOGRAPHICAL INDICATION REGISTRY
              </span>
              <h2 className="font-display text-2xl font-bold text-[#3F0F17]">
                ATELIER PASSPORT OF AUTHENTICITY
              </h2>
              <span className="font-mono text-xs text-[#8A7A68] block">ID: {pass.qrId}</span>
            </div>

            {/* Passport Details */}
            <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs border-b border-[#C9A227]/30">
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#8A7A68] font-semibold block">Master Weaver</span>
                  <span className="font-display font-bold text-base text-[#6B1E28]">{pass.weaverName}</span>
                  <span className="text-[11px] text-[#8A7A68] block">{pass.village}, Telangana</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#8A7A68] font-semibold block">Artisan Cluster</span>
                  <span className="font-bold text-[#3F0F17]">{pass.clusterName}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#8A7A68] font-semibold block">Material Composition</span>
                  <span className="font-bold text-[#3F0F17]">{pass.material}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#8A7A68] font-semibold block">Labor Investment</span>
                  <span className="font-display font-bold text-base text-[#0B3D2E]">{pass.weavingHours} Loom Hours</span>
                </div>
              </div>
            </div>

            {/* Narrative */}
            <div className="py-6 space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-[#8A7A68] font-semibold block">Provenance Story</span>
              <p className="font-editorial text-sm italic text-[#2B2320] leading-relaxed">
                "{pass.storySnapshot}"
              </p>
            </div>

            {/* Verification Stamp */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#C9A227]/40">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0B3D2E]/10 border border-[#0B3D2E]/40 text-[#0B3D2E] rounded text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-[#0B3D2E]" />
                <span>GI CERTIFIED AUTHENTIC</span>
              </div>

              <span className="font-mono text-[10px] text-[#8A7A68]">
                Polygon Ledger Ref: {pass.ledgerRef}
              </span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
