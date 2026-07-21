import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Globe, UserCheck, UserPlus, Sparkles, BookOpen, Layers } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useSessionStore, LanguageCode } from '../../store/useSessionStore';

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
    <header className="sticky top-0 z-40 bg-[#3F0F17] text-[#F7F1E6] border-b border-[#C9A227]/30 shadow-md">
      
      {/* Top 2-Role Mode Switcher Bar */}
      <div className="bg-[#6B1E28] text-[#E8D8A8] px-4 py-1.5 border-b border-[#C9A227]/20 text-[11px] flex items-center justify-between">
        
        {/* Role Switcher: Customer vs Weaver */}
        <div className="flex items-center gap-3">
          <span className="uppercase tracking-widest font-semibold text-[10px] text-[#C9A227] flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5 text-[#C9A227]" /> Active View:
          </span>

          <div className="flex bg-[#3F0F17] p-0.5 rounded border border-[#C9A227]/40">
            <button
              onClick={() => setActiveRole('customer')}
              className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                activeRole === 'customer'
                  ? 'bg-[#C9A227] text-[#3F0F17] shadow'
                  : 'text-[#F7F1E6] hover:text-[#C9A227]'
              }`}
            >
              Customer Storefront
            </button>
            <button
              onClick={() => setActiveRole('weaver')}
              className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                activeRole === 'weaver'
                  ? 'bg-[#C9A227] text-[#3F0F17] shadow'
                  : 'text-[#F7F1E6] hover:text-[#C9A227]'
              }`}
            >
              Weaver Workspace
            </button>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <span className="text-[10px] font-mono text-[#E8D8A8]">
            {activeRole === 'customer' ? '✨ Browsing Luxury Atelier' : '🛠️ Artisan Workspace Active'}
          </span>
        </div>

      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group relative z-10">
            <div className="w-10 h-10 rounded-full border border-[#C9A227] flex items-center justify-center bg-[#6B1E28] group-hover:scale-105 transition-transform duration-300">
              <span className="font-display font-bold text-[#C9A227] text-xl">A</span>
            </div>
            <div>
              <span className="font-display text-xl sm:text-2xl font-semibold tracking-wider text-[#F7F1E6] group-hover:text-[#C9A227] transition-colors">
                ADRAYA
              </span>
              <span className="block text-[10px] font-sans tracking-[0.3em] uppercase text-[#E8D8A8] opacity-90">
                INDIAN HERITAGE ATELIER
              </span>
            </div>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium tracking-widest uppercase relative z-10">
            {activeRole === 'customer' ? (
              <>
                <Link to="/" className="text-[#F7F1E6]/90 hover:text-[#C9A227] py-1">
                  Atelier
                </Link>
                <Link to="/moods" className="text-[#E8D8A8] hover:text-[#C9A227] py-1 font-bold">
                  Shop by Mood
                </Link>
                <Link to="/weavers" className="text-[#E8D8A8] hover:text-[#C9A227] py-1 font-bold">
                  Connect Weavers
                </Link>
                <Link to="/b2b" className="text-[#E8D8A8] hover:text-[#C9A227] py-1 font-bold">
                  B2B Wholesale
                </Link>
                <Link to="/visits" className="text-[#F7F1E6]/90 hover:text-[#C9A227] py-1">
                  Loom Visits
                </Link>
                <Link to="/account/orders" className="text-[#F7F1E6]/90 hover:text-[#C9A227] py-1">
                  My Orders
                </Link>
              </>
            ) : (
              /* WEAVER NAV LINKS */
              <>
                <Link to="/weaver-dashboard" className="text-[#F7F1E6]/90 hover:text-[#C9A227] py-1">
                  Dashboard
                </Link>
                <Link to="/onboard" className="text-[#E8D8A8] hover:text-[#C9A227] py-1 flex items-center gap-1">
                  <UserPlus className="w-3.5 h-3.5" /> Onboarding
                </Link>
                <Link to="/weaver-dashboard/products/new" className="text-[#E8D8A8] hover:text-[#C9A227] py-1 flex items-center gap-1">
                  + New Listing
                </Link>
                <Link to="/assistant" className="text-[#E8D8A8] hover:text-[#C9A227] py-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" /> AI Assistant
                </Link>
                <Link to="/learn" className="text-[#F7F1E6]/90 hover:text-[#C9A227] py-1 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> Learn
                </Link>
              </>
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 relative z-10">
            
            {/* Language Toggle */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#E8D8A8] border border-[#C9A227]/30 rounded-full hover:border-[#C9A227] transition-colors cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>{currentLanguage.toUpperCase()}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-[#3F0F17] border border-[#C9A227]/40 rounded-md shadow-2xl py-2 z-50">
                  <div className="px-3 py-1 text-[10px] font-sans uppercase tracking-widest text-[#E8D8A8] border-b border-[#C9A227]/20 mb-1">
                    Select Language
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between ${
                        currentLanguage === lang.code
                          ? 'text-[#C9A227] font-bold bg-[#6B1E28]'
                          : 'text-[#F7F1E6] hover:bg-[#6B1E28]/60'
                      }`}
                    >
                      {lang.label}
                      {currentLanguage === lang.code && <span className="text-[#C9A227]">•</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Button */}
            {activeRole === 'customer' && (
              <button
                onClick={openCart}
                className="relative p-2 text-[#F7F1E6] hover:text-[#C9A227] transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-6 h-6 stroke-[1.25]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C9A227] text-[#3F0F17] font-bold text-[10px] flex items-center justify-center border border-[#3F0F17]">
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
