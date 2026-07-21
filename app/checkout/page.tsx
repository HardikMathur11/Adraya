'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ShieldCheck, HeartHandshake, Award, Lock, CheckCircle2 } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GoldLabel } from '@/components/ui/GoldLabel';

const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  address: z.string().min(5, 'Delivery address is required'),
  city: z.string().min(2, 'City is required'),
  postalCode: z.string().min(4, 'Postal code is required'),
  country: z.string().min(2, 'Country is required'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { items, getTotal, getWeaverShareTotal, clearCart } = useCartStore();
  const [orderComplete, setOrderComplete] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: 'Lady Eleanor Vance',
      email: 'eleanor.vance@atelier-heritage.com',
      phone: '+44 7700 900077',
      address: '74 Mayfair Royal Enclave',
      city: 'London',
      postalCode: 'W1K 1QA',
      country: 'United Kingdom',
    },
  });

  const total = getTotal();
  const weaverShareTotal = getWeaverShareTotal();

  const onSubmit = (data: CheckoutFormData) => {
    setOrderComplete(true);
    clearCart();
  };

  if (orderComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full border-2 border-[var(--color-gold)] bg-[var(--color-wine)] text-[var(--color-gold)] flex items-center justify-center mx-auto shadow-2xl">
          <CheckCircle2 className="w-10 h-10 stroke-[1.25]" />
        </div>
        
        <GoldLabel>Order Confirmed & Provenance Signed</GoldLabel>
        
        <h1 className="font-display text-4xl font-bold text-[var(--color-wine)]">
          Thank You for Preserving Heritage
        </h1>

        <p className="font-editorial text-lg italic text-[var(--color-charcoal)] max-w-xl mx-auto leading-relaxed">
          Your order has been recorded in the digital provenance ledger. <strong className="text-[var(--color-oxblood)]">₹{weaverShareTotal.toLocaleString('en-IN')}</strong> will be credited directly to the master artisan bank account upon dispatch.
        </p>

        <div className="pt-6">
          <Link href="/">
            <Button variant="gold" size="lg">
              Return to Atelier Gallery
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header Banner - Calm Single Column Flow */}
      <div className="text-center space-y-2 border-b border-[var(--color-gold)]/30 pb-6">
        <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[var(--color-oxblood)] font-bold">
          DIRECT FAIR-TRADE CHECKOUT
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-wine)]">
          Complete Your Order
        </h1>
        <p className="font-editorial text-sm italic text-[var(--color-taupe)] max-w-md mx-auto">
          Calm, transparent checkout with guaranteed direct-to-artisan revenue share. No urgency tickers, no hidden fees.
        </p>
      </div>

      {/* Trust Badges Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[var(--color-cream)] border border-[var(--color-gold)]/30 rounded-[var(--radius-card)] p-4 shadow-fabric text-center text-xs">
        <div className="flex items-center justify-center gap-2 p-2 font-semibold text-[var(--color-wine)]">
          <ShieldCheck className="w-4 h-4 text-[var(--color-gold)]" />
          <span>Handwoven Single-Origin</span>
        </div>
        <div className="flex items-center justify-center gap-2 p-2 font-semibold text-[var(--color-wine)]">
          <Award className="w-4 h-4 text-[var(--color-gold)]" />
          <span>GI-Tagged Certification</span>
        </div>
        <div className="flex items-center justify-center gap-2 p-2 font-semibold text-[var(--color-wine)]">
          <HeartHandshake className="w-4 h-4 text-[var(--color-gold)]" />
          <span>80%+ Direct to Weaver</span>
        </div>
      </div>

      {/* Order Summary & Weaver Credit Card */}
      <div className="bg-[var(--color-cream)] border-2 border-[var(--color-gold)]/40 rounded-[var(--radius-card)] p-6 space-y-6 shadow-fabric">
        <h3 className="font-display font-bold text-base text-[var(--color-wine)] uppercase tracking-wider">
          Order Summary & Artisan Credit Breakdown
        </h3>

        {items.length === 0 ? (
          <div className="text-center py-6 text-xs text-[var(--color-taupe)] italic font-editorial">
            No items in cart. Please select a weave from the collection first.
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-[var(--color-ivory)] border border-[var(--color-gold)]/20 rounded"
              >
                <div className="relative w-16 h-20 shrink-0 rounded overflow-hidden border border-[var(--color-gold)]/30">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between text-xs">
                  <div>
                    <h4 className="font-display font-bold text-sm text-[var(--color-oxblood)]">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-[var(--color-taupe)]">
                      {item.weaveName} • Handwoven by {item.weaverName}
                    </p>
                    <p className="text-[11px] text-[var(--color-emerald)] font-semibold mt-1">
                      {item.weaverSharePercentage}% of this price goes directly to {item.weaverName}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[10px] text-[var(--color-taupe)]">Qty: {item.quantity}</span>
                    <span className="font-display font-bold text-sm text-[var(--color-wine)]">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Payout Breakdown */}
        <div className="p-4 bg-[var(--color-emerald)]/10 border border-[var(--color-emerald)]/30 rounded space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-[var(--color-emerald)]">
            <span>Direct Artisan Payout Total:</span>
            <span className="font-display font-bold text-base">
              ₹{weaverShareTotal.toLocaleString('en-IN')}
            </span>
          </div>
          <p className="text-[10px] text-[var(--color-charcoal)]">
            Transferred directly into verified artisan bank accounts via NEFT/UPI upon dispatch.
          </p>
        </div>

        <div className="flex justify-between items-baseline pt-2 border-t border-[var(--color-gold)]/30">
          <span className="font-display font-bold text-base text-[var(--color-wine)] uppercase tracking-wider">
            Total Investment Value
          </span>
          <span className="font-display font-bold text-2xl text-[var(--color-oxblood)]">
            ₹{total.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Shipping Address Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-[var(--color-cream)] border border-[var(--color-gold)]/30 rounded-[var(--radius-card)] p-6 space-y-4 shadow-fabric">
          <h3 className="font-display font-bold text-base text-[var(--color-wine)] uppercase tracking-wider">
            Shipping & Collector Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--color-wine)] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                {...register('fullName')}
                className="w-full min-h-[44px] px-3 py-2 bg-[var(--color-ivory)] border border-[var(--color-gold)]/40 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
              />
              {errors.fullName && (
                <span className="text-red-700 text-[10px]">{errors.fullName.message}</span>
              )}
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--color-wine)] mb-1">
                Email Address *
              </label>
              <input
                type="email"
                {...register('email')}
                className="w-full min-h-[44px] px-3 py-2 bg-[var(--color-ivory)] border border-[var(--color-gold)]/40 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
              />
              {errors.email && (
                <span className="text-red-700 text-[10px]">{errors.email.message}</span>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold uppercase tracking-wider text-[var(--color-wine)] mb-1">
                Street Address *
              </label>
              <input
                type="text"
                {...register('address')}
                className="w-full min-h-[44px] px-3 py-2 bg-[var(--color-ivory)] border border-[var(--color-gold)]/40 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
              />
              {errors.address && (
                <span className="text-red-700 text-[10px]">{errors.address.message}</span>
              )}
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--color-wine)] mb-1">
                City *
              </label>
              <input
                type="text"
                {...register('city')}
                className="w-full min-h-[44px] px-3 py-2 bg-[var(--color-ivory)] border border-[var(--color-gold)]/40 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
              />
              {errors.city && (
                <span className="text-red-700 text-[10px]">{errors.city.message}</span>
              )}
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[var(--color-wine)] mb-1">
                Country *
              </label>
              <input
                type="text"
                {...register('country')}
                className="w-full min-h-[44px] px-3 py-2 bg-[var(--color-ivory)] border border-[var(--color-gold)]/40 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
              />
              {errors.country && (
                <span className="text-red-700 text-[10px]">{errors.country.message}</span>
              )}
            </div>
          </div>
        </div>

        {/* Complete Order Primary Button */}
        <Button
          variant="primary"
          size="lg"
          type="submit"
          disabled={items.length === 0}
          className="w-full min-h-[52px] flex items-center justify-center gap-2"
        >
          <Lock className="w-4 h-4 text-[var(--color-gold)]" />
          <span>Complete Your Order (₹{total.toLocaleString('en-IN')})</span>
        </Button>
      </form>

    </div>
  );
}
