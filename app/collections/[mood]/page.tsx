'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronDown, Filter, ShieldCheck, ShoppingBag } from 'lucide-react';
import { MOOD_COLLECTIONS, PRODUCTS, MoodCollection } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { GoldLabel } from '@/components/ui/GoldLabel';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/store/useCartStore';

export default function MoodCollectionPage({ params }: { params: { mood: string } }) {
  const collection =
    MOOD_COLLECTIONS.find((m) => m.moodKey === params.mood) || MOOD_COLLECTIONS[0];
  const { addItem } = useCartStore();

  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [accordionOpen, setAccordionOpen] = useState<{ [key: string]: boolean }>({
    region: true,
    weaveType: true,
    material: false,
    price: false,
  });

  const toggleAccordion = (key: string) => {
    setAccordionOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedRegion !== 'all' && !p.region.toLowerCase().includes(selectedRegion.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div data-mood={collection.moodKey} className="pb-24 space-y-12">
      
      {/* Museum Wall-Text Header Banner */}
      <section className="bg-[var(--color-wine)] text-[var(--color-ivory)] py-16 border-b border-[var(--color-gold)]/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <GoldLabel>{collection.moodKey.replace('-', ' ')} palette</GoldLabel>
          
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[var(--color-ivory)] tracking-wide">
            {collection.title}
          </h1>

          <p className="font-editorial text-xs font-sans tracking-[0.25em] uppercase text-[var(--color-gold-light)]">
            {collection.subtitle}
          </p>

          {/* Museum Wall-Text Style Intro Paragraph */}
          <div className="pt-4 max-w-3xl mx-auto border-t border-[var(--color-gold)]/20">
            <p className="font-editorial text-lg sm:text-xl text-[var(--color-ivory)]/90 italic leading-relaxed">
              "{collection.editorialWallText}"
            </p>
          </div>
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Filter Sidebar (Accordion Style) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="p-6 bg-[var(--color-cream)] border border-[var(--color-gold)]/30 rounded-[var(--radius-card)] shadow-fabric space-y-6">
              
              <div className="flex items-center justify-between border-b border-[var(--color-gold)]/20 pb-3">
                <h3 className="font-display font-bold text-sm text-[var(--color-wine)] uppercase tracking-wider flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[var(--color-gold)]" />
                  Atelier Filters
                </h3>
                {selectedRegion !== 'all' && (
                  <button
                    onClick={() => setSelectedRegion('all')}
                    className="text-[10px] text-[var(--color-oxblood)] hover:underline uppercase font-bold"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Accordion 1: Region */}
              <div className="border-b border-[var(--color-gold)]/20 pb-4">
                <button
                  onClick={() => toggleAccordion('region')}
                  className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] py-1"
                >
                  <span>Region & Guild</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--color-gold)] transition-transform ${
                      accordionOpen.region ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {accordionOpen.region && (
                  <div className="mt-3 space-y-2 text-xs">
                    {['all', 'Assam', 'Varanasi', 'Kanchipuram'].map((reg) => (
                      <button
                        key={reg}
                        onClick={() => setSelectedRegion(reg)}
                        className={`block w-full text-left py-1 px-2 rounded transition-colors ${
                          selectedRegion === reg
                            ? 'bg-[var(--color-wine)] text-[var(--color-gold-light)] font-bold'
                            : 'text-[var(--color-taupe)] hover:text-[var(--color-oxblood)]'
                        }`}
                      >
                        {reg === 'all' ? 'All Weaving Regions' : reg}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion 2: Weave Type */}
              <div className="border-b border-[var(--color-gold)]/20 pb-4">
                <button
                  onClick={() => toggleAccordion('weaveType')}
                  className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] py-1"
                >
                  <span>Weave Technique</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--color-gold)] transition-transform ${
                      accordionOpen.weaveType ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {accordionOpen.weaveType && (
                  <div className="mt-3 space-y-1.5 text-xs text-[var(--color-taupe)]">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-[var(--color-gold)]" />
                      <span>Kadwa Pit Brocade</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-[var(--color-gold)]" />
                      <span>Korvai Interlocked Border</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-[var(--color-gold)]" />
                      <span>Jamdani Extra-Weft</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Accordion 3: Material */}
              <div>
                <button
                  onClick={() => toggleAccordion('material')}
                  className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] py-1"
                >
                  <span>Pure Material</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--color-gold)] transition-transform ${
                      accordionOpen.material ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {accordionOpen.material && (
                  <div className="mt-3 space-y-1.5 text-xs text-[var(--color-taupe)]">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-[var(--color-gold)]" />
                      <span>Wild Golden Muga Silk</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-[var(--color-gold)]" />
                      <span>Pure Katan Mulberry Silk</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-[var(--color-gold)]" />
                      <span>Botanical Eri Ahimsa Silk</span>
                    </label>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Right Column: Masonry Product Grid */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--color-gold)]/20 pb-3">
              <span className="text-xs uppercase font-semibold tracking-wider text-[var(--color-taupe)]">
                Showing {filteredProducts.length} Curated Masterpieces
              </span>
              <span className="text-xs font-semibold text-[var(--color-wine)]">
                GI-Tagged Provenance Verified
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-[var(--color-cream)] border border-[var(--color-gold)]/30 rounded-[var(--radius-card)] overflow-hidden shadow-fabric group hover:-translate-y-1 transition-all flex flex-col justify-between"
                >
                  <div className="relative h-80 w-full overflow-hidden bg-[var(--color-wine)]">
                    <Image
                      src={prod.images[0]}
                      alt={prod.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
                      <Badge variant="verified">GI Certified</Badge>
                      {prod.stock <= 5 && (
                        <GoldLabel>Limited Weave — only {prod.stock} pieces available</GoldLabel>
                      )}
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-bold text-lg text-[var(--color-oxblood)]">
                        {prod.title}
                      </h3>
                      <p className="text-xs text-[var(--color-taupe)] mt-0.5">
                        {prod.weaveName} • {prod.region}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[var(--color-gold)]/20">
                      <div>
                        <span className="text-[10px] text-[var(--color-taupe)] uppercase tracking-widest block">
                          Value
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
          </div>

        </div>
      </div>

    </div>
  );
}
