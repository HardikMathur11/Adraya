'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, QrCode, Sparkles, ChevronDown, Award } from 'lucide-react';

interface PassportUnfoldProps {
  weaverName: string;
  village: string;
  region: string;
  material: string;
  hoursInvested: number;
  qrId: string;
  weaverAvatar?: string;
  autoUnfold?: boolean;
}

export const PassportUnfold: React.FC<PassportUnfoldProps> = ({
  weaverName,
  village,
  region,
  material,
  hoursInvested,
  qrId,
  weaverAvatar = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
  autoUnfold = false,
}) => {
  const [isOpen, setIsOpen] = useState(autoUnfold);

  return (
    <div className="w-full max-w-2xl mx-auto my-8">
      {/* Trigger Cover Card */}
      {!autoUnfold && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-[var(--color-wine)] text-[var(--color-ivory)] border-2 border-[var(--color-gold)] p-6 rounded-[var(--radius-card)] shadow-fabric flex items-center justify-between hover:bg-[var(--color-oxblood)] transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full border border-[var(--color-gold)] bg-[var(--color-oxblood)] flex items-center justify-center text-[var(--color-gold)] group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6 stroke-[1.25]" />
            </div>
            <div>
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[var(--color-gold-light)] block">
                Digital Authenticity Ledger
              </span>
              <h3 className="font-display font-semibold text-lg text-[var(--color-ivory)] group-hover:text-[var(--color-gold)] transition-colors">
                Unfold Authenticity Passport
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--color-gold-light)] font-semibold uppercase tracking-wider">
            <span>{isOpen ? 'Fold Ledger' : 'Tap to Unfold'}</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-500 ${
                isOpen ? 'rotate-180' : 'rotate-0'
              }`}
            />
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
            className="mt-4 bg-[#FBF7EF] text-[var(--color-charcoal)] border-4 border-double border-[var(--color-gold)] rounded-[var(--radius-card)] p-8 shadow-2xl relative bg-woven-pattern overflow-hidden"
          >
            {/* Ornamental Gold Temple Border Corners */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[var(--color-gold)] pointer-events-none" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[var(--color-gold)] pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[var(--color-gold)] pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[var(--color-gold)] pointer-events-none" />

            {/* Passport Header */}
            <div className="text-center pb-6 border-b border-[var(--color-gold)]/40 space-y-1">
              <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[var(--color-oxblood)] font-bold">
                REPUBLIC OF INDIA • GEOGRAPHICAL INDICATION REGISTRY
              </span>
              <h2 className="font-display text-2xl font-bold text-[var(--color-wine)] tracking-wider uppercase">
                Artisan Provenance Passport
              </h2>
              <p className="font-editorial text-xs italic text-[var(--color-taupe)]">
                Cryptographically Signed Handloom Heritage Certificate
              </p>
            </div>

            {/* Content Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-b border-[var(--color-gold)]/30 items-center">
              
              {/* Weaver Photo & Credit */}
              <div className="text-center sm:text-left space-y-2">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--color-gold)] mx-auto sm:mx-0 shadow-md">
                  <Image src={weaverAvatar} alt={weaverName} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-[var(--color-oxblood)]">
                    {weaverName}
                  </h4>
                  <p className="text-xs text-[var(--color-taupe)]">{village}, {region}</p>
                </div>
              </div>

              {/* Craft Specifications */}
              <div className="sm:col-span-2 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-taupe)] block">
                    Material Composition
                  </span>
                  <span className="font-medium text-[var(--color-charcoal)]">{material}</span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-taupe)] block">
                    Loom Hours Invested
                  </span>
                  <span className="font-display font-bold text-base text-[var(--color-oxblood)]">
                    {hoursInvested} Hours
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-taupe)] block">
                    Craft Certification
                  </span>
                  <span className="inline-flex items-center gap-1 text-[var(--color-emerald)] font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    GI-Tagged & Verified
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-taupe)] block">
                    Fair Direct Share
                  </span>
                  <span className="font-semibold text-[var(--color-emerald)]">
                    80%+ Direct Artisan Revenue
                  </span>
                </div>
              </div>

            </div>

            {/* Bottom Row: Emerald Stamp + Monospace QR Ledger ID */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
              
              {/* Emerald Stamp Graphic */}
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full border-2 border-[var(--color-emerald)] bg-[var(--color-emerald)]/10 flex items-center justify-center rotate-[-12deg] shadow-sm shrink-0">
                  <div className="text-center text-[var(--color-emerald)] font-bold text-[9px] uppercase leading-tight">
                    <span>★ VERIFIED ★</span>
                    <br />
                    <span className="text-[11px] font-display">AUTHENTIC</span>
                    <br />
                    <span>HERITAGE</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[var(--color-taupe)] block">
                    LEDGER REFERENCE:
                  </span>
                  <span className="font-mono text-xs font-bold text-[var(--color-charcoal)]">
                    {qrId}
                  </span>
                </div>
              </div>

              {/* QR Code Action Link */}
              <Link
                href={`/passport/${qrId}`}
                className="flex items-center gap-3 p-3 bg-[var(--color-ivory)] border border-[var(--color-gold)]/40 rounded shadow-sm hover:border-[var(--color-gold)] transition-colors"
              >
                <QrCode className="w-10 h-10 text-[var(--color-wine)] stroke-[1.25]" />
                <div className="text-left text-[10px]">
                  <span className="font-bold text-[var(--color-oxblood)] uppercase block">
                    Scan or View QR Landing
                  </span>
                  <span className="text-[var(--color-taupe)] underline">/passport/{qrId}</span>
                </div>
              </Link>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
