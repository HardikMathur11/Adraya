import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Upload, Feather, Ruler, Info, Layers, RefreshCw, CheckCircle2, Wand2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GoldLabel } from '../components/ui/GoldLabel';

export const CreateProduct: React.FC = () => {
  const [title, setTitle] = useState('');
  const [craftType, setCraftType] = useState('Double-Ikat Silk Weave');
  const [price, setPrice] = useState(18500);
  const [hours, setHours] = useState(140);
  const [culturalMeaning, setCulturalMeaning] = useState('');
  const [dimensions, setDimensions] = useState('5.5 Meters Saree + 0.8m Blouse');
  const [yarnSpec, setYarnSpec] = useState('300D Mulberry Silk & 24K Zari');
  const [b2bAvailable, setB2bAvailable] = useState(true);

  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiSuccessMessage, setAiSuccessMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleAiAutoFill = () => {
    setIsAiProcessing(true);
    setAiSuccessMessage(null);
    setTimeout(() => {
      setIsAiProcessing(false);
      setTitle('Pochampally Double-Ikat Silk Saree — Peacock Motif');
      setCraftType('Double-Ikat Resist Dye Silk');
      setPrice(18500);
      setHours(140);
      setCulturalMeaning('The double-peacock motif represents grace, fidelity, and royal protection across Telangana heritage households.');
      setDimensions('5.50 Meters Saree + 0.80m Blouse');
      setYarnSpec('300D Mulberry Silk & Botanical Dyes');
      setAiSuccessMessage('AI Enhancement Complete! Photos sharpened, background cleaned up, and listing details auto-generated.');
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/weaver-dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      
      <div className="border-b border-[#C9A227]/30 pb-4 flex justify-between items-end">
        <div>
          <GoldLabel>ARTISAN AI LISTING STUDIO</GoldLabel>
          <h1 className="font-display text-3xl font-bold text-[#3F0F17] mt-1">Create Atelier Listing with AI Services</h1>
        </div>
      </div>

      {/* AI Smart Assistant Action Banner */}
      <div className="bg-[#3F0F17] text-[#F7F1E6] p-6 rounded-[6px] border-2 border-[#C9A227] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Wand2 className="w-8 h-8 text-[#C9A227]" />
          <div>
            <h3 className="font-display font-bold text-lg text-[#F7F1E6]">AI Photo Enhancer & Auto-Form Filler</h3>
            <p className="text-xs text-[#E8D8A8]">Upload raw loom photo → AI will clean up lighting, generate title, story, fair price & specs.</p>
          </div>
        </div>
        <Button variant="gold" size="sm" onClick={handleAiAutoFill} disabled={isAiProcessing}>
          {isAiProcessing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
          {isAiProcessing ? 'AI Enhancing...' : 'Auto-Fill with AI'}
        </Button>
      </div>

      {aiSuccessMessage && (
        <div className="p-4 bg-[#0B3D2E]/20 text-[#0B3D2E] rounded border border-[#0B3D2E] text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#0B3D2E]" />
          <span>{aiSuccessMessage}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-[#FBF7EF] border border-[#C9A227]/30 rounded p-8 shadow-fabric space-y-6 text-xs">
        
        <div>
          <label className="block uppercase font-semibold text-[#3F0F17] mb-1">Listing Title *</label>
          <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Pochampally Double-Ikat Silk Saree — Peacock Motif" className="w-full px-3 py-2 bg-[#F7F1E6] border border-[#C9A227]/40 rounded" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block uppercase font-semibold text-[#3F0F17] mb-1">Craft Weave Type *</label>
            <input type="text" required value={craftType} onChange={(e) => setCraftType(e.target.value)} className="w-full px-3 py-2 bg-[#F7F1E6] border border-[#C9A227]/40 rounded" />
          </div>

          <div>
            <label className="block uppercase font-semibold text-[#3F0F17] mb-1">Pit Loom Hours Invested *</label>
            <input type="number" required value={hours} onChange={(e) => setHours(Number(e.target.value))} className="w-full px-3 py-2 bg-[#F7F1E6] border border-[#C9A227]/40 rounded" />
          </div>
        </div>

        <div>
          <label className="block uppercase font-semibold text-[#3F0F17] mb-1">AI-Generated Cultural Significance & Motif Story</label>
          <textarea rows={3} value={culturalMeaning} onChange={(e) => setCulturalMeaning(e.target.value)} placeholder="AI will auto-write story narrative when photo is uploaded..." className="w-full px-3 py-2 bg-[#F7F1E6] border border-[#C9A227]/40 rounded" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block uppercase font-semibold text-[#3F0F17] mb-1">Drape Dimensions & Length *</label>
            <input type="text" value={dimensions} onChange={(e) => setDimensions(e.target.value)} className="w-full px-3 py-2 bg-[#F7F1E6] border border-[#C9A227]/40 rounded" />
          </div>

          <div>
            <label className="block uppercase font-semibold text-[#3F0F17] mb-1">Yarn Density & Spec *</label>
            <input type="text" value={yarnSpec} onChange={(e) => setYarnSpec(e.target.value)} className="w-full px-3 py-2 bg-[#F7F1E6] border border-[#C9A227]/40 rounded" />
          </div>
        </div>

        <div>
          <label className="block uppercase font-semibold text-[#3F0F17] mb-1">Target Luxury Price (₹) *</label>
          <input type="number" required value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full px-3 py-2 bg-[#F7F1E6] border border-[#C9A227]/40 rounded" />
          <span className="text-[11px] text-[#0B3D2E] font-semibold block mt-1">
            82%+ (₹{Math.round(price * 0.82).toLocaleString('en-IN')}) transfers directly to your State Bank of India account.
          </span>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input type="checkbox" id="b2b" checked={b2bAvailable} onChange={(e) => setB2bAvailable(e.target.checked)} className="rounded text-[#6B1E28]" />
          <label htmlFor="b2b" className="font-semibold text-[#3F0F17] cursor-pointer">Allow B2B Wholesale & Bulk Order Inquiries for this piece</label>
        </div>

        <div className="p-4 bg-[#F7F1E6] border-2 border-dashed border-[#C9A227] rounded text-center space-y-2 cursor-pointer hover:bg-[#C9A227]/10 transition-colors">
          <Upload className="w-6 h-6 text-[#6B1E28] mx-auto" />
          <span className="font-bold text-[#3F0F17] block">Upload Silk Fabric Photos (AI will enhance resolution & lighting)</span>
        </div>

        <div className="pt-4 flex justify-between">
          <Button variant="secondary" size="sm" type="button" onClick={() => navigate('/weaver-dashboard')}>Cancel</Button>
          <Button variant="gold" size="md" type="submit">Publish to Atelier Storefront</Button>
        </div>
      </form>
    </div>
  );
};
