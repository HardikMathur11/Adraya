import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, Filter } from 'lucide-react';
import { MOOD_COLLECTIONS, getProductsByMood } from '../lib/api/products';
import { MoodCollection, Product } from '../lib/api/types';
import { Button } from '../components/ui/Button';
import { GoldLabel } from '../components/ui/GoldLabel';
import { TiltCard3D } from '../components/ui/TiltCard3D';

export const MoodsExplore: React.FC = () => {
  const [selectedMoodKey, setSelectedMoodKey] = useState<string>('royal');
  const [products, setProducts] = useState<Product[]>([]);
  const [activeMood, setActiveMood] = useState<MoodCollection>(MOOD_COLLECTIONS[0]);
  const [searchOccasion, setSearchOccasion] = useState<string>('');

  useEffect(() => {
    const m = MOOD_COLLECTIONS.find((item) => item.moodKey === selectedMoodKey) || MOOD_COLLECTIONS[0];
    setActiveMood(m);
    loadMoodProducts(selectedMoodKey);
  }, [selectedMoodKey]);

  const loadMoodProducts = async (moodKey: string) => {
    const p = await getProductsByMood(moodKey);
    setProducts(p);
  };

  const filteredProducts = products.filter((p) => {
    if (!searchOccasion.trim()) return true;
    const query = searchOccasion.toLowerCase();
    return (
      p.title.toLowerCase().includes(query) ||
      p.weaveName.toLowerCase().includes(query) ||
      p.culturalMeaning.toLowerCase().includes(query) ||
      p.region.toLowerCase().includes(query)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Editorial Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <GoldLabel>SHOP BY HERITAGE MOOD & OCCASION</GoldLabel>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#3F0F17]">
          Purchase per Mood & Occasion
        </h1>
        <p className="font-editorial text-lg italic text-[#8A7A68]">
          Select an atelier mood below or search by festival occasion to explore drapes crafted specifically for grand weddings, courtly durbars, heirloom gifting, or quiet luxury.
        </p>
      </div>

      {/* Occasion Search Input Bar */}
      <div className="max-w-2xl mx-auto bg-[#FBF7EF] border-2 border-[#C9A227] p-2.5 rounded-[6px] shadow-xl flex items-center gap-3">
        <Search className="w-5 h-5 text-[#C9A227] ml-2" />
        <input
          type="text"
          value={searchOccasion}
          onChange={(e) => setSearchOccasion(e.target.value)}
          placeholder="Search by Occasion (e.g. Bridal Wedding, Temple Puja, Royal Reception, Diwali)..."
          className="flex-1 bg-transparent text-sm text-[#3F0F17] focus:outline-none placeholder:text-[#8A7A68]"
        />
        {searchOccasion && (
          <button
            onClick={() => setSearchOccasion('')}
            className="text-xs font-bold text-[#6B1E28] uppercase hover:underline mr-2 cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* Mood Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {MOOD_COLLECTIONS.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelectedMoodKey(m.moodKey)}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              selectedMoodKey === m.moodKey
                ? 'bg-[#6B1E28] text-[#E8D8A8] border-2 border-[#C9A227] shadow-lg scale-105'
                : 'bg-[#FBF7EF] text-[#3F0F17] border border-[#C9A227]/30 hover:border-[#C9A227]'
            }`}
          >
            {m.title.split('—')[0]}
          </button>
        ))}
      </div>

      {/* Active Mood Hero Wall Text */}
      <div className="relative rounded-[6px] overflow-hidden bg-[#3F0F17] text-[#F7F1E6] p-10 border-2 border-[#C9A227] shadow-2xl">
        <img
          src={activeMood.heroImage}
          alt={activeMood.title}
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E8D8A8] bg-[#6B1E28] px-3 py-1 rounded border border-[#C9A227]/30">
            {activeMood.subtitle}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F7F1E6]">
            {activeMood.title}
          </h2>
          <p className="font-editorial text-lg italic text-[#F7F1E6]/90 border-l-2 border-[#C9A227] pl-4">
            "{activeMood.editorialWallText}"
          </p>
        </div>
      </div>

      {/* Product Grid for Selected Mood */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-display font-bold text-2xl text-[#3F0F17]">
            Available Drapes in {activeMood.title} ({filteredProducts.length})
          </h3>
          {searchOccasion && (
            <span className="text-xs font-mono text-[#6B1E28]">
              Filtered by: "{searchOccasion}"
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map((p) => (
            <TiltCard3D key={p.id}>
              <Link to={`/product/${p.slug}`} className="block h-full">
                <div className="bg-[#FBF7EF] border border-[#C9A227]/30 rounded-[6px] p-5 space-y-4 shadow-fabric flex flex-col justify-between h-full hover:border-[#C9A227] transition-all">
                  <div className="relative">
                    <img src={p.textureUrl} alt={p.title} className="w-full h-64 object-cover rounded border border-[#C9A227]/30" />
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-[#3F0F17] text-[#E8D8A8] px-2 py-0.5 rounded shadow border border-[#C9A227]/40">
                      📷 {p.images?.length || 1} Photos
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#8A7A68]">{p.region}</span>
                    <h4 className="font-display font-bold text-lg text-[#3F0F17] group-hover:text-[#6B1E28]">{p.title}</h4>
                    <p className="text-xs text-[#8A7A68] mt-1">Master Weaver: <strong className="text-[#3F0F17]">{p.weaverName}</strong> ({p.weaverVillage})</p>
                  </div>

                  <div className="pt-3 border-t border-[#C9A227]/20 flex justify-between items-center">
                    <span className="font-display font-bold text-xl text-[#6B1E28]">
                      ₹{p.price.toLocaleString('en-IN')}
                    </span>
                    <Button variant="primary" size="sm">Inspect {p.images?.length || 1} Photos</Button>
                  </div>
                </div>
              </Link>
            </TiltCard3D>
          ))}
        </div>
      </div>

    </div>
  );
};
