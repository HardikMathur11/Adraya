import React, { useState } from 'react';
import { X, Sparkles, Upload, CheckCircle2, User, RefreshCw } from 'lucide-react';
import { Button } from './Button';
import { Product } from '../../lib/api/types';

interface VirtualTryOnModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const VirtualTryOnModal: React.FC<VirtualTryOnModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string>(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [renderedResult, setRenderedResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const avatars = [
    { id: 'av1', label: 'Model A (Classic Drape)', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400' },
    { id: 'av2', label: 'Model B (Bridal Fit)', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400' },
    { id: 'av3', label: 'Model C (Graceful Pleats)', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' },
  ];

  const handleRunTryOn = () => {
    setIsProcessing(true);
    setRenderedResult(null);
    setTimeout(() => {
      setIsProcessing(false);
      setRenderedResult(product.textureUrl || product.images[0]);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FBF7EF] border-2 border-[#C9A227] rounded-[6px] max-w-2xl w-full p-6 space-y-6 shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#C9A227]/30 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8D8A8] bg-[#6B1E28] px-2.5 py-0.5 rounded border border-[#C9A227]/30">
              AI Virtual Drape Fitting Studio
            </span>
            <h3 className="font-display font-bold text-xl text-[#3F0F17] mt-1">
              Virtual Try-On — {product.title}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#3F0F17] hover:text-[#6B1E28] cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Left Preview Box */}
          <div className="md:col-span-6 bg-[#3F0F17] rounded border border-[#C9A227]/40 h-[320px] relative overflow-hidden flex items-center justify-center">
            {isProcessing ? (
              <div className="text-center space-y-3 p-4">
                <RefreshCw className="w-8 h-8 text-[#C9A227] animate-spin mx-auto" />
                <span className="font-editorial text-sm italic text-[#E8D8A8] block">
                  Simulating 300D Mulberry Silk Drape Fold & Lighting Alignment...
                </span>
              </div>
            ) : renderedResult ? (
              <div className="relative w-full h-full">
                <img src={selectedAvatar} alt="Avatar Base" className="w-full h-full object-cover opacity-60" />
                <img src={renderedResult} alt="Fabric Overlay" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90" />
                <div className="absolute bottom-3 left-3 bg-[#0B3D2E]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow border border-white/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> AI Fitting Render Complete
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <img src={selectedAvatar} alt="Model Base" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 text-[#F7F1E6] text-xs font-editorial italic">
                  Select model avatar or upload your photo below to fit drape.
                </div>
              </div>
            )}
          </div>

          {/* Right Controls */}
          <div className="md:col-span-6 space-y-4 text-xs">
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#8A7A68] block mb-2">1. Select Model Avatar</span>
              <div className="grid grid-cols-3 gap-2">
                {avatars.map((av) => (
                  <button
                    key={av.id}
                    onClick={() => { setSelectedAvatar(av.url); setRenderedResult(null); }}
                    className={`h-20 rounded border-2 overflow-hidden transition-all cursor-pointer ${
                      selectedAvatar === av.url ? 'border-[#C9A227] ring-2 ring-[#C9A227]/40 scale-105' : 'border-[#C9A227]/30 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={av.url} alt={av.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 bg-[#F7F1E6] border-2 border-dashed border-[#C9A227]/50 rounded text-center cursor-pointer hover:bg-[#C9A227]/10 transition-colors">
              <Upload className="w-5 h-5 text-[#6B1E28] mx-auto mb-1" />
              <span className="font-bold text-[#3F0F17] text-[11px] block">Or Upload Your Full-Length Photo</span>
            </div>

            <Button variant="gold" size="lg" className="w-full" onClick={handleRunTryOn} disabled={isProcessing}>
              <Sparkles className="w-4 h-4 mr-2 text-[#3F0F17]" />
              {isProcessing ? 'Processing AI Fitting...' : 'Generate AI Virtual Try-On Render'}
            </Button>
          </div>

        </div>

      </div>
    </div>
  );
};
