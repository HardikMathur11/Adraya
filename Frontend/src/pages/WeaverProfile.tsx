import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getWeaverById } from '../lib/api/weavers';
import { getFeaturedProducts } from '../lib/api/products';
import { Weaver, Product } from '../lib/api/types';
import { LuxuryVideoPlayer } from '../components/ui/LuxuryVideoPlayer';
import { WeaverLoom3D } from '../components/three/WeaverLoom3D';
import { Button } from '../components/ui/Button';
import { GoldLabel } from '../components/ui/GoldLabel';
import { Badge } from '../components/ui/Badge';
import { MessageSquare, Calendar, Award, CheckCircle2, UserCheck, Heart } from 'lucide-react';

export const WeaverProfile: React.FC = () => {
  const { id = 'radha-devi' } = useParams<{ id: string }>();
  const [weaver, setWeaver] = useState<Weaver | undefined>();
  const [products, setProducts] = useState<Product[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'weaver', text: 'Namaste! I am Radha Devi. How can I help you customize your double-Ikat silk drape?' },
  ]);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadWeaverData();
  }, [id]);

  const loadWeaverData = async () => {
    const w = await getWeaverById(id);
    const p = await getFeaturedProducts();
    setWeaver(w);
    setProducts(p);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput) return;
    setMessages((prev) => [...prev, { sender: 'customer', text: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'weaver', text: `Thank you for your message! I will personally reply to your custom weave request soon.` },
      ]);
    }, 1000);
  };

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(`Session Confirmed with ${weaver?.name}! Confirmation Code: LOOM-${Date.now().toString().slice(-4)}`);
    setTimeout(() => {
      setBookingSuccess(null);
      setBookModalOpen(false);
    }, 3500);
  };

  if (!weaver) return null;

  return (
    <div className="space-y-16 pb-24">
      
      {/* 1. ARTISAN HERO BANNER */}
      <div className="relative bg-[#3F0F17] text-[#F7F1E6] py-20 border-b-2 border-[#C9A227]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src={weaver.avatar}
              alt={weaver.name}
              className="w-40 h-40 rounded-full border-4 border-[#C9A227] object-cover shadow-2xl"
            />

            <div className="space-y-3 text-center md:text-left">
              <GoldLabel>{weaver.specialty}</GoldLabel>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#F7F1E6]">
                {weaver.name}
              </h1>
              <p className="font-editorial text-lg italic text-[#F7F1E6]/90 max-w-2xl">
                "{weaver.biography}"
              </p>

              <div className="flex flex-wrap gap-3 pt-2 text-xs font-mono text-[#E8D8A8] justify-center md:justify-start">
                <span>{weaver.yearsWeaving} Years Lineage</span> •
                <span>{weaver.piecesCreated} Pieces Woven</span> •
                <span className="text-[#C9A227] font-bold">{weaver.totalCustomersServed} Direct Customers Served</span> •
                <span>{weaver.village}, {weaver.region}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs: Message & Book */}
          <div className="flex flex-col gap-3 w-full sm:w-auto">
            <Button variant="gold" size="lg" onClick={() => setChatOpen(true)}>
              <MessageSquare className="w-4 h-4 mr-2" /> Message Artisan Directly
            </Button>
            <Button variant="outline" size="lg" onClick={() => setBookModalOpen(true)}>
              <Calendar className="w-4 h-4 mr-2" /> Book Private Studio Visit
            </Button>
          </div>

        </div>
      </div>

      {/* 2. 3D LOOM MODEL & LIVE VIDEO SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Live Loom Broadcast */}
          <div className="lg:col-span-7">
            <LuxuryVideoPlayer title={`${weaver.name}'s Pit Loom Courtyard`} isLiveStreamTag />
          </div>

          {/* Right Three.js 3D Wooden Shuttle Model */}
          <div className="lg:col-span-5 space-y-4">
            <WeaverLoom3D />
            
            <div className="bg-[#FBF7EF] border border-[#C9A227]/30 rounded p-6 shadow-fabric space-y-3">
              <h4 className="font-display font-bold text-lg text-[#3F0F17]">Artisan Recognition & Honors</h4>
              <div className="space-y-2 text-xs">
                {weaver.awards?.map((award, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[#0B3D2E] font-semibold">
                    <Award className="w-4 h-4 text-[#C9A227]" />
                    <span>{award}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* 3. FULL WORK PORTFOLIO & ACTIVE MASTERPIECE LISTINGS */}
        <div className="space-y-8">
          <div className="border-b border-[#C9A227]/30 pb-3 flex justify-between items-end">
            <div>
              <GoldLabel>DIRECT LOOM CATALOG</GoldLabel>
              <h2 className="font-display text-3xl font-bold text-[#3F0F17] mt-1">
                Active Masterpiece Drapes by {weaver.name}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((p) => (
              <div key={p.id} className="bg-[#FBF7EF] border border-[#C9A227]/30 rounded-[6px] p-5 space-y-4 shadow-fabric flex flex-col justify-between">
                <img src={p.textureUrl} alt={p.title} className="w-full h-64 object-cover rounded border border-[#C9A227]/40" />
                
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#8A7A68]">{p.region}</span>
                  <h3 className="font-display font-bold text-lg text-[#3F0F17]">{p.title}</h3>
                  <p className="font-editorial text-xs italic text-[#8A7A68] mt-1">{p.culturalMeaning}</p>
                </div>

                <div className="pt-3 border-t border-[#C9A227]/20 flex justify-between items-center">
                  <span className="font-display font-bold text-xl text-[#6B1E28]">
                    ₹{p.price.toLocaleString('en-IN')}
                  </span>
                  <Link to={`/product/${p.slug}`}>
                    <Button variant="primary" size="sm">Inspect Garment</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. DIRECT MESSAGE ARTISAN CHAT MODAL */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#FBF7EF] border-2 border-[#C9A227] rounded-[6px] max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#C9A227]/30 pb-3">
              <div className="flex items-center gap-3">
                <img src={weaver.avatar} alt={weaver.name} className="w-10 h-10 rounded-full border border-[#C9A227] object-cover" />
                <div>
                  <h3 className="font-display font-bold text-base text-[#3F0F17]">Chat with {weaver.name}</h3>
                  <span className="text-[10px] text-[#0B3D2E] font-semibold">● Online from {weaver.village} Loom</span>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-[#3F0F17] font-bold text-lg cursor-pointer">✕</button>
            </div>

            <div className="h-64 overflow-y-auto space-y-3 p-3 bg-[#F7F1E6] rounded border border-[#C9A227]/30 text-xs">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded ${
                    m.sender === 'customer' ? 'bg-[#6B1E28] text-[#F7F1E6]' : 'bg-[#3F0F17] text-[#F7F1E6]'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about custom silk color, sizing, or loom dates..."
                className="flex-1 px-3 py-2 bg-[#F7F1E6] border border-[#C9A227]/40 rounded text-xs"
              />
              <Button variant="gold" size="sm" type="submit">Send</Button>
            </form>
          </div>
        </div>
      )}

      {/* 5. BOOK PRIVATE SESSION MODAL */}
      {bookModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#FBF7EF] border-2 border-[#C9A227] rounded-[6px] max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-display font-bold text-xl text-[#3F0F17]">
              Book Private Loom Session with {weaver.name}
            </h3>

            {bookingSuccess ? (
              <div className="p-4 bg-[#0B3D2E]/20 text-[#0B3D2E] rounded border border-[#0B3D2E] text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>{bookingSuccess}</span>
              </div>
            ) : (
              <form onSubmit={handleBookSession} className="space-y-4 text-xs">
                <div>
                  <label className="block uppercase font-semibold text-[#3F0F17] mb-1">Preferred Date</label>
                  <input type="date" required defaultValue="2026-08-20" className="w-full px-3 py-2 bg-[#F7F1E6] border border-[#C9A227]/40 rounded" />
                </div>

                <div>
                  <label className="block uppercase font-semibold text-[#3F0F17] mb-1">Visit Type</label>
                  <select className="w-full px-3 py-2 bg-[#F7F1E6] border border-[#C9A227]/40 rounded">
                    <option>1-on-1 Pit Loom Weaving Lesson (3 Hours)</option>
                    <option>Botanical Silk Dyeing Workshop (4 Hours)</option>
                    <option>Private Bridal Trousseau Consultation</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="secondary" size="sm" type="button" onClick={() => setBookModalOpen(false)}>Cancel</Button>
                  <Button variant="gold" size="sm" type="submit">Confirm Booking</Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
