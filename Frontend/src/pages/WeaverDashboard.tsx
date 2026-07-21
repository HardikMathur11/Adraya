import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Plus, Users, HeartHandshake, FileText, CheckCircle2, ShieldCheck, ArrowRight, TrendingUp, CreditCard, Layers, Award, PackageCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { GoldLabel } from '../components/ui/GoldLabel';
import { LuxuryVideoPlayer } from '../components/ui/LuxuryVideoPlayer';
import { Dashboard3DLoomStudio } from '../components/three/Dashboard3DLoomStudio';
import { TiltCard3D } from '../components/ui/TiltCard3D';
import { getOrdersByWeaver, getBuyerRequirements } from '../lib/api/orders';
import { getFeaturedProducts } from '../lib/api/products';
import { getGuildMembers, getBankSettlements, GuildMember, BankSettlement } from '../lib/api/weavers';
import { Order, BuyerRequirement, Product } from '../lib/api/types';

export const WeaverDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [requirements, setRequirements] = useState<BuyerRequirement[]>([]);
  const [guildMembers, setGuildMembers] = useState<GuildMember[]>([]);
  const [bankSettlements, setBankSettlements] = useState<BankSettlement[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const prod = await getFeaturedProducts();
    const ord = await getOrdersByWeaver();
    const req = await getBuyerRequirements();
    const gm = await getGuildMembers();
    const bs = await getBankSettlements();
    
    setProducts(prod);
    setOrders(ord);
    setRequirements(req);
    setGuildMembers(gm);
    setBankSettlements(bs);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* 1. HERO HEADER */}
      <div className="bg-[#3F0F17] text-[#F7F1E6] p-8 rounded-[6px] border-2 border-[#C9A227] shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E8D8A8] bg-[#6B1E28] px-3 py-1 rounded border border-[#C9A227]/30">
            Artisan Atelier Portal
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#F7F1E6] mt-2">
            Welcome Back, Radha Devi
          </h1>
          <p className="font-editorial text-sm italic text-[#F7F1E6]/80 mt-1">
            Pochampally Ikat Cluster • 82% Direct Fair-Trade Payout Active
          </p>
        </div>

        <div className="flex gap-3">
          <Link to="/weaver-dashboard/products/new">
            <Button variant="gold" size="md">
              <Plus className="w-4 h-4 mr-2" /> Add New Listing
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. DYNAMIC 3D STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <TiltCard3D>
          <div className="bg-[#FBF7EF] border-2 border-[#C9A227] rounded p-6 shadow-fabric space-y-2 h-full">
            <div className="flex justify-between items-center text-[#8A7A68]">
              <span className="text-xs uppercase tracking-widest font-semibold">Total Revenue Earned</span>
              <TrendingUp className="w-4 h-4 text-[#0B3D2E]" />
            </div>
            <div className="font-display font-bold text-3xl text-[#6B1E28]">₹1,42,000</div>
            <span className="text-[11px] text-[#0B3D2E] font-semibold flex items-center gap-1">
              <HeartHandshake className="w-3.5 h-3.5" /> ₹1,16,440 (82%) Direct Payout
            </span>
          </div>
        </TiltCard3D>

        <TiltCard3D>
          <div className="bg-[#FBF7EF] border border-[#C9A227]/30 rounded p-6 shadow-fabric space-y-2 h-full">
            <div className="flex justify-between items-center text-[#8A7A68]">
              <span className="text-xs uppercase tracking-widest font-semibold">Total Customers Served</span>
              <Users className="w-4 h-4 text-[#C9A227]" />
            </div>
            <div className="font-display font-bold text-3xl text-[#0B3D2E]">58 Connoisseurs</div>
            <span className="text-[11px] text-[#8A7A68]">Across 12 Global Cities</span>
          </div>
        </TiltCard3D>

        <TiltCard3D>
          <div className="bg-[#FBF7EF] border border-[#C9A227]/30 rounded p-6 shadow-fabric space-y-2 h-full">
            <span className="text-xs uppercase tracking-widest text-[#8A7A68] font-semibold">Active Masterpiece Listings</span>
            <div className="font-display font-bold text-3xl text-[#3F0F17]">{products.length} Pieces</div>
            <span className="text-[11px] text-[#8A7A68]">100% GI Certificate Signed</span>
          </div>
        </TiltCard3D>

        <TiltCard3D>
          <div className="bg-[#FBF7EF] border border-[#C9A227]/30 rounded p-6 shadow-fabric space-y-2 h-full">
            <span className="text-xs uppercase tracking-widest text-[#8A7A68] font-semibold">Monthly Profile Views</span>
            <div className="font-display font-bold text-3xl text-[#3F0F17]">312 Views</div>
            <span className="text-[11px] text-[#8A7A68]">From Atelier Collectors</span>
          </div>
        </TiltCard3D>

      </div>

      {/* 3. INTERACTIVE 3D THREE.JS LOOM STUDIO & LIVE VIDEO STREAM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-3">
          <Dashboard3DLoomStudio />
        </div>

        <div className="lg:col-span-5 space-y-3">
          <LuxuryVideoPlayer
            src="/assets/loom-artisan-video.mp4"
            title="Radha Devi's Pit Loom — Live Broadcast Stream"
            isLiveStreamTag
          />
        </div>
      </div>

      {/* 4. WEAVER'S OWN ACTIVE PRODUCTS CATALOG (DIRECT LINKS TO PRODUCT PAGES) */}
      <div className="bg-[#FBF7EF] border border-[#C9A227]/30 rounded p-6 shadow-fabric space-y-6">
        <div className="border-b border-[#C9A227]/20 pb-4 flex justify-between items-center">
          <div>
            <GoldLabel>YOUR LIVE MASTERPIECE CATALOG</GoldLabel>
            <h2 className="font-display text-2xl font-bold text-[#3F0F17] mt-1">
              All Products Woven by You (Click to View Live Product Page)
            </h2>
          </div>
          <Link to="/weaver-dashboard/products/new">
            <Button variant="gold" size="sm">+ Add New Drape</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <TiltCard3D key={p.id}>
              <Link to={`/product/${p.slug}`} className="block h-full">
                <div className="bg-[#F7F1E6] border border-[#C9A227]/40 rounded p-5 space-y-4 shadow-sm hover:border-[#C9A227] transition-all h-full flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="relative h-56 rounded overflow-hidden border border-[#C9A227]/30">
                      <img src={p.textureUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-2 left-2 text-[10px] uppercase font-bold tracking-wider bg-[#3F0F17] text-[#E8D8A8] px-2 py-0.5 rounded shadow border border-[#C9A227]/40">
                        📷 {p.images?.length || 1} Photos
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-[#8A7A68] uppercase block">{p.weaveName}</span>
                      <h4 className="font-display font-bold text-base text-[#3F0F17] group-hover:text-[#6B1E28] transition-colors">{p.title}</h4>
                      <p className="text-xs text-[#0B3D2E] font-semibold mt-0.5">82%+ Payout: ₹{Math.round(p.price * 0.82).toLocaleString('en-IN')}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#C9A227]/20 flex justify-between items-center">
                    <span className="font-display font-bold text-lg text-[#6B1E28]">₹{p.price.toLocaleString('en-IN')}</span>
                    <Button variant="gold" size="sm">
                      Inspect Product Page <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                </div>
              </Link>
            </TiltCard3D>
          ))}
        </div>
      </div>

      {/* 5. GUILD & CLUSTER CO-WEAVERS ROSTER */}
      <div className="bg-[#FBF7EF] border border-[#C9A227]/30 rounded p-6 shadow-fabric space-y-6">
        <div className="border-b border-[#C9A227]/20 pb-3 flex justify-between items-center">
          <div>
            <GoldLabel>POCHAMPALLY IKAT GUILD ROSTER</GoldLabel>
            <h2 className="font-display text-2xl font-bold text-[#3F0F17] mt-1">
              Co-Weavers & Guild Artisans (44 Members)
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {guildMembers.map((gm) => (
            <div key={gm.id} className="p-4 bg-[#F7F1E6] rounded border border-[#C9A227]/30 flex items-center gap-3">
              <img src={gm.avatar} alt={gm.name} className="w-12 h-12 rounded-full object-cover border border-[#C9A227]" />
              <div className="space-y-0.5">
                <h4 className="font-display font-bold text-sm text-[#3F0F17]">{gm.name}</h4>
                <span className="text-[10px] text-[#6B1E28] font-semibold block">{gm.role}</span>
                <span className="text-[10px] text-[#8A7A68]">{gm.experienceYears} Yrs Lineage</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. DIRECT BANK SETTLEMENT LEDGER */}
      <div className="bg-[#FBF7EF] border border-[#C9A227]/30 rounded p-6 shadow-fabric space-y-6">
        <div className="border-b border-[#C9A227]/20 pb-3 flex justify-between items-center">
          <div>
            <GoldLabel>DIRECT BANK SETTLEMENTS</GoldLabel>
            <h2 className="font-display text-2xl font-bold text-[#3F0F17] mt-1">
              Verified UTR Bank Payout Ledger (82% Direct Share)
            </h2>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          {bankSettlements.map((bs) => (
            <div key={bs.id} className="p-4 bg-[#F7F1E6] rounded border border-[#C9A227]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="font-mono font-bold text-[#6B1E28] text-sm">{bs.id} • {bs.date}</span>
                <p className="text-[#3F0F17] font-semibold mt-0.5">{bs.bankName}</p>
                <span className="font-mono text-[10px] text-[#8A7A68]">UTR: {bs.utrNumber}</span>
              </div>

              <div className="text-right space-y-1">
                <span className="font-display font-bold text-xl text-[#0B3D2E] block">₹{bs.amount.toLocaleString('en-IN')}</span>
                <Badge variant="verified">{bs.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. CUSTOMER ORDER & PAYOUT HISTORY TABLE */}
      <div className="bg-[#FBF7EF] border border-[#C9A227]/30 rounded p-6 shadow-fabric space-y-6">
        <div className="flex justify-between items-center border-b border-[#C9A227]/20 pb-4">
          <div>
            <GoldLabel>CUSTOMER TRANSACTIONS</GoldLabel>
            <h2 className="font-display text-2xl font-bold text-[#3F0F17] mt-1">
              Recent Customer Orders & Direct Rupee Payout History
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#C9A227]/40 text-[#8A7A68] uppercase font-semibold text-[10px]">
                <th className="py-3 px-3">Order ID & Date</th>
                <th className="py-3 px-3">Customer Name & Location</th>
                <th className="py-3 px-3">Article Purchased</th>
                <th className="py-3 px-3">Total Price (₹)</th>
                <th className="py-3 px-3">Your Fair Share (82%+)</th>
                <th className="py-3 px-3">Payout Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C9A227]/20 text-[#2B2320]">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#F7F1E6] transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-[#3F0F17]">
                    {ord.id}
                    <span className="block text-[10px] text-[#8A7A68] font-normal">{ord.date}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-[#6B1E28] block">{ord.customerName}</span>
                    <span className="text-[10px] text-[#8A7A68]">{ord.customerLocation}</span>
                  </td>
                  <td className="py-3 px-3 font-medium text-[#3F0F17]">{ord.productTitle}</td>
                  <td className="py-3 px-3 font-bold text-[#3F0F17]">₹{ord.price.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-3 font-bold text-[#0B3D2E]">₹{ord.weaverPayout.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-3">
                    <Badge variant="verified">{ord.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 8. CUSTOM BUYER REQUIREMENTS / RFQs FEED */}
      <div className="bg-[#FBF7EF] border border-[#C9A227]/30 rounded p-6 shadow-fabric space-y-6">
        <div className="border-b border-[#C9A227]/20 pb-4">
          <GoldLabel>CUSTOM WEAVE REQUESTS</GoldLabel>
          <h2 className="font-display text-2xl font-bold text-[#3F0F17] mt-1">
            Custom Buyer Requirements & RFQ Feed
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requirements.map((req) => (
            <div key={req.id} className="bg-[#F7F1E6] border border-[#C9A227]/40 rounded p-5 space-y-3 shadow-sm flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono text-[#8A7A68]">
                  <span>{req.id}</span>
                  <Badge variant="quality-check">{req.status}</Badge>
                </div>
                <h4 className="font-display font-bold text-base text-[#3F0F17]">{req.craftRequested}</h4>
                <p className="text-xs text-[#8A7A68]">Buyer: <strong className="text-[#6B1E28]">{req.buyerName}</strong> ({req.buyerCity})</p>
                <p className="font-editorial text-xs italic text-[#2B2320]">"{req.notes}"</p>
              </div>

              <div className="pt-3 border-t border-[#C9A227]/20 flex justify-between items-center">
                <div>
                  <span className="font-display font-bold text-base text-[#0B3D2E]">₹{req.budgetPerPiece.toLocaleString('en-IN')}/piece</span>
                  <span className="text-[10px] text-[#8A7A68] block">Qty: {req.quantity} units • Deadline: {req.targetDeadline}</span>
                </div>
                <Button variant="gold" size="sm">Accept Request</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROMPT CARD */}
      <div className="bg-[#6B1E28] text-[#F7F1E6] p-6 rounded border border-[#C9A227]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-[#C9A227]" />
          <div>
            <h3 className="font-display font-bold text-lg">Let AI Help You Tell Your Next Story</h3>
            <p className="text-xs text-[#E8D8A8]">Draft listings, write Instagram captions, or get fair luxury pricing suggestions.</p>
          </div>
        </div>
        <Link to="/assistant">
          <Button variant="gold" size="sm">Open AI Assistant</Button>
        </Link>
      </div>

    </div>
  );
};
