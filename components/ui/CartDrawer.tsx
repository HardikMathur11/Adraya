'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, Heart, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { Button } from './Button';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotal, getWeaverShareTotal } =
    useCartStore();

  if (!isOpen) return null;

  const total = getTotal();
  const weaverShareTotal = getWeaverShareTotal();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[var(--color-cream)] text-[var(--color-charcoal)] border-l border-[var(--color-gold)]/40 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 bg-[var(--color-wine)] text-[var(--color-ivory)] border-b border-[var(--color-gold)]/30 flex items-center justify-between">
            <div>
              <h3 className="font-display font-semibold text-lg text-[var(--color-ivory)]">
                Your Heritage Treasury
              </h3>
              <p className="text-[11px] text-[var(--color-gold-light)] font-sans uppercase tracking-widest mt-0.5">
                {items.length} {items.length === 1 ? 'Masterpiece' : 'Masterpieces'} Selected
              </p>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-[var(--color-ivory)] hover:text-[var(--color-gold)] transition-colors focus:outline-none"
            >
              <X className="w-5 h-5 stroke-[1.25]" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-ivory)] flex items-center justify-center mx-auto mb-4 text-[var(--color-gold)]">
                  <Heart className="w-8 h-8 stroke-[1.25]" />
                </div>
                <h4 className="font-display font-semibold text-base text-[var(--color-oxblood)]">
                  Your Treasury is Empty
                </h4>
                <p className="text-xs text-[var(--color-taupe)] mt-1 max-w-xs mx-auto font-editorial italic text-base">
                  Explore our curated ateliers and discover handwoven pieces direct from master Indian looms.
                </p>
                <div className="mt-6">
                  <Link href="/collections/heirloom-gift" onClick={closeCart}>
                    <Button variant="secondary" size="sm">
                      Explore Collections
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-[var(--color-ivory)] border border-[var(--color-gold)]/20 rounded-[var(--radius-card)]"
                >
                  <div className="relative w-20 h-24 shrink-0 rounded overflow-hidden border border-[var(--color-gold)]/30">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-display font-semibold text-xs text-[var(--color-oxblood)] leading-snug">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[var(--color-taupe)] hover:text-red-700 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[var(--color-taupe)] mt-0.5">
                        {item.weaveName} • {item.region}
                      </p>
                      <p className="text-[10px] text-[var(--color-emerald)] font-medium mt-1 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Weaver Share: {item.weaverSharePercentage}% (₹
                        {((item.price * item.weaverSharePercentage) / 100).toLocaleString('en-IN')})
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--color-gold)]/10">
                      <div className="flex items-center border border-[var(--color-taupe)]/30 rounded bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[var(--color-charcoal)] hover:bg-[var(--color-cream)]"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[var(--color-charcoal)] hover:bg-[var(--color-cream)]"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-display font-bold text-xs text-[var(--color-wine)]">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Payout Transparency */}
          {items.length > 0 && (
            <div className="p-6 bg-[var(--color-ivory)] border-t border-[var(--color-gold)]/30 space-y-4">
              
              {/* Weaver Fair-Share Payout Card */}
              <div className="p-3 bg-[var(--color-emerald)]/10 border border-[var(--color-emerald)]/30 rounded-[var(--radius-card)]">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[var(--color-emerald)] uppercase tracking-wider text-[10px]">
                    Direct Artisan Payout:
                  </span>
                  <span className="font-bold text-[var(--color-emerald)] font-display text-sm">
                    ₹{weaverShareTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-[10px] text-[var(--color-charcoal)]/80 mt-1">
                  100% credited directly into master weaver accounts upon dispatch.
                </p>
              </div>

              {/* Total Row */}
              <div className="flex justify-between items-baseline pt-2">
                <span className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--color-wine)]">
                  Total Heritage Value
                </span>
                <span className="font-display text-xl font-bold text-[var(--color-oxblood)]">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>

              <Link href="/checkout" onClick={closeCart} className="block w-full">
                <Button variant="primary" size="lg" className="w-full flex items-center justify-center gap-2">
                  <span>Proceed to Fair Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
