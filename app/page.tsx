'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, ArrowRight, Sparkles, HeartHandshake, Award, Compass, MapPin } from 'lucide-react';
import { MOOD_COLLECTIONS, PRODUCTS, WEAVERS } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { GoldLabel } from '@/components/ui/GoldLabel';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/store/useCartStore';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const { addItem } = useCartStore();
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionsRef.current) return;

    const sections = sectionsRef.current.querySelectorAll('.gsap-reveal');
    sections.forEach((sec) => {
      gsap.fromTo(
        sec,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 85%',
          },
        }
      );
    });
  }, []);

  return (
    <div ref={sectionsRef} className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[var(--color-wine)] text-[var(--color-ivory)]">
        {/* Full-Bleed Live Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80 scale-105"
            src="/assets/loom-artisan-video.mp4"
          />
          {/* Subtle Oxblood Gradient Overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-wine)] via-[var(--color-oxblood)]/40 to-[var(--color-wine)]/30 pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-gold-light)] bg-[var(--color-oxblood)]/80 px-4 py-1.5 rounded-full border border-[var(--color-gold)]/40 mb-6">
              Official Indian Handloom Atelier & Provenance Registry
            </span>

            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-wide leading-tight text-[var(--color-ivory)] drop-shadow-md">
              Heritage, Woven for You
            </h1>

            <p className="font-editorial text-xl sm:text-2xl text-[var(--color-ivory)]/90 italic max-w-3xl mx-auto mt-6 leading-relaxed">
              Curated royal Benarasi brocades, golden Assamese Muga silk, and temple Kanjeevarams—direct from master Indian looms with cryptographically verified GI provenance.
            </p>
          </motion.div>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/collections/heirloom-gift">
              <Button variant="gold" size="lg" className="w-full sm:w-auto">
                Shop the Collection
              </Button>
            </Link>

            <Link href="/b2b">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto text-[var(--color-ivory)] border-[var(--color-gold)]/50 hover:bg-[var(--color-gold)] hover:text-[var(--color-wine)]">
                Source for Business (B2B)
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. MOOD COLLECTIONS ROW */}
      <section className="gsap-reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--color-gold)]/30 pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)] block">
              Curated Mood Palettes
            </span>
            <h2 className="font-display text-3xl font-semibold text-[var(--color-wine)] mt-1">
              Select Your Heritage Mood
            </h2>
          </div>
          <p className="font-editorial text-sm italic text-[var(--color-taupe)] max-w-md">
            Explore handloom collections dynamically styled with local mood sub-palettes.
          </p>
        </div>

        {/* Horizontal Scrollable Row with Scroll-Snap */}
        <div className="flex gap-6 overflow-x-auto pb-6 scroll-snap-x snap-mandatory">
          {MOOD_COLLECTIONS.map((mood) => (
            <div
              key={mood.id}
              data-mood={mood.moodKey}
              className="snap-start shrink-0 w-80 sm:w-96 rounded-[var(--radius-card)] overflow-hidden border border-[var(--color-gold)]/30 bg-[var(--color-cream)] shadow-fabric group hover:border-[var(--color-gold)] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={mood.heroImage}
                  alt={mood.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Mood Tint Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-wine)]/90 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 z-10">
                  <GoldLabel>{mood.moodKey.replace('-', ' ')}</GoldLabel>
                </div>
              </div>

              <div className="p-6 bg-[var(--color-cream)] flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-[var(--color-wine)] group-hover:text-[var(--color-oxblood)] transition-colors">
                    {mood.title}
                  </h3>
                  <p className="text-xs font-semibold text-[var(--color-taupe)] mt-1 uppercase tracking-wider">
                    {mood.subtitle}
                  </p>
                </div>

                <Link href={`/collections/${mood.moodKey}`} className="block">
                  <Button variant="primary" size="sm" className="w-full">
                    Explore Mood Palette
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CURATED PRODUCT GRID */}
      <section className="gsap-reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)]">
            Masterpiece Gallery
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-wine)]">
            Curated Atelier Weaves
          </h2>
          <p className="font-editorial text-base italic text-[var(--color-taupe)]">
            Each piece is single-origin handwoven. No mass reproduction, no discounts—pure heritage valuation.
          </p>
        </div>

        {/* Asymmetric CSS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((prod, idx) => (
            <div
              key={prod.id}
              className={`bg-[var(--color-cream)] border border-[var(--color-gold)]/30 rounded-[var(--radius-card)] overflow-hidden shadow-fabric group hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between ${
                idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-[var(--color-wine)]">
                <Image
                  src={prod.images[0]}
                  alt={prod.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <Badge variant="verified">GI-Tagged</Badge>
                  {prod.stock <= 5 && (
                    <GoldLabel>Limited Weave — {prod.stock} left</GoldLabel>
                  )}
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-display font-bold text-xl text-[var(--color-oxblood)]">
                      {prod.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[var(--color-taupe)] mt-1 font-medium">
                    {prod.weaveName} • {prod.region}
                  </p>

                  {/* Weaver Byline */}
                  <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-[var(--color-gold)]/20">
                    <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[var(--color-gold)]">
                      <Image src={prod.weaverAvatar} alt={prod.weaverName} fill className="object-cover" />
                    </div>
                    <span className="text-xs font-semibold text-[var(--color-charcoal)]">
                      Handwoven by {prod.weaverName} ({prod.weaverSharePercentage}% direct share)
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[var(--color-gold)]/20">
                  <div>
                    <span className="text-[10px] font-sans uppercase tracking-widest text-[var(--color-taupe)] block">
                      Price
                    </span>
                    <span className="font-display font-bold text-lg text-[var(--color-wine)]">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/product/${prod.slug}`}>
                      <Button variant="secondary" size="sm">
                        View 3D
                      </Button>
                    </Link>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() =>
                        addItem({
                          id: prod.id,
                          slug: prod.slug,
                          title: prod.title,
                          weaveName: prod.weaveName,
                          region: prod.region,
                          weaverName: prod.weaverName,
                          weaverId: prod.weaverId,
                          price: prod.price,
                          weaverSharePercentage: prod.weaverSharePercentage,
                          image: prod.images[0],
                        })
                      }
                    >
                      Acquire
                    </Button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WEAVERS ROW */}
      <section className="gsap-reveal bg-[var(--color-wine)] text-[var(--color-ivory)] py-16 border-y border-[var(--color-gold)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--color-gold)]/20 pb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gold-light)]">
                The Hands Behind the Threads
              </span>
              <h2 className="font-display text-3xl font-semibold text-[var(--color-ivory)] mt-1">
                Meet India's Shilp Guru Artisans
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {WEAVERS.map((weaver) => (
              <div
                key={weaver.id}
                className="bg-[var(--color-oxblood)]/60 border border-[var(--color-gold)]/30 rounded-[var(--radius-card)] overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-[var(--color-gold)] transition-all duration-300"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src={weaver.avatar}
                    alt={weaver.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-wine)] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] uppercase tracking-widest text-[var(--color-gold-light)] block font-semibold">
                      {weaver.specialty}
                    </span>
                    <h3 className="font-display font-bold text-xl text-[var(--color-ivory)]">
                      {weaver.name}
                    </h3>
                    <p className="text-xs text-[var(--color-ivory)]/80 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                      {weaver.village}, {weaver.region}
                    </p>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="font-editorial text-sm italic text-[var(--color-ivory)]/90 line-clamp-3">
                    "{weaver.biography}"
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-center py-2 border-y border-[var(--color-gold)]/20 text-xs">
                    <div>
                      <span className="font-display font-bold text-base text-[var(--color-gold-light)]">
                        {weaver.yearsWeaving}+ Yrs
                      </span>
                      <span className="block text-[10px] uppercase text-[var(--color-ivory)]/70">
                        Experience
                      </span>
                    </div>
                    <div>
                      <span className="font-display font-bold text-base text-[var(--color-gold-light)]">
                        {weaver.clusterSize}
                      </span>
                      <span className="block text-[10px] uppercase text-[var(--color-ivory)]/70">
                        Guild Weavers
                      </span>
                    </div>
                  </div>

                  <Link href={`/weaver/${weaver.id}`} className="block">
                    <Button variant="gold" size="sm" className="w-full">
                      View Artisan Profile
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VISIT BANNER CTA */}
      <section className="gsap-reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[var(--radius-card)] overflow-hidden border-2 border-[var(--color-gold)] shadow-fabric bg-[var(--color-wine)] text-[var(--color-ivory)] p-10 sm:p-16 text-center space-y-6">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=1600"
              alt="Loom courtyard golden hour"
              fill
              className="object-cover opacity-30"
            />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-gold-light)] bg-[var(--color-oxblood)] px-3 py-1 rounded">
              Loom Courtyard Residencies
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-[var(--color-ivory)]">
              Step Into the Craft
            </h2>
            <p className="font-editorial text-lg italic text-[var(--color-ivory)]/90">
              Book private immersive journeys to traditional weaving villages in Assam, Varanasi, and Kanchipuram. Share meals with master craftsmen and witness history unfold.
            </p>

            <div className="pt-4">
              <Link href="/visits">
                <Button variant="gold" size="lg" className="inline-flex items-center gap-2">
                  <Compass className="w-4 h-4" />
                  <span>Reserve Loom Visit Experience</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRUST STRIP */}
      <section className="gsap-reveal max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[var(--color-cream)] border border-[var(--color-gold)]/30 rounded-[var(--radius-card)] p-8 shadow-fabric">
          
          <div className="flex items-center gap-4 p-4 border-b md:border-b-0 md:border-r border-[var(--color-gold)]/20">
            <div className="w-12 h-12 rounded-full border border-[var(--color-gold)] bg-[var(--color-wine)] flex items-center justify-center shrink-0 text-[var(--color-gold)]">
              <ShieldCheck className="w-6 h-6 stroke-[1.25]" />
            </div>
            <div>
              <h4 className="font-display font-semibold text-sm text-[var(--color-oxblood)] uppercase tracking-wider">
                GI-Tagged & Verified
              </h4>
              <p className="text-xs text-[var(--color-taupe)] mt-0.5">
                Authentic Geographical Indication protection for all textiles.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 border-b md:border-b-0 md:border-r border-[var(--color-gold)]/20">
            <div className="w-12 h-12 rounded-full border border-[var(--color-gold)] bg-[var(--color-wine)] flex items-center justify-center shrink-0 text-[var(--color-gold)]">
              <HeartHandshake className="w-6 h-6 stroke-[1.25]" />
            </div>
            <div>
              <h4 className="font-display font-semibold text-sm text-[var(--color-oxblood)] uppercase tracking-wider">
                Direct-to-Weaver Fair Pricing
              </h4>
              <p className="text-xs text-[var(--color-taupe)] mt-0.5">
                80%+ of total price goes straight to the weaver's bank account.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4">
            <div className="w-12 h-12 rounded-full border border-[var(--color-gold)] bg-[var(--color-wine)] flex items-center justify-center shrink-0 text-[var(--color-gold)]">
              <Award className="w-6 h-6 stroke-[1.25]" />
            </div>
            <div>
              <h4 className="font-display font-semibold text-sm text-[var(--color-oxblood)] uppercase tracking-wider">
                AI Provenance Passport
              </h4>
              <p className="text-xs text-[var(--color-taupe)] mt-0.5">
                Embedded QR digital ledger certificates with every purchase.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
