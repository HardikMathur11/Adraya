import React from 'react';
import { X, Ruler, CheckCircle2, Info } from 'lucide-react';
import { Product } from '../../lib/api/types';

interface SizeChartModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const SizeChartModal: React.FC<SizeChartModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FBF7EF] border-2 border-[#C9A227] rounded-[6px] max-w-xl w-full p-6 space-y-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#C9A227]/30 pb-3">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#C9A227]" />
            <h3 className="font-display font-bold text-xl text-[#3F0F17]">
              Drape Dimensions & Sizing Guide
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#3F0F17] hover:text-[#6B1E28] cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Saree & Dupatta Dimensions Table */}
        <div className="space-y-4 text-xs">
          <div className="p-4 bg-[#3F0F17] text-[#F7F1E6] rounded border border-[#C9A227]/40 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8D8A8]">
              Standard Handloom Measurements
            </span>
            <h4 className="font-display font-bold text-lg text-[#F7F1E6]">
              {product.title}
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[#F7F1E6] border border-[#C9A227]/30 rounded">
              <span className="text-[#8A7A68] text-[10px] uppercase block font-semibold">Body Drape Length</span>
              <span className="font-bold text-[#3F0F17] text-sm">5.50 Meters (6.0 Yards)</span>
            </div>
            <div className="p-3 bg-[#F7F1E6] border border-[#C9A227]/30 rounded">
              <span className="text-[#8A7A68] text-[10px] uppercase block font-semibold">Unstitched Blouse Piece</span>
              <span className="font-bold text-[#0B3D2E] text-sm">0.80 Meters (Contrast)</span>
            </div>
            <div className="p-3 bg-[#F7F1E6] border border-[#C9A227]/30 rounded">
              <span className="text-[#8A7A68] text-[10px] uppercase block font-semibold">Drape Width</span>
              <span className="font-bold text-[#3F0F17] text-sm">45 Inches (1.14 Meters)</span>
            </div>
            <div className="p-3 bg-[#F7F1E6] border border-[#C9A227]/30 rounded">
              <span className="text-[#8A7A68] text-[10px] uppercase block font-semibold">Pallu / Border Length</span>
              <span className="font-bold text-[#6B1E28] text-sm">1.20 Meters (Gold Zari)</span>
            </div>
          </div>

          <div className="p-3 bg-[#0B3D2E]/10 rounded border border-[#0B3D2E]/30 text-[11px] text-[#0B3D2E] font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0B3D2E]" />
            <span>Includes matching unstitched pure silk blouse fabric with running gold zari border.</span>
          </div>
        </div>

      </div>
    </div>
  );
};
