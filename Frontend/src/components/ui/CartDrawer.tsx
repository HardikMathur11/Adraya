import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { Button } from './Button';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={closeCart} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF7EF] border-l-2 border-[#C9A227] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 bg-[#3F0F17] text-[#F7F1E6] flex items-center justify-between border-b border-[#C9A227]/30">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C9A227]" />
              <h2 className="font-display text-lg font-bold">Your Atelier Collection</h2>
            </div>
            <button onClick={closeCart} className="p-1 text-[#F7F1E6]/70 hover:text-[#C9A227] cursor-pointer">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <p className="font-editorial italic text-[#8A7A68]">
                  Your collection is empty. Every piece here begins with a name and a village — go find yours.
                </p>
                <Link to="/" onClick={closeCart}>
                  <Button variant="gold" size="sm">
                    Browse Atelier Collection
                  </Button>
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-4 bg-[#F7F1E6] rounded border border-[#C9A227]/20 relative">
                  <img
                    src={item.product.textureUrl}
                    alt={item.product.title}
                    className="w-20 h-24 object-cover rounded border border-[#C9A227]/30"
                  />

                  <div className="flex-1 space-y-1">
                    <h4 className="font-display font-bold text-sm text-[#3F0F17]">{item.product.title}</h4>
                    <p className="text-[11px] text-[#8A7A68]">Handwoven by {item.product.weaverName}</p>
                    <p className="font-display font-bold text-sm text-[#6B1E28]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </p>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="px-2 py-0.5 bg-[#FBF7EF] border border-[#C9A227]/40 text-xs rounded"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 bg-[#FBF7EF] border border-[#C9A227]/40 text-xs rounded"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="ml-auto text-[#6B1E28] hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 bg-[#3F0F17] text-[#F7F1E6] border-t border-[#C9A227]/30 space-y-4">
              <div className="flex justify-between items-baseline text-sm">
                <span className="font-editorial italic">Subtotal</span>
                <span className="font-display text-xl font-bold text-[#C9A227]">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>

              <p className="text-[10px] text-[#E8D8A8] italic text-center">
                82%+ of purchase price goes directly to artisan weaver accounts.
              </p>

              <Link to="/checkout" onClick={closeCart} className="block">
                <Button variant="gold" size="lg" className="w-full">
                  Proceed to Direct Checkout <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
