import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Calendar, Award, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { getFeaturedWeavers } from '../lib/api/weavers';
import { Weaver } from '../lib/api/types';
import { Button } from '../components/ui/Button';
import { GoldLabel } from '../components/ui/GoldLabel';
import { Badge } from '../components/ui/Badge';
import { TiltCard3D } from '../components/ui/TiltCard3D';

export const WeaversList: React.FC = () => {
  const [weavers, setWeavers] = useState<Weaver[]>([]);
  const [filterRegion, setFilterRegion] = useState('all');

  useEffect(() => {
    loadWeavers();
  }, []);

  const loadWeavers = async () => {
    const data = await getFeaturedWeavers();
    setWeavers(data);
  };

  const filteredWeavers = filterRegion === 'all'
    ? weavers
    : weavers.filter((w) => w.region.toLowerCase().includes(filterRegion.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Editorial Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <GoldLabel>DIRECT ARTISAN DIRECTORY</GoldLabel>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#3F0F17]">
          Connect Directly with Master Weavers
        </h1>
        <p className="font-editorial text-lg italic text-[#8A7A68]">
          No middlemen, no retail markups. Every artisan here has a name, a village, and centuries of family lineage. Message them, request custom drapes, or book studio visits.
        </p>
      </div>

      {/* Region Filter Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {['all', 'Telangana', 'Tamil Nadu', 'Assam', 'Kashmir', 'Uttar Pradesh'].map((region) => (
          <button
            key={region}
            onClick={() => setFilterRegion(region)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              filterRegion === region
                ? 'bg-[#6B1E28] text-[#E8D8A8] border border-[#C9A227] shadow'
                : 'bg-[#FBF7EF] text-[#3F0F17] border border-[#C9A227]/30 hover:border-[#C9A227]'
            }`}
          >
            {region === 'all' ? 'All Indian Craft Regions' : region}
          </button>
        ))}
      </div>

      {/* Artisans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredWeavers.map((w) => (
          <TiltCard3D key={w.id}>
            <div className="bg-[#FBF7EF] border-2 border-[#C9A227]/40 rounded-[6px] p-6 space-y-5 shadow-fabric flex flex-col justify-between h-full">
              
              <div className="flex items-center gap-4 border-b border-[#C9A227]/20 pb-4">
                <img
                  src={w.avatar}
                  alt={w.name}
                  className="w-16 h-16 rounded-full border-2 border-[#C9A227] object-cover shadow-md"
                />
                <div>
                  <h3 className="font-display font-bold text-xl text-[#3F0F17]">{w.name}</h3>
                  <span className="text-xs text-[#8A7A68] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#C9A227]" /> {w.village}, {w.region}
                  </span>
                  <span className="text-[11px] text-[#0B3D2E] font-semibold block mt-0.5">
                    {w.totalCustomersServed} Direct Buyers Served
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Badge variant="verified">{w.specialty}</Badge>
                <p className="font-editorial text-xs italic text-[#2B2320] line-clamp-3">
                  "{w.biography}"
                </p>
                <div className="text-[10px] font-mono text-[#8A7A68]">
                  <span>{w.yearsWeaving} Years Experience</span> • <span>{w.piecesCreated} Pieces Woven</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#C9A227]/20 space-y-2">
                <Link to={`/weaver/${w.id}`} className="block">
                  <Button variant="gold" size="sm" className="w-full">
                    View Studio & Message Weaver <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

            </div>
          </TiltCard3D>
        ))}
      </div>

    </div>
  );
};
