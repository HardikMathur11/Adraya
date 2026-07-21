import React from 'react';
import { X, Smartphone, Box, QrCode, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
import { Product } from '../../lib/api/types';

interface WebARViewerModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const WebARViewerModal: React.FC<WebARViewerModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FBF7EF] border-2 border-[#C9A227] rounded-[6px] max-w-lg w-full p-6 space-y-6 shadow-2xl relative text-center">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#C9A227]/30 pb-3">
          <div className="flex items-center gap-2">
            <Box className="w-5 h-5 text-[#C9A227]" />
            <h3 className="font-display font-bold text-lg text-[#3F0F17]">
              Augmented Reality (AR) Preview
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#3F0F17] hover:text-[#6B1E28] cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* AR QR Code Box */}
        <div className="bg-[#3F0F17] text-[#F7F1E6] rounded p-6 border-2 border-[#C9A227] space-y-4 shadow-xl">
          <div className="w-32 h-32 mx-auto bg-white p-2 rounded shadow-inner flex items-center justify-center">
            <QrCode className="w-24 h-24 text-[#3F0F17]" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8D8A8]">
              Scan with Mobile Camera
            </span>
            <h4 className="font-display font-bold text-base text-[#F7F1E6]">
              Project {product.title} in 3D AR in Your Room
            </h4>
            <p className="font-editorial text-xs italic text-[#F7F1E6]/80">
              Compatible with iOS AR QuickLook (USDZ) & Android SceneViewer (GLTF).
            </p>
          </div>
        </div>

        <div className="text-xs text-[#0B3D2E] font-semibold flex items-center justify-center gap-1.5 bg-[#0B3D2E]/10 p-2.5 rounded border border-[#0B3D2E]/30">
          <CheckCircle2 className="w-4 h-4" /> 1:1 Scale True Fiber Grain Texture Rendering Supported
        </div>

      </div>
    </div>
  );
};
