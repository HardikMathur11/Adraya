import React, { useState } from 'react';
import { Layers, ShieldCheck, HeartHandshake, Award, CheckCircle2, ArrowRight, PackageCheck, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GoldLabel } from '../components/ui/GoldLabel';
import { Badge } from '../components/ui/Badge';

export const B2BWholesale: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Editorial Hero */}
      <div className="bg-[#3F0F17] text-[#F7F1E6] p-12 rounded-[6px] border-2 border-[#C9A227] shadow-2xl space-y-4 text-center">
        <GoldLabel>DIRECT ATELIER WHOLESALE & BULK ORDERS</GoldLabel>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#F7F1E6]">
          B2B Atelier & Luxury Wholesale
        </h1>
        <p className="font-editorial text-lg italic text-[#F7F1E6]/90 max-w-3xl mx-auto leading-relaxed border-y border-[#C9A227]/30 py-4">
          Empowering international fashion houses, bridal boutiques, luxury hotels, and high-end exporters to source GI-certified handloom fabrics directly from rural Indian artisan clusters.
        </p>
      </div>

      {/* Pricing Tiers & MOQs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="bg-[#FBF7EF] border border-[#C9A227]/30 rounded p-6 shadow-fabric space-y-4 text-center flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-mono text-[#8A7A68]">Boutique Tier</span>
            <h3 className="font-display font-bold text-2xl text-[#3F0F17]">Bridal Trousseau Batch</h3>
            <div className="font-display font-bold text-3xl text-[#6B1E28]">15% Wholesale Margin</div>
            <p className="text-xs text-[#8A7A68]">Minimum Order: 5 to 15 Pieces</p>
          </div>
          <ul className="text-xs text-left space-y-2 border-t border-[#C9A227]/20 pt-4 text-[#2B2320]">
            <li className="flex items-center gap-2">✓ GI Tag Certificates included per piece</li>
            <li className="flex items-center gap-2">✓ Custom blouse color options</li>
            <li className="flex items-center gap-2">✓ Direct weaver video progress updates</li>
          </ul>
        </div>

        <div className="bg-[#FBF7EF] border-2 border-[#C9A227] rounded p-6 shadow-fabric space-y-4 text-center flex flex-col justify-between relative overflow-hidden">
          <span className="absolute top-0 right-0 bg-[#C9A227] text-[#3F0F17] font-bold text-[9px] uppercase px-3 py-1">Most Popular</span>
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-mono text-[#8A7A68]">Export Tier</span>
            <h3 className="font-display font-bold text-2xl text-[#3F0F17]">Haute Couture Yardage</h3>
            <div className="font-display font-bold text-3xl text-[#6B1E28]">25% Wholesale Margin</div>
            <p className="text-xs text-[#8A7A68]">Minimum Order: 16 to 50 Pieces</p>
          </div>
          <ul className="text-xs text-left space-y-2 border-t border-[#C9A227]/20 pt-4 text-[#2B2320]">
            <li className="flex items-center gap-2">✓ Custom width & motif weave development</li>
            <li className="flex items-center gap-2">✓ Physical Swatch Kit dispatch in 5 days</li>
            <li className="flex items-center gap-2">✓ Priority loom allocation</li>
          </ul>
        </div>

        <div className="bg-[#FBF7EF] border border-[#C9A227]/30 rounded p-6 shadow-fabric space-y-4 text-center flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-mono text-[#8A7A68]">Guild Master Tier</span>
            <h3 className="font-display font-bold text-2xl text-[#3F0F17]">Cluster Monopolist</h3>
            <div className="font-display font-bold text-3xl text-[#6B1E28]">35% Wholesale Margin</div>
            <p className="text-xs text-[#8A7A68]">Minimum Order: 50+ Pieces</p>
          </div>
          <ul className="text-xs text-left space-y-2 border-t border-[#C9A227]/20 pt-4 text-[#2B2320]">
            <li className="flex items-center gap-2">✓ Exclusive cluster weave rights</li>
            <li className="flex items-center gap-2">✓ Dedicated Shilp Guru master weaver</li>
            <li className="flex items-center gap-2">✓ Polygon ledger bulk registration</li>
          </ul>
        </div>

      </div>

      {/* B2B Inquiry Form */}
      <div className="bg-[#FBF7EF] border border-[#C9A227]/30 rounded p-8 shadow-fabric max-w-3xl mx-auto space-y-6">
        <div className="border-b border-[#C9A227]/20 pb-4">
          <GoldLabel>DIRECT WHOLESALE INQUIRY</GoldLabel>
          <h2 className="font-display text-2xl font-bold text-[#3F0F17] mt-1">Submit B2B Bulk Order Request</h2>
        </div>

        {submitted ? (
          <div className="p-6 bg-[#0B3D2E]/10 border border-[#0B3D2E] text-[#0B3D2E] rounded text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-[#0B3D2E] mx-auto" />
            <h3 className="font-display font-bold text-xl">B2B Inquiry Received!</h3>
            <p className="font-editorial text-sm italic">
              Our Cluster Guild Liaison will contact you within 24 hours with fabric swatch dispatch details.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block uppercase font-semibold text-[#3F0F17] mb-1">Company / Atelier Name *</label>
                <input type="text" required placeholder="e.g. Maison de Silk Paris" className="w-full px-3 py-2 bg-[#F7F1E6] border border-[#C9A227]/40 rounded" />
              </div>
              <div>
                <label className="block uppercase font-semibold text-[#3F0F17] mb-1">Contact Email *</label>
                <input type="email" required placeholder="e.g. buyer@maisonsilk.fr" className="w-full px-3 py-2 bg-[#F7F1E6] border border-[#C9A227]/40 rounded" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block uppercase font-semibold text-[#3F0F17] mb-1">Craft Weave Required *</label>
                <select className="w-full px-3 py-2 bg-[#F7F1E6] border border-[#C9A227]/40 rounded">
                  <option>Pochampally Double-Ikat Silk Yardage</option>
                  <option>Kanjeevaram Heavy Korvai Temple Borders</option>
                  <option>Assam Wild Golden Muga Silk</option>
                  <option>Kashmir Kani Needle Pashmina Stoles</option>
                  <option>Varanasi Kadwa Real Zari Brocade</option>
                </select>
              </div>
              <div>
                <label className="block uppercase font-semibold text-[#3F0F17] mb-1">Target Quantity *</label>
                <input type="number" required min="5" placeholder="e.g. 20" className="w-full px-3 py-2 bg-[#F7F1E6] border border-[#C9A227]/40 rounded" />
              </div>
            </div>

            <div>
              <label className="block uppercase font-semibold text-[#3F0F17] mb-1">Order Notes & Specifications</label>
              <textarea rows={3} placeholder="Provide target colors, widths, or loom completion dates..." className="w-full px-3 py-2 bg-[#F7F1E6] border border-[#C9A227]/40 rounded" />
            </div>

            <Button variant="gold" size="lg" type="submit" className="w-full">
              <Send className="w-4 h-4 mr-2" /> Submit Bulk Wholesale Inquiry
            </Button>
          </form>
        )}
      </div>

    </div>
  );
};
