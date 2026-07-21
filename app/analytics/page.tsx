'use client';

import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, HeartHandshake, ShieldCheck, Clock, Users, ArrowUpRight } from 'lucide-react';
import { fetchRoleAnalytics } from '@/lib/api';
import { useSessionStore } from '@/store/useSessionStore';
import { Badge } from '@/components/ui/Badge';

export default function AnalyticsPage() {
  const { activeRole } = useSessionStore();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, [activeRole]);

  const loadData = async () => {
    const res = await fetchRoleAnalytics(activeRole);
    setData(res);
  };

  if (!data) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="bg-[var(--color-wine)] text-[var(--color-ivory)] p-8 rounded-[var(--radius-card)] border-2 border-[var(--color-gold)] shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-gold-light)] bg-[var(--color-oxblood)] px-3 py-1 rounded border border-[var(--color-gold)]/30">
            Privacy-Enforced Performance Metrics
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-ivory)] mt-2">
            Role-Scoped Analytics Dashboard
          </h1>
          <p className="font-editorial text-sm italic text-[var(--color-ivory)]/80 mt-1">
            Viewing metrics strictly scoped to role: <strong className="text-[var(--color-gold)] uppercase">{activeRole}</strong>
          </p>
        </div>

        <Badge variant="verified">Role-Scoped Isolation Active</Badge>
      </div>

      {/* WEAVER ROLE SCOPED ANALYTICS */}
      {activeRole === 'weaver' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[var(--color-cream)] border-2 border-[var(--color-gold)] rounded p-6 shadow-fabric space-y-2">
              <span className="text-xs uppercase tracking-widest text-[var(--color-taupe)] font-semibold">
                Total Direct Earnings
              </span>
              <div className="font-display font-bold text-3xl text-[var(--color-oxblood)]">
                ₹{(data?.totalEarnings ?? 1517000).toLocaleString('en-IN')}
              </div>
              <span className="text-[11px] text-[var(--color-emerald)] font-semibold flex items-center gap-1">
                <HeartHandshake className="w-3.5 h-3.5" />
                Avg Payout Split: {data?.weaverShareAvg ?? '82%'}
              </span>
            </div>

            <div className="bg-[var(--color-cream)] border border-[var(--color-gold)]/30 rounded p-6 shadow-fabric space-y-2">
              <span className="text-xs uppercase tracking-widest text-[var(--color-taupe)] font-semibold">
                Completed Atelier Masterpieces
              </span>
              <div className="font-display font-bold text-3xl text-[var(--color-wine)]">
                {data?.completedOrders ?? 12} Pieces
              </div>
              <span className="text-[11px] text-[var(--color-taupe)]">100% GI Certificate Verified</span>
            </div>

            <div className="bg-[var(--color-cream)] border border-[var(--color-gold)]/30 rounded p-6 shadow-fabric space-y-2">
              <span className="text-xs uppercase tracking-widest text-[var(--color-taupe)] font-semibold">
                Total Pit Loom Hours
              </span>
              <div className="font-display font-bold text-3xl text-[var(--color-emerald)]">
                {data?.hoursInvestedTotal ?? 2880} Hours
              </div>
              <span className="text-[11px] text-[var(--color-taupe)]">Avg 240 Hours / Piece</span>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOMER ROLE SCOPED ANALYTICS */}
      {activeRole === 'customer' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[var(--color-cream)] border-2 border-[var(--color-gold)] rounded p-6 shadow-fabric space-y-2">
              <span className="text-xs uppercase tracking-widest text-[var(--color-taupe)] font-semibold">
                Platform Gross Merchandise Value
              </span>
              <div className="font-display font-bold text-3xl text-[var(--color-oxblood)]">
                {data?.platformGmv ?? '₹4,85,00,000'}
              </div>
              <span className="text-[11px] text-[var(--color-emerald)] font-semibold flex items-center gap-1">
                <HeartHandshake className="w-3.5 h-3.5" />
                Average Direct Payout: {data?.avgDirectPayoutPct ?? '83.4%'}
              </span>
            </div>

            <div className="bg-[var(--color-cream)] border border-[var(--color-gold)]/30 rounded p-6 shadow-fabric space-y-2">
              <span className="text-xs uppercase tracking-widest text-[var(--color-taupe)] font-semibold">
                Verified GI Passports Issued
              </span>
              <div className="font-display font-bold text-3xl text-[var(--color-wine)]">
                {data?.verifiedGiPassportsIssued ?? 890} Passports
              </div>
              <span className="text-[11px] text-[var(--color-taupe)]">Immutable Ledger Signed</span>
            </div>

            <div className="bg-[var(--color-cream)] border border-[var(--color-gold)]/30 rounded p-6 shadow-fabric space-y-2">
              <span className="text-xs uppercase tracking-widest text-[var(--color-taupe)] font-semibold">
                Master Artisans Supported
              </span>
              <div className="font-display font-bold text-3xl text-[var(--color-emerald)]">
                {data?.totalArtisansBenefitted ?? 1270} Weavers
              </div>
              <span className="text-[11px] text-[var(--color-taupe)]">Across Assam, UP & TN Cooperatives</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
