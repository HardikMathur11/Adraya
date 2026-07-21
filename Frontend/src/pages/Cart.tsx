import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { Button } from '../components/ui/Button';

export const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity } = useCartStore();
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <h1 className="font-display text-3xl font-bold text-[#3F0F17]">Your Atelier Collection</h1>

      {items.length === 0 ? (
        <div className="bg-[#FBF7EF] border border-[#C9A227]/30 rounded p-12 text-center space-y-4 shadow-fabric">
          <p className="font-editorial text-lg italic text-[#8A7A68]">
            Your collection is empty. Every piece here begins with a name and a village — go find yours.
          </p>
          <Link to="/">
            <Button variant="gold" size="md">Browse Atelier Collection</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="bg-[#FBF7EF] border border-[#C9A227]/30 rounded p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-fabric">
                <div className="flex items-center gap-4">
                  <img src={item.product.textureUrl} alt={item.product.title} className="w-20 h-24 object-cover rounded border border-[#C9A227]" />
                  <div>
                    <h3 className="font-display font-bold text-base text-[#3F0F17]">{item.product.title}</h3>
                    <p className="text-xs text-[#8A7A68]">Handwoven by {item.product.weaverName} ({item.product.weaverVillage})</p>
                    <span className="font-display font-bold text-base text-[#6B1E28] block mt-1">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))} className="px-2 py-1 bg-[#F7F1E6] border border-[#C9A227]/40 rounded text-xs">-</button>
                    <span className="text-xs font-bold px-2">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-2 py-1 bg-[#F7F1E6] border border-[#C9A227]/40 rounded text-xs">+</button>
                  </div>

                  <button onClick={() => removeItem(item.product.id)} className="text-[#6B1E28] hover:text-red-700">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#3F0F17] text-[#F7F1E6] p-6 rounded border-2 border-[#C9A227] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="font-editorial text-sm italic text-[#E8D8A8]">Subtotal (Direct Weaver Fair Share)</span>
              <div className="font-display text-2xl font-bold text-[#C9A227]">₹{subtotal.toLocaleString('en-IN')}</div>
            </div>
            <Link to="/checkout">
              <Button variant="gold" size="lg">
                Proceed to Checkout <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
