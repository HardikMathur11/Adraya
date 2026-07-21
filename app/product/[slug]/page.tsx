'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShieldCheck, Heart, Sparkles, ShoppingBag, ArrowRight, Table } from 'lucide-react';
import { PRODUCTS, WEAVERS, Product } from '@/lib/data';
import { ProductViewer3D } from '@/components/three/ProductViewer3D';
import { LuxuryVideoPlayer } from '@/components/ui/LuxuryVideoPlayer';
import { ParallaxSection } from '@/components/storytelling/ParallaxSection';
import { LoomWaveformPlayer } from '@/components/audio/LoomWaveformPlayer';
import { PassportUnfold } from '@/components/passport/PassportUnfold';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GoldLabel } from '@/components/ui/GoldLabel';
import { useCartStore } from '@/store/useCartStore';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = PRODUCTS.find((p) => p.slug === params.slug) || PRODUCTS[0];
  const weaver = WEAVERS.find((w) => w.id === product.weaverId) || WEAVERS[0];
  const { addItem } = useCartStore();

  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [mediaTab, setMediaTab] = useState<'3d' | 'video'>('3d');

  if (!product) return notFound();

  return (
    <div className="space-y-16 pb-24">
      
      {/* Top Product Hero Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Breadcrumb Navigation */}
        <div className="text-xs text-[var(--color-taupe)] uppercase tracking-wider mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[var(--color-wine)]">
            Atelier
          </Link>
          <span>/</span>
          <Link href={`/collections/${product.mood}`} className="hover:text-[var(--color-wine)]">
            {product.mood.replace('-', ' ')}
          </Link>
          <span>/</span>
          <span className="text-[var(--color-oxblood)] font-bold">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: 3D Garment Viewer & Live Video Stream */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex gap-2 bg-[var(--color-cream)] p-1 rounded border border-[var(--color-gold)]/30 text-xs font-semibold uppercase tracking-wider w-fit">
              <button
                onClick={() => setMediaTab('3d')}
                className={`px-3 py-1 rounded transition-colors ${
                  mediaTab === '3d'
                    ? 'bg-[var(--color-wine)] text-[var(--color-gold-light)]'
                    : 'text-[var(--color-taupe)] hover:text-[var(--color-wine)]'
                }`}
              >
                3D Weave Viewer
              </button>
              <button
                onClick={() => setMediaTab('video')}
                className={`px-3 py-1 rounded transition-colors ${
                  mediaTab === 'video'
                    ? 'bg-[var(--color-wine)] text-[var(--color-gold-light)]'
                    : 'text-[var(--color-taupe)] hover:text-[var(--color-wine)]'
                }`}
              >
                Live Loom Video Stream
              </button>
            </div>

            {mediaTab === '3d' ? (
              <ProductViewer3D
                textureUrl={product.textureUrl}
                macroTextureUrl={product.macroTextureUrl}
                images={product.images}
                productTitle={product.title}
              />
            ) : (
              <LuxuryVideoPlayer
                src="/loom-artisan-video.mp4"
                title={`Live Weaving Feed — ${product.title}`}
                subtitle={`Handwoven by Master Artisan ${product.weaverName} in ${product.weaverVillage}`}
                autoPlay={true}
                loop={true}
                muted={true}
                className="h-[480px] sm:h-[560px]"
              />
            )}
          </div>

          {/* Right Column: Product Info & Purchase Controls */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="verified">GI-Tagged & Verified</Badge>
                {product.stock <= 5 && (
                  <GoldLabel>Limited Weave — {product.stock} available</GoldLabel>
                )}
              </div>

              <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-wine)] leading-tight">
                {product.title}
              </h1>

              <p className="text-xs text-[var(--color-taupe)] font-semibold uppercase tracking-widest">
                {product.weaveName} • {product.region}
              </p>
            </div>

            {/* Weaver Byline */}
            <Link
              href={`/weaver/${weaver.id}`}
              className="flex items-center gap-3 p-3 bg-[var(--color-cream)] border border-[var(--color-gold)]/30 rounded-[var(--radius-card)] hover:border-[var(--color-gold)] transition-colors group"
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[var(--color-gold)] shrink-0">
                <Image src={weaver.avatar} alt={weaver.name} fill className="object-cover" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[var(--color-taupe)] block font-semibold">
                  Handcrafted By Master Artisan
                </span>
                <h4 className="font-display font-bold text-sm text-[var(--color-oxblood)] group-hover:underline">
                  {weaver.name} ({weaver.village}, {weaver.region})
                </h4>
                <p className="text-[11px] text-[var(--color-emerald)] font-medium">
                  {product.weaverSharePercentage}% (₹
                  {((product.price * product.weaverSharePercentage) / 100).toLocaleString('en-IN')}) direct to weaver
                </p>
              </div>
            </Link>

            {/* Price & Material Highlights */}
            <div className="space-y-2 py-4 border-y border-[var(--color-gold)]/20">
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-widest text-[var(--color-taupe)]">
                  Investment Value
                </span>
                <span className="font-display font-bold text-3xl text-[var(--color-oxblood)]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                <div className="p-2 bg-[var(--color-ivory)] border border-[var(--color-gold)]/20 rounded">
                  <span className="text-[10px] text-[var(--color-taupe)] block uppercase font-semibold">
                    Material
                  </span>
                  <span className="font-medium text-[var(--color-charcoal)]">{product.material}</span>
                </div>
                <div className="p-2 bg-[var(--color-ivory)] border border-[var(--color-gold)]/20 rounded">
                  <span className="text-[10px] text-[var(--color-taupe)] block uppercase font-semibold">
                    Loom Work
                  </span>
                  <span className="font-medium text-[var(--color-charcoal)]">{product.hoursInvested} Hours</span>
                </div>
              </div>
            </div>

            {/* Description Paragraph */}
            <p className="font-editorial text-base text-[var(--color-charcoal)] leading-relaxed italic">
              "{product.description}"
            </p>

            {/* Size Guide Accordion / Table Toggle */}
            <div className="border border-[var(--color-gold)]/30 rounded bg-[var(--color-cream)] p-4 space-y-3">
              <div
                onClick={() => setShowSizeGuide(!showSizeGuide)}
                className="flex items-center justify-between cursor-pointer text-xs font-semibold uppercase tracking-wider text-[var(--color-wine)]"
              >
                <span className="flex items-center gap-2">
                  <Table className="w-4 h-4 text-[var(--color-gold)]" />
                  Universal Saree & Textile Draping Chart
                </span>
                <span>{showSizeGuide ? '— Hide' : '+ View'}</span>
              </div>

              {showSizeGuide && (
                <div className="pt-2 text-xs overflow-x-auto">
                  <table className="w-full text-left border-collapse border border-[var(--color-gold)]/20">
                    <thead>
                      <tr className="bg-[var(--color-wine)] text-[var(--color-ivory)] text-[10px] uppercase">
                        <th className="p-2">Dimension</th>
                        <th className="p-2">Standard Length</th>
                        <th className="p-2">Blouse Piece</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-gold)]/20">
                      <tr>
                        <td className="p-2 font-medium">Full Drape Saree</td>
                        <td className="p-2">5.5 Meters (6.0 Yards)</td>
                        <td className="p-2">Unstitched 0.8m Included</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium">Width</td>
                        <td className="p-2">45 Inches (114 cm)</td>
                        <td className="p-2">Standard Heritage Fit</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Quantity Selector & Purchase CTAs */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase font-semibold tracking-wider text-[var(--color-taupe)]">
                  Quantity:
                </span>
                <div className="flex items-center border border-[var(--color-wine)]/40 rounded bg-[var(--color-cream)]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-xs text-[var(--color-charcoal)] hover:bg-[var(--color-gold-light)]"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-xs text-[var(--color-charcoal)] hover:bg-[var(--color-gold-light)]"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={() =>
                    addItem({
                      id: product.id,
                      slug: product.slug,
                      title: product.title,
                      weaveName: product.weaveName,
                      region: product.region,
                      weaverName: product.weaverName,
                      weaverId: product.weaverId,
                      price: product.price,
                      weaverSharePercentage: product.weaverSharePercentage,
                      image: product.images[0],
                    })
                  }
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Acquire for Heritage Collection</span>
                </Button>

                <Link href={`/b2b?product=${product.id}`}>
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Enquire for Bulk Order
                  </Button>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* BELOW THE FOLD 1: GSAP Parallax Storytelling Section */}
      <ParallaxSection
        title={product.title}
        culturalMeaning={product.culturalMeaning}
        weaverName={product.weaverName}
        village={product.weaverVillage}
      />

      {/* BELOW THE FOLD 2: Wavesurfer.js Audio Player */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <LoomWaveformPlayer audioUrl={product.audioUrl} title={`Loom Rhythm of ${product.weaverName}`} />
      </div>

      {/* BELOW THE FOLD 3: Framer Motion Passport Unfold Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PassportUnfold
          weaverName={product.weaverName}
          village={product.weaverVillage}
          region={product.region}
          material={product.material}
          hoursInvested={product.hoursInvested}
          qrId={product.qrId}
          weaverAvatar={product.weaverAvatar}
        />
      </div>

      {/* CLOSING: You May Also Treasure Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-[var(--color-gold)]/30 space-y-6">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)]">
            Curated Recommendations
          </span>
          <h3 className="font-display text-2xl font-bold text-[var(--color-wine)] mt-1">
            You May Also Treasure
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3).map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.slug}`}
              className="bg-[var(--color-cream)] border border-[var(--color-gold)]/20 rounded-[var(--radius-card)] overflow-hidden shadow-fabric group hover:border-[var(--color-gold)] transition-all p-4 flex gap-4 items-center"
            >
              <div className="relative w-20 h-24 shrink-0 rounded overflow-hidden border border-[var(--color-gold)]/30">
                <Image src={item.images[0]} alt={item.title} fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-xs text-[var(--color-oxblood)] group-hover:underline">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[var(--color-taupe)] mt-0.5">{item.weaveName}</p>
                <span className="font-display font-bold text-xs text-[var(--color-wine)] mt-1 block">
                  ₹{item.price.toLocaleString('en-IN')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
