import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { Button } from '../components/ui/Button';
import { GoldLabel } from '../components/ui/GoldLabel';
import { ShieldCheck, Heart, CheckCircle2 } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setCompleted(true);
  };

  if (completed) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#0B3D2E]/20 text-[#0B3D2E] border border-[#0B3D2E] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h1 className="font-display text-3xl font-bold text-[#3F0F17]">Order Placed Successfully!</h1>
        <p className="font-editorial text-lg italic text-[#8A7A68]">
          Thank you for supporting master Indian artisans. Your order has been transmitted directly to the loom.
        </p>
        <Button variant="gold" size="md" onClick={() => navigate('/account/orders')}>
          View My Orders & GI Passports
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <h1 className="font-display text-3xl font-bold text-[#3F0F17]">Direct Fair-Trade Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Form */}
        <div className="md:col-span-7 bg-[#FBF7EF] border border-[#C9A227]/30 rounded p-6 shadow-fabric space-y-6">
          <h3 className="font-display font-bold text-lg text-[#3F0F17]">Shipping & Delivery Address</h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block uppercase font-semibold text-[#3F0F17] mb-1">Full Name *</label>
              <input type="text" required defaultValue="Lady Eleanor Vance" className="w-full px-3 py-2 bg-[#F7F1E6] border border-[#C9A227]/40 rounded" />
            </div>

            <div>
              <label className="block uppercase font-semibold text-[#3F0F17] mb-1">Delivery Address *</label>
              <input type="text" required defaultValue="45 Mayfair Court, London W1K 5EA" className="w-full px-3 py-2 bg-[#F7F1E6] border border-[#C9A227]/40 rounded" />
            </div>

            <div>
              <label className="block uppercase font-semibold text-[#3F0F17] mb-1">Contact Email *</label>
              <input type="email" required defaultValue="eleanor.vance@mayfair.co.uk" className="w-full px-3 py-2 bg-[#F7F1E6] border border-[#C9A227]/40 rounded" />
            </div>

            <Button variant="gold" size="lg" type="submit" className="w-full pt-3">
              Complete Order & Dispatch to Loom
            </Button>
          </form>
        </div>

        {/* Right Fair Share Breakdown */}
        <div className="md:col-span-5 bg-[#3F0F17] text-[#F7F1E6] border-2 border-[#C9A227] rounded p-6 space-y-6 shadow-2xl">
          <div className="border-b border-[#C9A227]/30 pb-3">
            <GoldLabel>Direct Fair-Share Breakdown</GoldLabel>
            <h3 className="font-display font-bold text-xl text-[#F7F1E6] mt-1">Order Summary</h3>
          </div>

          <div className="space-y-3 text-xs">
            {items.map((item) => (
              <div key={item.product.id} className="p-3 bg-[#6B1E28] rounded border border-[#C9A227]/20 space-y-1">
                <h4 className="font-display font-bold text-sm text-[#F7F1E6]">{item.product.title}</h4>
                <p className="text-[11px] text-[#E8D8A8]">
                  Handwoven by {item.product.weaverName} — 82% (₹{Math.round(item.product.price * 0.82).toLocaleString('en-IN')}) goes directly to her.
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-[#C9A227]/30 pt-4 flex justify-between items-baseline">
            <span className="font-editorial italic">Total Amount</span>
            <span className="font-display text-2xl font-bold text-[#C9A227]">₹{total.toLocaleString('en-IN')}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
