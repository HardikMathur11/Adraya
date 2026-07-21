import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3F0F17] text-[#F7F1E6] border-t-2 border-[#C9A227] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-[#C9A227]/20 pb-12">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-[#C9A227] flex items-center justify-center bg-[#6B1E28]">
                <span className="font-display font-bold text-[#C9A227] text-base">A</span>
              </div>
              <span className="font-display text-xl font-bold tracking-wider text-[#F7F1E6]">
                ADRAYA LUXURY ATELIER
              </span>
            </div>
            <p className="font-editorial text-sm italic text-[#F7F1E6]/80 leading-relaxed max-w-md">
              Connecting master rural Indian handloom weavers directly with global connoisseurs. Every piece is GI-tagged, blockchain-verified, and pays 82%+ directly to artisan accounts.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-display font-bold uppercase tracking-widest text-[#E8D8A8]">
              Adraya Collections
            </h4>
            <ul className="space-y-2 text-[#F7F1E6]/80">
              <li><Link to="/collections/royal" className="hover:text-[#C9A227]">The Royal Durbar Collection</Link></li>
              <li><Link to="/collections/wedding" className="hover:text-[#C9A227]">Solah Shringar Bridal Atelier</Link></li>
              <li><Link to="/collections/heirloom-gift" className="hover:text-[#C9A227]">Heirloom Dynasty Treasures</Link></li>
              <li><Link to="/collections/sustainable-luxe" className="hover:text-[#C9A227]">Assam Ahimsa Eri Silk</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3 text-xs">
            <h4 className="font-display font-bold uppercase tracking-widest text-[#E8D8A8]">
              Trust & Transparency
            </h4>
            <div className="space-y-2 text-[#F7F1E6]/80 text-[11px]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
                <span>Geographical Indication (GI) Certified Origin</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#C9A227]" />
                <span>Transparent 82%+ Direct-to-Weaver Fair Split</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C9A227]" />
                <span>Cryptographic Immutable Provenance Passports</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#E8D8A8]/70 gap-4">
          <p>© 2026 Adraya Luxury Atelier. All rights reserved. Crafting digital dignity for rural artisans.</p>
          <div className="flex gap-4 uppercase tracking-wider">
            <span>Privileged Access</span>
            <span>Artisan Direct</span>
            <span>Terms of Provenance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
