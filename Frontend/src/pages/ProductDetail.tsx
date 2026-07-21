import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug } from '../lib/api/products';
import { getWeaverById } from '../lib/api/weavers';
import { Product, Weaver } from '../lib/api/types';
import { ProductViewer3D } from '../components/three/ProductViewer3D';
import { LuxuryVideoPlayer } from '../components/ui/LuxuryVideoPlayer';
import { ParallaxSection } from '../components/storytelling/ParallaxSection';
import { LoomWaveformPlayer } from '../components/audio/LoomWaveformPlayer';
import { PassportUnfold } from '../components/passport/PassportUnfold';
import { VirtualTryOnModal } from '../components/ui/VirtualTryOnModal';
import { WebARViewerModal } from '../components/ui/WebARViewerModal';
import { SizeChartModal } from '../components/ui/SizeChartModal';
import { Button } from '../components/ui/Button';
import { GoldLabel } from '../components/ui/GoldLabel';
import { useCartStore } from '../store/useCartStore';
import { Maximize2, ChevronLeft, ChevronRight, X, Image as ImageIcon, Box, Sparkles, ShieldCheck, CheckCircle2, Info, Ruler, BookOpen, Feather } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { slug = 'pochampally-ikat-silk-saree' } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | undefined>();
  const [weaver, setWeaver] = useState<Weaver | undefined>();
  const [mediaTab, setMediaTab] = useState<'photos' | '3d' | 'video'>('photos');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [tryOnModalOpen, setTryOnModalOpen] = useState(false);
  const [arModalOpen, setArModalOpen] = useState(false);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);

  const { addItem } = useCartStore();

  useEffect(() => {
    loadData();
  }, [slug]);

  const loadData = async () => {
    const p = await getProductBySlug(slug);
    if (p) {
      setProduct(p);
      const w = await getWeaverById(p.weaverId);
      setWeaver(w);
    }
  };

  if (!product) return null;

  const images = product.images?.length > 0 ? product.images : [
    '/assets/article-a/1.jpg',
    '/assets/article-a/2.jpg',
    '/assets/article-a/3.jpg',
    '/assets/article-a/4.jpg',
  ];

  return (
    <div className="space-y-16 pb-24">
      
      {/* Product Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Media Column */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* View Mode Tabs */}
            <div className="flex flex-wrap gap-2 bg-[#FBF7EF] p-1 rounded border border-[#C9A227]/30 text-xs font-semibold uppercase tracking-wider w-fit">
              <button
                onClick={() => setMediaTab('photos')}
                className={`px-3 py-1 rounded transition-colors flex items-center gap-1.5 cursor-pointer ${
                  mediaTab === 'photos' ? 'bg-[#3F0F17] text-[#E8D8A8]' : 'text-[#8A7A68] hover:text-[#3F0F17]'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" /> High-Res Gallery ({images.length} Photos)
              </button>
              <button
                onClick={() => setMediaTab('3d')}
                className={`px-3 py-1 rounded transition-colors flex items-center gap-1.5 cursor-pointer ${
                  mediaTab === '3d' ? 'bg-[#3F0F17] text-[#E8D8A8]' : 'text-[#8A7A68] hover:text-[#3F0F17]'
                }`}
              >
                <Box className="w-3.5 h-3.5" /> 3D Garment Relieff
              </button>
              <button
                onClick={() => setMediaTab('video')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  mediaTab === 'video' ? 'bg-[#3F0F17] text-[#E8D8A8]' : 'text-[#8A7A68] hover:text-[#3F0F17]'
                }`}
              >
                Live Loom Stream
              </button>
            </div>

            {/* Main Display Area */}
            {mediaTab === 'photos' && (
              <div className="space-y-4">
                <div className="relative rounded-[6px] overflow-hidden border-2 border-[#C9A227] bg-[#3F0F17] shadow-2xl h-[480px] group">
                  <img
                    src={images[selectedPhotoIndex]}
                    alt={`Photo ${selectedPhotoIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  <button
                    onClick={() => setLightboxOpen(true)}
                    className="absolute top-4 right-4 p-2 bg-[#3F0F17]/80 text-[#E8D8A8] border border-[#C9A227]/40 rounded-full hover:bg-[#C9A227] hover:text-[#3F0F17] transition-colors cursor-pointer shadow-lg"
                    title="View Fullscreen Lightbox"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-4 left-4 bg-[#3F0F17]/90 text-[#E8D8A8] text-[10px] font-mono uppercase px-3 py-1 rounded border border-[#C9A227]/40">
                    Photo {selectedPhotoIndex + 1} of {images.length} • Click to Zoom Fullscreen
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-3">
                  {images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPhotoIndex(idx)}
                      className={`h-24 rounded border-2 overflow-hidden transition-all cursor-pointer ${
                        selectedPhotoIndex === idx
                          ? 'border-[#C9A227] ring-2 ring-[#C9A227]/50 scale-105 shadow-md'
                          : 'border-[#C9A227]/30 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {mediaTab === '3d' && (
              <ProductViewer3D textureUrl={images[selectedPhotoIndex] || product.textureUrl} title={product.title} />
            )}

            {mediaTab === 'video' && (
              <LuxuryVideoPlayer title={`Live Loom Stream — ${product.weaverName}`} isLiveStreamTag />
            )}

          </div>

          {/* Right Product Details & Action Buttons */}
          <div className="lg:col-span-5 space-y-6">
            <GoldLabel>{product.weaveName}</GoldLabel>
            
            <h1 className="font-display text-3xl font-bold text-[#3F0F17]">
              {product.title}
            </h1>

            {weaver && (
              <div className="flex items-center gap-3 p-3 bg-[#F7F1E6] rounded border border-[#C9A227]/30">
                <img src={weaver.avatar} alt={weaver.name} className="w-12 h-12 rounded-full object-cover border border-[#C9A227]" />
                <div>
                  <span className="text-[10px] text-[#8A7A68] uppercase block font-semibold">Artisan Weaver & Guild Master</span>
                  <Link to={`/weaver/${weaver.id}`} className="font-display font-bold text-sm text-[#6B1E28] hover:underline">
                    {weaver.name} ({weaver.village}, {weaver.region})
                  </Link>
                </div>
              </div>
            )}

            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#8A7A68] block font-mono">Price & Direct Payout Share</span>
              <div className="font-display font-bold text-3xl text-[#6B1E28]">
                ₹{product.price.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-[#0B3D2E] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 82%+ (₹{Math.round(product.price * 0.82).toLocaleString('en-IN')}) transfers directly to {product.weaverName}'s bank account.
              </p>
            </div>

            {/* Interactive Feature Buttons: AI Virtual Try-On, 3D AR & Size Guide */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <button
                onClick={() => setTryOnModalOpen(true)}
                className="px-3 py-2 bg-[#6B1E28] text-[#E8D8A8] border border-[#C9A227] rounded text-[11px] font-bold uppercase tracking-wider hover:bg-[#3F0F17] flex items-center justify-center gap-1 cursor-pointer shadow"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" /> Try-On
              </button>

              <button
                onClick={() => setArModalOpen(true)}
                className="px-3 py-2 bg-[#3F0F17] text-[#F7F1E6] border border-[#C9A227]/50 rounded text-[11px] font-bold uppercase tracking-wider hover:border-[#C9A227] flex items-center justify-center gap-1 cursor-pointer shadow"
              >
                <Box className="w-3.5 h-3.5 text-[#C9A227]" /> 3D AR
              </button>

              <button
                onClick={() => setSizeModalOpen(true)}
                className="px-3 py-2 bg-[#FBF7EF] text-[#3F0F17] border border-[#C9A227]/40 rounded text-[11px] font-bold uppercase tracking-wider hover:border-[#C9A227] flex items-center justify-center gap-1 cursor-pointer shadow"
              >
                <Ruler className="w-3.5 h-3.5 text-[#6B1E28]" /> Size Guide
              </button>
            </div>

            {/* Deep Cultural Significance & Provenance Card */}
            <div className="bg-[#3F0F17] text-[#F7F1E6] border-2 border-[#C9A227] rounded p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-[#C9A227]/30 pb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8D8A8] flex items-center gap-1">
                  <Feather className="w-3.5 h-3.5 text-[#C9A227]" /> Sacred Motif Symbolism & Heritage
                </span>
              </div>
              <p className="font-editorial text-sm italic text-[#F7F1E6]/90 leading-relaxed">
                "{product.culturalMeaning}"
              </p>
              <div className="text-[11px] text-[#E8D8A8] font-mono border-t border-[#C9A227]/20 pt-2">
                Heritage Roots: Woven in {product.region} using traditional pit looms over {product.hoursInvested} loom hours.
              </div>
            </div>

            {/* Specifications Card */}
            <div className="bg-[#FBF7EF] border border-[#C9A227]/30 rounded p-4 space-y-3 text-xs">
              <h4 className="font-display font-bold text-sm text-[#3F0F17] border-b border-[#C9A227]/20 pb-2 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-[#6B1E28]" /> Craft Specifications
              </h4>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-[#8A7A68] uppercase block text-[9px]">Yarn Density</span>
                  <span className="font-bold text-[#3F0F17]">300D Mulberry Silk</span>
                </div>
                <div>
                  <span className="text-[#8A7A68] uppercase block text-[9px]">Loom Structure</span>
                  <span className="font-bold text-[#3F0F17]">Hand Pit Loom</span>
                </div>
                <div>
                  <span className="text-[#8A7A68] uppercase block text-[9px]">GI Registration</span>
                  <span className="font-bold text-[#0B3D2E]">GI-REG-IN-2026-08841</span>
                </div>
                <div>
                  <span className="text-[#8A7A68] uppercase block text-[9px]">Care Guide</span>
                  <span className="font-bold text-[#3F0F17]">Dry Clean Only</span>
                </div>
              </div>
            </div>

            <Button variant="gold" size="lg" className="w-full" onClick={() => addItem(product)}>
              Add to Atelier Collection
            </Button>
          </div>

        </div>
      </div>

      {/* Modals */}
      <VirtualTryOnModal product={product} isOpen={tryOnModalOpen} onClose={() => setTryOnModalOpen(false)} />
      <WebARViewerModal product={product} isOpen={arModalOpen} onClose={() => setArModalOpen(false)} />
      <SizeChartModal product={product} isOpen={sizeModalOpen} onClose={() => setSizeModalOpen(false)} />

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-6">
          <div className="flex justify-between items-center text-[#E8D8A8] text-xs font-mono">
            <span>{product.title} — Photo Gallery ({selectedPhotoIndex + 1} of {images.length})</span>
            <button onClick={() => setLightboxOpen(false)} className="p-2 text-[#F7F1E6] hover:text-[#C9A227] cursor-pointer">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center py-4">
            <button
              onClick={() => setSelectedPhotoIndex((selectedPhotoIndex - 1 + images.length) % images.length)}
              className="absolute left-4 p-3 bg-[#3F0F17]/80 text-[#F7F1E6] rounded-full border border-[#C9A227]/40 hover:bg-[#C9A227] hover:text-[#3F0F17] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={images[selectedPhotoIndex]}
              alt={`Fullscreen ${selectedPhotoIndex + 1}`}
              className="max-h-[80vh] max-w-full object-contain rounded border-2 border-[#C9A227] shadow-2xl"
            />

            <button
              onClick={() => setSelectedPhotoIndex((selectedPhotoIndex + 1) % images.length)}
              className="absolute right-4 p-3 bg-[#3F0F17]/80 text-[#F7F1E6] rounded-full border border-[#C9A227]/40 hover:bg-[#C9A227] hover:text-[#3F0F17] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center gap-3">
            {images.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPhotoIndex(idx)}
                className={`w-16 h-16 rounded border-2 overflow-hidden cursor-pointer ${
                  selectedPhotoIndex === idx ? 'border-[#C9A227] scale-110' : 'border-white/30 opacity-50'
                }`}
              >
                <img src={imgUrl} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* GSAP Parallax Storytelling Section */}
      <ParallaxSection
        title={product.title}
        culturalMeaning={product.culturalMeaning}
        weaverName={product.weaverName}
        village={product.weaverVillage}
        macroTextureUrl={product.macroTextureUrl}
      />

      {/* Wavesurfer.js Audio Section */}
      <div className="max-w-4xl mx-auto px-4">
        <LoomWaveformPlayer audioUrl={product.audioUrl} weaverName={product.weaverName} />
      </div>

      {/* Framer Motion Unfolding Passport */}
      <div className="max-w-4xl mx-auto px-4">
        <PassportUnfold />
      </div>

    </div>
  );
};
