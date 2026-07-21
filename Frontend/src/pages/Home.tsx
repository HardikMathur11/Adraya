import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, ShieldCheck, HeartHandshake, Eye, Image as ImageIcon } from 'lucide-react';
import { getFeaturedProducts, getMoodCollectionPreviews } from '../lib/api/products';
import { getFeaturedWeavers } from '../lib/api/weavers';
import { Product, MoodCollection, Weaver } from '../lib/api/types';
import { Button } from '../components/ui/Button';
import { GoldLabel } from '../components/ui/GoldLabel';
import { HeroThreadSpool3D } from '../components/three/HeroThreadSpool3D';
import { TiltCard3D } from '../components/ui/TiltCard3D';

export const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [moods, setMoods] = useState<MoodCollection[]>([]);
  const [weavers, setWeavers] = useState<Weaver[]>([]);

  const moodCarouselRef = useRef<HTMLDivElement>(null);
  const showcaseCarouselRef = useRef<HTMLDivElement>(null);
  const weaverCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    const p = await getFeaturedProducts();
    const m = await getMoodCollectionPreviews();
    const w = await getFeaturedWeavers();
    setProducts(p);
    setMoods(m);
    setWeavers(w);
  };

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const adrayaShowcaseItems = [
    { id: 1, title: 'Adraya Crimson Kanjeevaram Korvai Gold Zari Silk', region: 'Kanchipuram, Tamil Nadu', image: '/assets/adraya-showcase/1.jpg', weaver: 'Lakshmi Amma' },
    { id: 2, title: 'Adraya Royal Indigo Pochampally Double-Ikat Silk', region: 'Pochampally, Telangana', image: '/assets/adraya-showcase/2.jpg', weaver: 'Radha Devi' },
    { id: 3, title: 'Adraya Imperial Emerald Banarasi Kadwa Brocade', region: 'Varanasi, Uttar Pradesh', image: '/assets/adraya-showcase/3.jpg', weaver: 'Gurudev Varma' },
    { id: 4, title: 'Adraya Golden Muga Silk Wild Flora Dupatta', region: 'Sualkuchi, Assam', image: '/assets/adraya-showcase/4.jpg', weaver: 'Bipul Das' },
    { id: 5, title: 'Adraya Kashmir Fine Kani Needle Pashmina Stole', region: 'Srinagar, Kashmir', image: '/assets/adraya-showcase/5.jpg', weaver: 'Ghulam Nabi' },
    { id: 6, title: 'Adraya Yeola Paithani Peacock Tapestry Saree', region: 'Yeola, Maharashtra', image: '/assets/adraya-showcase/6.jpg', weaver: 'Savita Kshirsagar' },
    { id: 7, title: 'Adraya Awadh Court Real Gold Zari Brocade', region: 'Varanasi, Uttar Pradesh', image: '/assets/adraya-showcase/7.jpg', weaver: 'Gurudev Varma' },
    { id: 8, title: 'Adraya Temple Border Crimson Mulberry Silk', region: 'Kanchipuram, Tamil Nadu', image: '/assets/adraya-showcase/8.jpg', weaver: 'Lakshmi Amma' },
    { id: 9, title: 'Adraya Ahimsa Eri Silk Botanical Dye Stole', region: 'Sualkuchi, Assam', image: '/assets/adraya-showcase/9.jpg', weaver: 'Bipul Das' },
    { id: 10, title: 'Adraya Telangana Double-Peacock Ikat Masterpiece', region: 'Pochampally, Telangana', image: '/assets/adraya-showcase/10.jpg', weaver: 'Radha Devi' },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 max-w-full overflow-x-hidden">
      
      {/* 1. HERO SECTION WITH BACKGROUND BROADCAST VIDEO & THREE.JS 3D SPOOL */}
      <section className="relative min-h-[75vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden border-b-2 border-[#C9A227]">
        
        {/* Background Loom Video Stream */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80 scale-105"
            src="/assets/loom-artisan-video.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/60 pointer-events-none" />
        </div>

        {/* Hero Grid with Three.js Canvas */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            <span className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#E8D8A8] bg-[#6B1E28]/90 px-3.5 py-1 sm:py-1.5 rounded-full border border-[#C9A227]/40 backdrop-blur-xs">
              ADRAYA • Direct Pit Loom Atelier • GI Certified Origin
            </span>

            <h1 className="font-display text-3xl sm:text-6xl font-bold leading-tight tracking-wide text-[#F7F1E6]">
              Adraya Heritage, Woven for You.
            </h1>

            <p className="font-editorial text-base sm:text-2xl italic text-[#F7F1E6]/90 leading-relaxed border-l-2 border-[#C9A227] pl-3 sm:pl-4">
              "Direct from the loom to you — every piece verified, every weaver paid fairly."
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link to="/collections/royal" className="w-full sm:w-auto">
                <Button variant="gold" size="lg" className="w-full">
                  Shop Adraya Collection <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/weavers" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full">
                  Meet Our Master Weavers
                </Button>
              </Link>
            </div>
          </div>

          {/* Three.js Interactive 3D Gold Thread Spool */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full bg-transparent rounded-[6px] border-2 border-[#C9A227]/40 p-2 sm:p-4 shadow-2xl">
              <HeroThreadSpool3D />
            </div>
          </div>

        </div>
      </section>

      {/* 2. ANIMATED HORIZONTAL SLIDING MOOD COLLECTIONS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-end border-b border-[#C9A227]/30 pb-4">
          <div>
            <GoldLabel>CURATED ADRAYA ATELIERS</GoldLabel>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#3F0F17] mt-1">
              Browse by Mood & Heritage Occasion
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => scrollCarousel(moodCarouselRef, 'left')}
              className="p-1.5 sm:p-2 bg-[#FBF7EF] border border-[#C9A227]/40 rounded text-[#3F0F17] hover:bg-[#6B1E28] hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => scrollCarousel(moodCarouselRef, 'right')}
              className="p-1.5 sm:p-2 bg-[#FBF7EF] border border-[#C9A227]/40 rounded text-[#3F0F17] hover:bg-[#6B1E28] hover:text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Slider */}
        <div
          ref={moodCarouselRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-none snap-x scroll-smooth"
        >
          {moods.map((m) => (
            <motion.div
              key={m.id}
              whileHover={{ y: -4 }}
              className="min-w-[260px] sm:min-w-[340px] snap-start"
            >
              <Link to={`/collections/${m.moodKey}`}>
                <div className="relative h-[340px] sm:h-[400px] rounded-[6px] overflow-hidden border border-[#C9A227]/40 shadow-fabric group">
                  <img
                    src={m.heroImage}
                    alt={m.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3F0F17] via-[#3F0F17]/50 to-transparent opacity-90" />
                  
                  <div className="absolute bottom-5 left-5 right-5 space-y-1.5 text-[#F7F1E6]">
                    <span className="text-[9px] uppercase tracking-widest text-[#E8D8A8] font-mono bg-[#6B1E28] px-2 py-0.5 rounded border border-[#C9A227]/30">
                      {m.subtitle}
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl group-hover:text-[#C9A227] transition-colors">
                      {m.title}
                    </h3>
                    <p className="font-editorial text-xs italic text-[#F7F1E6]/80 line-clamp-2">
                      "{m.editorialWallText}"
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. STOREFRONT FEATURED PRODUCTS CATALOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="flex justify-between items-end border-b border-[#C9A227]/30 pb-4">
          <div>
            <GoldLabel>ADRAYA MASTERPIECES</GoldLabel>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#3F0F17] mt-1">
              Direct Pit Loom Heritage Drapes
            </h2>
          </div>
          <Link to="/moods">
            <Button variant="gold" size="sm">Explore All</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {products.map((p) => (
            <TiltCard3D key={p.id}>
              <Link to={`/product/${p.slug}`} className="block h-full">
                <div className="bg-[#FBF7EF] border border-[#C9A227]/30 rounded-[6px] overflow-hidden shadow-fabric flex flex-col justify-between h-full group hover:border-[#C9A227] transition-all">
                  <div className="relative h-56 sm:h-64 overflow-hidden bg-[#3F0F17]">
                    <img
                      src={p.textureUrl}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-widest bg-[#0B3D2E] text-white px-2 py-0.5 rounded shadow">
                        GI Tagged
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#3F0F17] text-[#E8D8A8] px-2 py-0.5 rounded shadow border border-[#C9A227]/40">
                        📷 {p.images?.length || 1} Photos
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-widest text-[#8A7A68] font-mono block">
                        {p.weaveName} • {p.region}
                      </span>
                      <h3 className="font-display text-base sm:text-lg font-bold text-[#3F0F17] group-hover:text-[#6B1E28] transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-xs text-[#8A7A68]">
                        Master Weaver: <strong className="text-[#3F0F17]">{p.weaverName}</strong> ({p.weaverVillage})
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#C9A227]/20 flex items-center justify-between">
                      <span className="font-display font-bold text-lg text-[#6B1E28]">
                        ₹{p.price.toLocaleString('en-IN')}
                      </span>
                      <Button variant="primary" size="sm">
                        Inspect Drape
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </TiltCard3D>
          ))}
        </div>
      </section>

      {/* 4. THE ADRAYA IMPERIAL VAULT (SHOWCASE GALLERY WITHOUT PRICES) */}
      <section className="bg-[#1A0B0E] text-[#F7F1E6] py-12 sm:py-16 border-y-2 border-[#C9A227]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-[#C9A227]/40 pb-4 gap-3">
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#E8D8A8] bg-[#6B1E28] px-3 py-1 rounded border border-[#C9A227]/40 font-mono">
                THE ADRAYA IMPERIAL VAULT
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#F7F1E6] mt-1.5">
                Exclusive Heritage Craft Showcase
              </h2>
              <p className="font-editorial text-xs sm:text-sm italic text-[#E8D8A8] mt-1">
                Newly harvested museum-grade drapes, handwoven by India's finest Shilp Guru master weavers.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => scrollCarousel(showcaseCarouselRef, 'left')}
                className="p-2 sm:p-2.5 bg-[#3F0F17] border border-[#C9A227]/50 rounded text-[#E8D8A8] hover:bg-[#C9A227] hover:text-[#3F0F17] transition-colors cursor-pointer shadow-lg"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => scrollCarousel(showcaseCarouselRef, 'right')}
                className="p-2 sm:p-2.5 bg-[#3F0F17] border border-[#C9A227]/50 rounded text-[#E8D8A8] hover:bg-[#C9A227] hover:text-[#3F0F17] transition-colors cursor-pointer shadow-lg"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Adraya Imperial Vault Horizontal Carousel */}
          <div
            ref={showcaseCarouselRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-none snap-x scroll-smooth"
          >
            {adrayaShowcaseItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -6 }}
                className="min-w-[260px] sm:min-w-[320px] snap-start"
              >
                <Link to="/product/pochampally-ikat-silk-saree">
                  <div className="bg-[#3F0F17] border-2 border-[#C9A227]/60 rounded-[6px] overflow-hidden shadow-2xl space-y-3 group hover:border-[#C9A227] transition-all">
                    <div className="relative h-64 sm:h-72 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-[#0B3D2E]/90 text-white px-2.5 py-1 rounded shadow border border-white/20">
                        Vault Piece #{item.id}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-[#E8D8A8] block">{item.region}</span>
                      <h4 className="font-display font-bold text-sm sm:text-base text-[#F7F1E6] group-hover:text-[#C9A227] transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#E8D8A8]">Artisan: <strong className="text-white">{item.weaver}</strong></p>

                      <div className="pt-3 border-t border-[#C9A227]/30 flex justify-between items-center">
                        <span className="text-[10px] font-mono uppercase text-[#E8D8A8]">
                          GI Certified Heritage Piece
                        </span>
                        <span className="text-[10px] uppercase font-bold text-[#E8D8A8] bg-[#6B1E28] px-2.5 py-1 rounded border border-[#C9A227]/40 flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" /> Inspect Showcase
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. ANIMATED HORIZONTAL SLIDING WEAVER ARTISAN CAROUSEL (HAND BEHIND THE WEAVE) */}
      <section className="bg-[#3F0F17] text-[#F7F1E6] py-16 sm:py-20 border-y border-[#C9A227]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          <div className="flex justify-between items-end border-b border-[#C9A227]/30 pb-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#E8D8A8]">Living Heritage Artisans</span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#F7F1E6] mt-1">
                Meet the Hands Behind the Weave
              </h2>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => scrollCarousel(weaverCarouselRef, 'left')}
                className="p-1.5 sm:p-2 bg-[#6B1E28] border border-[#C9A227]/40 rounded text-[#F7F1E6] hover:bg-[#C9A227] hover:text-[#3F0F17] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => scrollCarousel(weaverCarouselRef, 'right')}
                className="p-1.5 sm:p-2 bg-[#6B1E28] border border-[#C9A227]/40 rounded text-[#F7F1E6] hover:bg-[#C9A227] hover:text-[#3F0F17] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          <div
            ref={weaverCarouselRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-none snap-x scroll-smooth"
          >
            {weavers.map((w) => (
              <motion.div
                key={w.id}
                whileHover={{ y: -4 }}
                className="min-w-[260px] sm:min-w-[320px] snap-start"
              >
                <Link to={`/weaver/${w.id}`}>
                  <div className="bg-[#6B1E28]/60 rounded-[6px] overflow-hidden border border-[#C9A227]/40 p-4 sm:p-5 space-y-3 shadow-xl hover:border-[#C9A227] transition-all">
                    <div className="flex items-center gap-3">
                      <img
                        src={w.avatar}
                        alt={w.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-[#C9A227]"
                      />
                      <div>
                        <h3 className="font-display text-lg sm:text-xl font-bold text-[#F7F1E6]">
                          {w.name}
                        </h3>
                        <span className="text-[11px] text-[#E8D8A8] font-mono block">
                          {w.village}, {w.region}
                        </span>
                        <span className="text-[9px] text-[#0B3D2E] font-bold uppercase bg-[#0B3D2E]/20 px-2 py-0.5 rounded border border-[#0B3D2E]/30 inline-block mt-1">
                          {w.yearsWeaving} Yrs Lineage
                        </span>
                      </div>
                    </div>

                    <p className="font-editorial text-xs italic text-[#F7F1E6]/80 line-clamp-3">
                      "{w.biography}"
                    </p>

                    <div className="pt-3 border-t border-[#C9A227]/20 flex justify-between items-center text-xs">
                      <span className="text-[#E8D8A8] font-semibold text-[11px]">{w.specialty}</span>
                      <span className="text-[#C9A227] font-bold hover:underline text-[11px]">View Studio →</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
