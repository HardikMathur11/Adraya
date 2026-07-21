import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, HeartHandshake, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--color-wine)] text-[var(--color-ivory)] border-t border-[var(--color-gold)]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Badges Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-[var(--color-gold)]/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-oxblood)] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[var(--color-gold)] stroke-[1.25]" />
            </div>
            <div>
              <h4 className="font-display font-semibold text-sm text-[var(--color-gold-light)] uppercase tracking-wider">
                GI-Tagged & Verified
              </h4>
              <p className="text-xs text-[var(--color-ivory)]/75 mt-0.5">
                Every weave holds certified Geographical Indication provenance.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-oxblood)] flex items-center justify-center shrink-0">
              <HeartHandshake className="w-6 h-6 text-[var(--color-gold)] stroke-[1.25]" />
            </div>
            <div>
              <h4 className="font-display font-semibold text-sm text-[var(--color-gold-light)] uppercase tracking-wider">
                80%+ Direct-to-Weaver Pricing
              </h4>
              <p className="text-xs text-[var(--color-ivory)]/75 mt-0.5">
                Transparent revenue share credited directly to master artisan bank accounts.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-oxblood)] flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-[var(--color-gold)] stroke-[1.25]" />
            </div>
            <div>
              <h4 className="font-display font-semibold text-sm text-[var(--color-gold-light)] uppercase tracking-wider">
                AI Authenticity Passport
              </h4>
              <p className="text-xs text-[var(--color-ivory)]/75 mt-0.5">
                Physical textiles embedded with digital ledger QR authenticity signatures.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12">
          
          {/* Atelier Brand Intro */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full border border-[var(--color-gold)] flex items-center justify-center bg-[var(--color-oxblood)]">
                <span className="font-display font-bold text-[var(--color-gold)] text-sm">W</span>
              </div>
              <span className="font-display text-lg font-semibold tracking-wider text-[var(--color-ivory)]">
                WEAVEHERITAGE
              </span>
            </div>
            <p className="font-editorial text-sm leading-relaxed text-[var(--color-ivory)]/80 italic">
              "Preserving India’s living loom heritage through digital authenticity, direct fair-share pricing, and global luxury atelier curation."
            </p>
          </div>

          {/* Collections Links */}
          <div>
            <h5 className="font-display text-xs font-semibold text-[var(--color-gold-light)] uppercase tracking-widest mb-4">
              Mood Collections
            </h5>
            <ul className="space-y-2.5 text-xs text-[var(--color-ivory)]/80">
              <li>
                <Link href="/collections/wedding" className="hover:text-[var(--color-gold)] transition-colors">
                  Solah Shringar Bridal
                </Link>
              </li>
              <li>
                <Link href="/collections/royal" className="hover:text-[var(--color-gold)] transition-colors">
                  Imperial Durbar Brocades
                </Link>
              </li>
              <li>
                <Link href="/collections/heirloom-gift" className="hover:text-[var(--color-gold)] transition-colors">
                  Heirloom Dynasty Treasures
                </Link>
              </li>
              <li>
                <Link href="/collections/quiet-luxury" className="hover:text-[var(--color-gold)] transition-colors">
                  The Minimalist Handspun Loom
                </Link>
              </li>
              <li>
                <Link href="/collections/sustainable-luxe" className="hover:text-[var(--color-gold)] transition-colors">
                  Eri Peace Silk & Botanical Dyes
                </Link>
              </li>
            </ul>
          </div>

          {/* Artisan & Enterprise */}
          <div>
            <h5 className="font-display text-xs font-semibold text-[var(--color-gold-light)] uppercase tracking-widest mb-4">
              Guild & Enterprise
            </h5>
            <ul className="space-y-2.5 text-xs text-[var(--color-ivory)]/80">
              <li>
                <Link href="/b2b" className="hover:text-[var(--color-gold)] transition-colors">
                  B2B Sourcing Portal
                </Link>
              </li>
              <li>
                <Link href="/onboard" className="hover:text-[var(--color-gold)] transition-colors">
                  Weaver Onboarding Wizard
                </Link>
              </li>
              <li>
                <Link href="/assistant" className="hover:text-[var(--color-gold)] transition-colors">
                  AI Brand Story Assistant
                </Link>
              </li>
              <li>
                <Link href="/visits" className="hover:text-[var(--color-gold)] transition-colors">
                  Book Loom Courtyard Visits
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-[var(--color-gold)] transition-colors">
                  Craft Education Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Regions & Guild Locations */}
          <div>
            <h5 className="font-display text-xs font-semibold text-[var(--color-gold-light)] uppercase tracking-widest mb-4">
              Weaving Guild Hubs
            </h5>
            <div className="space-y-3 text-xs text-[var(--color-ivory)]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[var(--color-gold)] shrink-0 mt-0.5" />
                <span>Sualkuchi & Kamrup Guilds, Assam</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[var(--color-gold)] shrink-0 mt-0.5" />
                <span>Varanasi Pit Loom Quarters, Uttar Pradesh</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[var(--color-gold)] shrink-0 mt-0.5" />
                <span>Kanchipuram Temple Guilds, Tamil Nadu</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Rights & Hairline */}
        <div className="pt-8 border-t border-[var(--color-gold)]/20 flex flex-col md:flex-row items-center justify-between text-[11px] text-[var(--color-ivory)]/60 gap-4">
          <p>© 2026 WeaveHeritage Lux Atelier. All rights reserved. Handcrafted in India.</p>
          <div className="flex items-center gap-6">
            <Link href="/passport/PASSPORT-AS-2026-0891" className="hover:text-[var(--color-gold)] transition-colors">
              Sample Passport QR
            </Link>
            <Link href="/checkout" className="hover:text-[var(--color-gold)] transition-colors">
              Direct Checkout
            </Link>
            <span>WCAG 2.1 AA Compliant</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
