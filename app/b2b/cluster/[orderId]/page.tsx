'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Clock, ShieldCheck, Package, Truck, Award, Radio } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { GoldLabel } from '@/components/ui/GoldLabel';
import { Button } from '@/components/ui/Button';
import { LuxuryVideoPlayer } from '@/components/ui/LuxuryVideoPlayer';

export default function ClusterFulfillmentPage({ params }: { params: { orderId: string } }) {
  const orderDetails = {
    orderId: params.orderId,
    clientName: 'Atelier Royal Paris & Tokyo',
    craftName: 'Assam Muga Silk Brocade Saree Batch',
    totalQuantity: 50,
    completedQuantity: 34,
    deadline: '2026-11-30',
    overallProgress: 68,
  };

  const weaverAllocations = [
    {
      id: 'w1',
      name: 'Biren Chandra Das',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      assignedQuantity: 15,
      completed: 12,
      status: 'quality-check' as const,
      statusText: 'Quality Check',
    },
    {
      id: 'w2',
      name: 'Meenakshi Sundaram',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
      assignedQuantity: 20,
      completed: 18,
      status: 'ready-to-ship' as const,
      statusText: 'Ready to Ship',
    },
    {
      id: 'w3',
      name: 'Gurudev Varma',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      assignedQuantity: 15,
      completed: 4,
      status: 'in-progress' as const,
      statusText: 'In Progress',
    },
  ];

  const milestones = [
    { label: 'Materials Sourced', status: 'completed' },
    { label: 'Weaving Started', status: 'completed' },
    { label: 'Quality Review', status: 'current' },
    { label: 'Packed & GI Sealed', status: 'upcoming' },
    { label: 'Shipped to Atelier', status: 'upcoming' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Breadcrumb & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-gold)]/30 pb-4">
        <div>
          <Link href="/b2b" className="flex items-center gap-1.5 text-xs text-[var(--color-taupe)] hover:text-[var(--color-wine)] uppercase font-semibold mb-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to B2B Sourcing Portal</span>
          </Link>
          <h1 className="font-display text-3xl font-bold text-[var(--color-wine)]">
            Cluster Fulfillment Dashboard
          </h1>
          <p className="text-xs text-[var(--color-taupe)] mt-0.5 font-mono">
            ORDER ID: {orderDetails.orderId} • CLIENT: {orderDetails.clientName}
          </p>
        </div>

        <Badge variant="verified">Live Production Ledger</Badge>
      </div>

      {/* 1. Large Order Summary Card with Thread-Fill Bar */}
      <div className="bg-[var(--color-wine)] text-[var(--color-ivory)] border-2 border-[var(--color-gold)] rounded-[var(--radius-card)] p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <GoldLabel>Sualkuchi Silk Cooperative Batch</GoldLabel>
            <h2 className="font-display text-2xl font-bold text-[var(--color-ivory)] mt-2">
              {orderDetails.craftName}
            </h2>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-[var(--color-gold-light)] uppercase tracking-widest block">
              Delivery Target
            </span>
            <span className="font-display font-bold text-lg text-[var(--color-gold)]">
              {orderDetails.deadline}
            </span>
          </div>
        </div>

        {/* Large Woven Capacity Thread-Fill Bar */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-[var(--color-gold-light)] uppercase tracking-wider">
              Overall Batch Completion ({orderDetails.completedQuantity} / {orderDetails.totalQuantity} Units Woven)
            </span>
            <span className="font-display font-bold text-base text-[var(--color-gold)]">
              {orderDetails.overallProgress}% Completed
            </span>
          </div>

          <div className="w-full h-5 bg-[var(--color-oxblood)] border-2 border-[var(--color-gold)]/60 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-woven-pattern bg-gradient-to-r from-[var(--color-gold-light)] via-[var(--color-gold)] to-[var(--color-gold-light)] rounded-full transition-all duration-700 shadow-md"
              style={{ width: `${orderDetails.overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* NEW: LIVE ARTISAN LOOM WEBCAM VIDEO BROADCAST STREAM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <LuxuryVideoPlayer
            src="/loom-artisan-video.mp4"
            title="Live Loom Production Stream — Sualkuchi Guild"
            subtitle="Real-time broadcast from Master Weaver Biren Das pit loom #04"
            autoPlay={true}
            loop={true}
            muted={true}
            isLiveStreamTag={true}
            className="h-[360px] sm:h-[420px]"
          />
        </div>

        <div className="lg:col-span-5 bg-[var(--color-cream)] border border-[var(--color-gold)]/30 rounded-[var(--radius-card)] p-6 space-y-4 shadow-fabric">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-wine)]">
            <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span>Verifiable Loom Video Stream</span>
          </div>

          <h3 className="font-display font-bold text-xl text-[var(--color-oxblood)]">
            Authenticity Video Audit Feed
          </h3>

          <p className="font-editorial text-sm italic text-[var(--color-charcoal)] leading-relaxed">
            Institutional buyers can monitor active shuttle passes, loom speed, and natural lighting conditions in real-time. Verified by Geographical Indication Inspectors.
          </p>

          <div className="pt-3 border-t border-[var(--color-gold)]/20 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[var(--color-taupe)] uppercase text-[10px]">Shuttle Frequency:</span>
              <span className="font-bold text-[var(--color-charcoal)]">42 passes / min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-taupe)] uppercase text-[10px]">Loom ID & Cryptographic Hash:</span>
              <span className="font-mono text-[10px] text-[var(--color-wine)] font-bold">Loom-AS-0891-V2</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Milestone Stepper Timeline */}
      <div className="bg-[var(--color-cream)] border border-[var(--color-gold)]/30 rounded-[var(--radius-card)] p-6 shadow-fabric space-y-4">
        <h3 className="font-display font-bold text-sm text-[var(--color-wine)] uppercase tracking-wider">
          Batch Production Milestone Stepper
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pt-2">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center space-y-2">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-xs ${
                  m.status === 'completed'
                    ? 'bg-[var(--color-gold)] border-[var(--color-gold-light)] text-[var(--color-wine)]'
                    : m.status === 'current'
                    ? 'bg-[var(--color-oxblood)] border-[var(--color-gold)] text-[var(--color-ivory)] ring-4 ring-[var(--color-gold)]/20'
                    : 'bg-[var(--color-ivory)] border-[var(--color-taupe)]/40 text-[var(--color-taupe)]'
                }`}
              >
                {m.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
              </div>

              <span
                className={`text-xs font-semibold ${
                  m.status === 'current'
                    ? 'text-[var(--color-oxblood)] font-bold'
                    : m.status === 'completed'
                    ? 'text-[var(--color-wine)]'
                    : 'text-[var(--color-taupe)]'
                }`}
              >
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Weaver Allocation List Table */}
      <div className="bg-[var(--color-cream)] border border-[var(--color-gold)]/30 rounded-[var(--radius-card)] p-6 shadow-fabric space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--color-gold)]/20 pb-3">
          <h3 className="font-display font-bold text-base text-[var(--color-wine)]">
            Artisan Allocation & Progress List
          </h3>
          <span className="text-xs text-[var(--color-taupe)]">3 Master Weavers Assigned</span>
        </div>

        <div className="space-y-4">
          {weaverAllocations.map((w) => {
            const pct = Math.round((w.completed / w.assignedQuantity) * 100);

            return (
              <div
                key={w.id}
                className="bg-[var(--color-ivory)] border border-[var(--color-gold)]/20 rounded p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Weaver Bio Mini */}
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[var(--color-gold)] shrink-0">
                    <Image src={w.avatar} alt={w.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-[var(--color-oxblood)]">
                      {w.name}
                    </h4>
                    <p className="text-xs text-[var(--color-taupe)]">
                      Assigned: {w.assignedQuantity} Units • Woven: {w.completed} Units
                    </p>
                  </div>
                </div>

                {/* Individual Progress Bar */}
                <div className="flex-1 max-w-xs space-y-1">
                  <div className="flex justify-between text-[11px] font-semibold text-[var(--color-charcoal)]">
                    <span>Individual Progress</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--color-gold)] rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* Custom Heritage Status Badge */}
                <div className="shrink-0">
                  <Badge variant={w.status}>{w.statusText}</Badge>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
