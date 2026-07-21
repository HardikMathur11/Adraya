'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCTS, WEAVERS } from '@/lib/data';
import { PassportUnfold } from '@/components/passport/PassportUnfold';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, ArrowLeft, ExternalLink, Sparkles } from 'lucide-react';

export default function PassportLandingPage({ params }: { params: { qrId: string } }) {
  const product = PRODUCTS.find((p) => p.qrId === params.qrId) || PRODUCTS[0];
  const weaver = WEAVERS.find((w) => w.id === product.weaverId) || WEAVERS[0];

  return (
    <div className="min-h-screen bg-[var(--color-wine)] text-[var(--color-ivory)] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      
      {/* Top Banner Header */}
      <div className="max-w-3xl mx-auto w-full flex items-center justify-between border-b border-[var(--color-gold)]/30 pb-4">
        <Link href="/" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-gold-light)] hover:text-[var(--color-gold)] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Atelier</span>
        </Link>

        <div className="flex items-center gap-1.5 text-xs text-[var(--color-emerald)] bg-[var(--color-emerald)]/20 px-3 py-1 rounded border border-[var(--color-emerald)]/40 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Live Digital Ledger Signed</span>
        </div>
      </div>

      {/* Main Container - Auto Unfolded Passport */}
      <div className="max-w-3xl mx-auto w-full my-auto py-8">
        <div className="text-center mb-6 space-y-2">
          <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[var(--color-gold-light)] bg-[var(--color-oxblood)] px-3 py-1 rounded border border-[var(--color-gold)]/30">
            Physical QR Authentication Verification
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-ivory)]">
            Verified Handloom Provenance
          </h1>
          <p className="font-editorial text-sm italic text-[var(--color-ivory)]/80 max-w-md mx-auto">
            You have scanned an authentic GI-registered textile. Complete provenance ledger details are verified below.
          </p>
        </div>

        {/* Passport Unfold Component with autoUnfold=true */}
        <PassportUnfold
          weaverName={product.weaverName}
          village={product.weaverVillage}
          region={product.region}
          material={product.material}
          hoursInvested={product.hoursInvested}
          qrId={params.qrId}
          weaverAvatar={product.weaverAvatar}
          autoUnfold={true}
        />

        {/* Action Buttons Below Passport */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link href={`/product/${product.slug}`}>
            <Button variant="gold" size="md" className="w-full sm:w-auto flex items-center gap-2">
              <span>View Product Detail in Atelier</span>
              <ExternalLink className="w-4 h-4" />
            </Button>
          </Link>

          <Link href={`/weaver/${weaver.id}`}>
            <Button variant="secondary" size="md" className="w-full sm:w-auto text-[var(--color-ivory)] border-[var(--color-gold)]/40 hover:bg-[var(--color-oxblood)]">
              Meet Master Weaver {weaver.name}
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer Ledger Notice */}
      <div className="text-center text-[10px] text-[var(--color-gold-light)]/60 uppercase tracking-widest pt-8 border-t border-[var(--color-gold)]/20 max-w-3xl mx-auto w-full">
        <span>Handloom Protocol v4.2 • Cryptographic Hash Verification • Ministry of Textiles India</span>
      </div>

    </div>
  );
}
