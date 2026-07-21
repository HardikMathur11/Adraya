'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Play, MapPin, Compass, ShieldCheck, ArrowRight, X } from 'lucide-react';
import { WEAVERS, PRODUCTS } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { GoldLabel } from '@/components/ui/GoldLabel';
import { Badge } from '@/components/ui/Badge';
import { LuxuryVideoPlayer } from '@/components/ui/LuxuryVideoPlayer';
import { useCartStore } from '@/store/useCartStore';

export default function WeaverProfilePage({ params }: { params: { id: string } }) {
  const weaver = WEAVERS.find((w) => w.id === params.id) || WEAVERS[0];
  const weaverProducts = PRODUCTS.filter((p) => p.weaverId === weaver.id);
  const { addItem } = useCartStore();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  if (!weaver) return notFound();

  return (
    <div className="space-y-16 pb-24">
      
      {/* Full-Width Portrait Vignette Header */}
      <section className="relative h-[65vh] min-h-[480px] w-full overflow-hidden bg-[var(--color-wine)] text-[var(--color-ivory)] flex items-end">
        <Image
          src={weaver.heroImage}
          alt={weaver.name}
          fill
          priority
          className="object-cover brightness-75 scale-105 transition-transform duration-10000"
        />
        {/* Soft Vignette Radial Gradient Overlay */}
        <div className="absolute inset-0 heritage-vignette" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-wine)] via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full space-y-3">
          <GoldLabel>{weaver.specialty}</GoldLabel>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-[var(--color-ivory)] drop-shadow-md">
            Master {weaver.name}
          </h1>
          <p className="text-sm sm:text-base font-sans text-[var(--color-gold-light)] flex items-center gap-2 font-medium uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-[var(--color-gold)]" />
            Loom Courtyard • {weaver.village}, {weaver.region}
          </p>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[var(--color-cream)] border-2 border-[var(--color-gold)]/40 rounded-[var(--radius-card)] p-8 shadow-fabric text-center">
          
          <div className="p-4 border-b md:border-b-0 md:border-r border-[var(--color-gold)]/30">
            <span className="font-display text-4xl sm:text-5xl font-bold text-[var(--color-oxblood)]">
              {weaver.yearsWeaving}
            </span>
            <span className="block font-sans text-xs uppercase font-semibold tracking-widest text-[var(--color-taupe)] mt-2">
              Years at the Pit Loom
            </span>
          </div>

          <div className="p-4 border-b md:border-b-0 md:border-r border-[var(--color-gold)]/30">
            <span className="font-display text-4xl sm:text-5xl font-bold text-[var(--color-wine)]">
              {weaver.piecesCreated}
            </span>
            <span className="block font-sans text-xs uppercase font-semibold tracking-widest text-[var(--color-taupe)] mt-2">
              Masterpieces Created
            </span>
          </div>

          <div className="p-4">
            <span className="font-display text-4xl sm:text-5xl font-bold text-[var(--color-emerald)]">
              {weaver.clusterSize}
            </span>
            <span className="block font-sans text-xs uppercase font-semibold tracking-widest text-[var(--color-taupe)] mt-2">
              Artisans Trained in Guild
            </span>
          </div>

        </div>
      </section>

      {/* Biography & Embedded Video Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Biography Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)]">
              Artisan Heritage Biography
            </span>
            <h2 className="font-display text-3xl font-bold text-[var(--color-wine)]">
              A Lifetime Woven in Thread
            </h2>
            <p className="font-editorial text-lg sm:text-xl text-[var(--color-charcoal)] leading-relaxed italic border-l-2 border-[var(--color-gold)] pl-4">
              "{weaver.biography}"
            </p>
            <p className="text-xs text-[var(--color-taupe)] leading-relaxed">
              Every garment carrying Master {weaver.name}'s hallmark represents over three decades of unbroken weaving tradition passed down from royal loom masters.
            </p>

            <div className="pt-4">
              <Link href={`/visits?weaver=${weaver.id}`}>
                <Button variant="secondary" size="lg" className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[var(--color-gold)]" />
                  <span>Book a Loom Visit with {weaver.name}</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Embedded Video Thumbnail with Gold Thread Spool Play Icon */}
          <div className="lg:col-span-6">
            <div
              onClick={() => setIsVideoOpen(true)}
              className="relative h-80 sm:h-96 w-full rounded-[var(--radius-card)] overflow-hidden border-2 border-[var(--color-gold)] shadow-2xl group cursor-pointer"
            >
              <Image
                src={weaver.avatar}
                alt={weaver.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

              {/* Gold Thread-Spool Play Icon Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full border-2 border-[var(--color-gold)] bg-[var(--color-wine)]/90 flex items-center justify-center text-[var(--color-gold)] group-hover:scale-110 transition-transform shadow-2xl">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-ivory)] mt-4 bg-[var(--color-oxblood)]/80 px-3 py-1 rounded border border-[var(--color-gold)]/30">
                  Watch Loom Documentary (3 mins)
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Video Player Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-[var(--color-wine)] border-2 border-[var(--color-gold)] rounded-[var(--radius-card)] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--color-gold)]/30 pb-3">
              <h3 className="font-display font-bold text-lg text-[var(--color-ivory)]">
                Loom Documentary — Master {weaver.name}
              </h3>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="text-[var(--color-ivory)] hover:text-[var(--color-gold)] text-xs font-semibold flex items-center gap-1 bg-[var(--color-oxblood)] px-3 py-1.5 rounded border border-[var(--color-gold)]/40 cursor-pointer"
              >
                <X className="w-4 h-4" /> Close Documentary
              </button>
            </div>

            <div className="w-full h-[400px] sm:h-[480px]">
              <LuxuryVideoPlayer
                src="/loom-artisan-video.mp4"
                title={`Master Weaver ${weaver.name} — Pit Loom Documentary`}
                subtitle={`Hand-weaving Sualkuchi silk in ${weaver.village}, ${weaver.region}`}
                autoPlay={true}
                loop={true}
                muted={false}
                className="h-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Active Listings Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8 border-t border-[var(--color-gold)]/30">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)]">
            Artisan Catalog
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-wine)] mt-1">
            Active Works Handwoven by {weaver.name}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {weaverProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-[var(--color-cream)] border border-[var(--color-gold)]/30 rounded-[var(--radius-card)] overflow-hidden shadow-fabric flex flex-col justify-between group hover:border-[var(--color-gold)] transition-all"
            >
              <div className="relative h-80 w-full overflow-hidden bg-[var(--color-wine)]">
                <Image src={prod.images[0]} alt={prod.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="verified">GI-Tagged</Badge>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-bold text-lg text-[var(--color-oxblood)]">{prod.title}</h4>
                  <p className="text-xs text-[var(--color-taupe)] mt-0.5">{prod.weaveName}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[var(--color-gold)]/20">
                  <span className="font-display font-bold text-lg text-[var(--color-wine)]">
                    ₹{prod.price.toLocaleString('en-IN')}
                  </span>
                  <Link href={`/product/${prod.slug}`}>
                    <Button variant="primary" size="sm">
                      Inspect 3D Weave
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
