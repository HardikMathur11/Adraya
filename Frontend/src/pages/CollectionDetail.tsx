import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOOD_COLLECTIONS, getProductsByMood } from '../lib/api/products';
import { Product, MoodCollection } from '../lib/api/types';
import { Button } from '../components/ui/Button';
import { GoldLabel } from '../components/ui/GoldLabel';

export const CollectionDetail: React.FC = () => {
  const { mood = 'royal' } = useParams<{ mood: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [collection, setCollection] = useState<MoodCollection | undefined>();

  useEffect(() => {
    const col = MOOD_COLLECTIONS.find((m) => m.moodKey === mood) || MOOD_COLLECTIONS[0];
    setCollection(col);
    loadProducts(col.moodKey);
  }, [mood]);

  const loadProducts = async (moodKey: string) => {
    const p = await getProductsByMood(moodKey);
    setProducts(p);
  };

  if (!collection) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Editorial Header */}
      <div className="relative rounded-[6px] overflow-hidden bg-[#3F0F17] text-[#F7F1E6] p-12 border-2 border-[#C9A227] shadow-2xl">
        <img
          src={collection.heroImage}
          alt={collection.title}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 max-w-3xl space-y-4">
          <GoldLabel>{collection.subtitle}</GoldLabel>
          <h1 className="font-display text-4xl sm:text-5xl font-bold">{collection.title}</h1>
          <p className="font-editorial text-lg italic text-[#F7F1E6]/90 leading-relaxed border-l-2 border-[#C9A227] pl-4">
            "{collection.editorialWallText}"
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((p) => (
          <div key={p.id} className="bg-[#FBF7EF] border border-[#C9A227]/30 rounded-[6px] overflow-hidden shadow-fabric space-y-4 p-5 flex flex-col justify-between">
            <img src={p.textureUrl} alt={p.title} className="w-full h-72 object-cover rounded" />
            <div>
              <span className="text-[10px] uppercase text-[#8A7A68]">{p.region}</span>
              <h3 className="font-display font-bold text-lg text-[#3F0F17]">{p.title}</h3>
              <p className="text-xs text-[#8A7A68]">Woven by {p.weaverName}</p>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-[#C9A227]/20">
              <span className="font-display font-bold text-lg text-[#6B1E28]">
                ₹{p.price.toLocaleString('en-IN')}
              </span>
              <Link to={`/product/${p.slug}`}>
                <Button variant="primary" size="sm">Inspect Drape</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
