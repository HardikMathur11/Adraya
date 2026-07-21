'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Sparkles,
  UserPlus,
  Building2,
  BookOpen,
  Compass,
  Globe,
  BarChart3,
  UserCheck,
  ChevronDown,
  Layers,
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useSessionStore, LanguageCode } from '@/store/useSessionStore';

export const Navbar: React.FC = () => {
  const { items, openCart } = useCartStore();
  const { currentLanguage, setLanguage, activeRole, setActiveRole } = useSessionStore();
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const languages: { code: LanguageCode; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'as', label: 'অসমীয়া (Assamese)' },
    { code: 'bn', label: 'বাংলা (Bengali)' },
    { code: 'ta', label: 'தமிழ் (Tamil)' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-wine)] text-[var(--color-ivory)] border-b border-[var(--color-gold)]/30 shadow-md">
      
      {/* Top 2-Role Mode Switcher Bar */}
      <div className="bg-[var(--color-oxblood)] text-[var(--color-gold-light)] px-4 py-1.5 border-b border-[var(--color-gold)]/20 text-[11px] flex items-center justify-between">
        
        {/* Simple 2-Role Toggle: Customer vs Weaver */}
        <div className="flex items-center gap-3">
          <span className="uppercase tracking-widest font-semibold text-[10px] text-[var(--color-gold)] flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5 text-[var(--color-gold)]" /> Active View:
          </span>

          <div className="flex bg-[var(--color-wine)] p-0.5 rounded border border-[var(--color-gold)]/40">
            <button
              onClick={() => setActiveRole('customer')}
              className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                activeRole === 'customer'
                  ? 'bg-[var(--color-gold)] text-[var(--color-wine)] shadow'
                  : 'text-[var(--color-ivory)] hover:text-[var(--color-gold)]'
              }`}
            >
              Customer Storefront
            </button>
            <button
              onClick={() => setActiveRole('weaver')}
              className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                activeRole === 'weaver'
                  ? 'bg-[var(--color-gold)] text-[var(--color-wine)] shadow'
                  : 'text-[var(--color-ivory)] hover:text-[var(--color-gold)]'
              }`}
            >
              Weaver & Guild Portal
            </button>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <span className="text-[10px] font-mono text-[var(--color-gold-light)]">
            {activeRole === 'customer' ? '✨ Browsing Luxury Atelier' : '🛠️ Artisan Workspace Active'}
          </span>
        </div>

      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Emblem */}
          <Link href="/" className="flex items-center gap-3 group relative z-10">
            <div className="w-10 h-10 rounded-full border border-[var(--color-gold)] flex items-center justify-center bg-[var(--color-oxblood)] group-hover:scale-105 transition-transform duration-300">
              <span className="font-display font-bold text-[var(--color-gold)] text-xl">W</span>
            </div>
            <div>
              <span className="font-display text-xl sm:text-2xl font-semibold tracking-wider text-[var(--color-ivory)] group-hover:text-[var(--color-gold)] transition-colors">
                WEAVEHERITAGE
              </span>
              <span className="block text-[10px] font-sans tracking-[0.3em] uppercase text-[var(--color-gold-light)] opacity-90">
                LUXURY ATELIER
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium tracking-widest uppercase relative z-10">
            {activeRole === 'customer' ? (
              <>
                <Link
                  href="/"
                  className="text-[var(--color-ivory)]/90 hover:text-[var(--color-gold)] transition-colors py-1"
                >
                  Atelier
                </Link>

                <Link
                  href="/collections/heirloom-gift"
                  className="text-[var(--color-ivory)]/90 hover:text-[var(--color-gold)] transition-colors py-1"
                >
                  Collections
                </Link>

                <Link
                  href="/b2b"
                  className="flex items-center gap-1 text-[var(--color-gold-light)] hover:text-[var(--color-gold)] py-1"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  B2B Sourcing
                </Link>

                <Link
                  href="/visits"
                  className="text-[var(--color-ivory)]/90 hover:text-[var(--color-gold)] transition-colors py-1"
                >
                  Visits
                </Link>

                <Link
                  href="/analytics"
                  className="flex items-center gap-1 text-[var(--color-ivory)]/90 hover:text-[var(--color-gold)] py-1"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                  Fair Payouts
                </Link>
              </>
            ) : (
              /* WEAVER ROLE NAV LINKS */
              <>
                <Link
                  href="/onboard"
                  className="flex items-center gap-1 text-[var(--color-gold)] font-bold bg-[var(--color-oxblood)] px-2.5 py-1 rounded border border-[var(--color-gold)]/40 hover:brightness-110"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Onboarding Wizard
                </Link>

                <Link
                  href="/assistant"
                  className="flex items-center gap-1 text-[var(--color-gold-light)] hover:text-[var(--color-gold)] py-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                  AI Brand Story Assistant
                </Link>

                <Link
                  href="/b2b/cluster/ORDER-2026-901"
                  className="flex items-center gap-1 text-[var(--color-gold-light)] hover:text-[var(--color-gold)] py-1"
                >
                  <Layers className="w-3.5 h-3.5" />
                  Cluster Orders & Allocations
                </Link>

                <Link
                  href="/learn"
                  className="text-[var(--color-ivory)]/90 hover:text-[var(--color-gold)] transition-colors py-1"
                >
                  Education Hub
                </Link>

                <Link
                  href="/analytics"
                  className="flex items-center gap-1 text-[var(--color-ivory)]/90 hover:text-[var(--color-gold)] py-1"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                  Artisan Earnings
                </Link>
              </>
            )}
          </nav>

          {/* Right Actions: Language Switcher & Cart */}
          <div className="flex items-center gap-3 relative z-10">
            
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-gold-light)] border border-[var(--color-gold)]/30 rounded-full hover:border-[var(--color-gold)] transition-colors cursor-pointer"
                aria-label="Select language"
              >
                <Globe className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                <span>{currentLanguage.toUpperCase()}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-[var(--color-wine)] border border-[var(--color-gold)]/40 rounded-md shadow-2xl py-2 z-50">
                  <div className="px-3 py-1 text-[10px] font-sans uppercase tracking-widest text-[var(--color-gold-light)] border-b border-[var(--color-gold)]/20 mb-1">
                    Select Language
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between ${
                        currentLanguage === lang.code
                          ? 'text-[var(--color-gold)] font-bold bg-[var(--color-oxblood)]'
                          : 'text-[var(--color-ivory)] hover:bg-[var(--color-oxblood)]/60'
                      }`}
                    >
                      {lang.label}
                      {currentLanguage === lang.code && <span className="text-[var(--color-gold)]">•</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            {activeRole === 'customer' && (
              <button
                onClick={openCart}
                className="relative p-2 text-[var(--color-ivory)] hover:text-[var(--color-gold)] transition-colors focus:outline-none cursor-pointer"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag className="w-6 h-6 stroke-[1.25]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--color-gold)] text-[var(--color-wine)] font-bold text-[10px] flex items-center justify-center shadow-md border border-[var(--color-wine)]">
                    {totalItems}
                  </span>
                )}
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
