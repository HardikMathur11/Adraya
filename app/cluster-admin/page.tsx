'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Users, UserPlus, BookOpen, Layers, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { CLUSTERS, WEAVERS, COURSES, Weaver } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GoldLabel } from '@/components/ui/GoldLabel';
import { useSessionStore } from '@/store/useSessionStore';

export default function ClusterAdminPage() {
  const { activeRole } = useSessionStore();
  const cluster = CLUSTERS[0]; // Sualkuchi Golden Silk Cluster
  const [weaversList, setWeaversList] = useState<Weaver[]>(WEAVERS);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberSpecialty, setNewMemberSpecialty] = useState('');
  const [assignedCourseMsg, setAssignedCourseMsg] = useState('');

  const handleAddMemberOnBehalf = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName) return;

    const newWeaver: Weaver = {
      id: `weaver-${Date.now()}`,
      name: newMemberName,
      village: 'Sualkuchi',
      region: 'Assam',
      specialty: newMemberSpecialty || 'Muga Silk Weave',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      heroImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1400',
      biography: 'Newly registered artisan under Sualkuchi Cooperative Guild.',
      yearsWeaving: 15,
      piecesCreated: 240,
      clusterSize: 24,
      clusterId: cluster.id,
      verificationStatus: 'verified',
    };

    setWeaversList((prev) => [...prev, newWeaver]);
    setNewMemberName('');
    setNewMemberSpecialty('');
    setShowAddMemberModal(false);
  };

  const handleAssignCourse = (courseTitle: string, weaverName: string) => {
    setAssignedCourseMsg(`Assigned "${courseTitle}" to ${weaverName}`);
    setTimeout(() => setAssignedCourseMsg(''), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="bg-[var(--color-wine)] text-[var(--color-ivory)] p-8 rounded-[var(--radius-card)] border-2 border-[var(--color-gold)] shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-gold-light)] bg-[var(--color-oxblood)] px-3 py-1 rounded border border-[var(--color-gold)]/30">
            Cooperative Guild Operations
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-ivory)] mt-2">
            Cluster Admin Console ({cluster.name})
          </h1>
          <p className="font-editorial text-sm italic text-[var(--color-ivory)]/80 mt-1">
            Manage cluster artisan allocations, onboard weavers on their behalf, and assign craft education modules.
          </p>
        </div>

        <Button variant="gold" size="md" onClick={() => setShowAddMemberModal(true)}>
          <UserPlus className="w-4 h-4 mr-2" />
          Onboard Member on Behalf
        </Button>
      </div>

      {assignedCourseMsg && (
        <div className="p-4 bg-[var(--color-emerald)]/20 border border-[var(--color-emerald)] text-[var(--color-emerald)] rounded text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>{assignedCourseMsg}</span>
        </div>
      )}

      {/* Cluster Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 bg-[var(--color-cream)] border border-[var(--color-gold)]/30 rounded p-6 shadow-fabric text-center text-xs">
        <div>
          <span className="text-[10px] text-[var(--color-taupe)] uppercase tracking-widest block font-semibold">
            Active Artisans
          </span>
          <span className="font-display font-bold text-2xl text-[var(--color-oxblood)]">
            {cluster.weaversCount}
          </span>
        </div>

        <div>
          <span className="text-[10px] text-[var(--color-taupe)] uppercase tracking-widest block font-semibold">
            Active Loom Capacity
          </span>
          <span className="font-display font-bold text-2xl text-[var(--color-wine)]">
            {cluster.capacityPercentage}% Booked
          </span>
        </div>

        <div>
          <span className="text-[10px] text-[var(--color-taupe)] uppercase tracking-widest block font-semibold">
            Avg Batch Lead Time
          </span>
          <span className="font-display font-bold text-2xl text-[var(--color-emerald)]">
            {cluster.avgLeadTimeDays} Days
          </span>
        </div>

        <div>
          <span className="text-[10px] text-[var(--color-taupe)] uppercase tracking-widest block font-semibold">
            Minimum Order (MOQ)
          </span>
          <span className="font-display font-bold text-2xl text-[var(--color-charcoal)]">
            {cluster.moq} Units
          </span>
        </div>
      </div>

      {/* Main Grid (Member List left, Course Assignment right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Member Weavers & Order Allocations */}
        <div className="lg:col-span-8 bg-[var(--color-cream)] border border-[var(--color-gold)]/30 rounded p-6 shadow-fabric space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--color-gold)]/20 pb-3">
            <h3 className="font-display font-bold text-lg text-[var(--color-wine)]">
              Cooperative Artisan Members ({weaversList.length})
            </h3>
            <Link href="/b2b/cluster/ORDER-2026-901" className="text-xs font-bold text-[var(--color-oxblood)] hover:underline">
              View Active Bulk Batch Allocations →
            </Link>
          </div>

          <div className="space-y-4">
            {weaversList.map((w) => (
              <div
                key={w.id}
                className="p-4 bg-[var(--color-ivory)] border border-[var(--color-gold)]/20 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-[var(--color-gold)] bg-[var(--color-oxblood)] text-[var(--color-gold)] font-bold font-display flex items-center justify-center">
                    {w.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-[var(--color-oxblood)]">
                      {w.name}
                    </h4>
                    <p className="text-xs text-[var(--color-taupe)]">
                      {w.specialty} • {w.yearsWeaving} Years Experience
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="verified">Verified Member</Badge>
                  <button
                    onClick={() => handleAssignCourse(COURSES[2].title, w.name)}
                    className="px-3 py-1 bg-[var(--color-wine)] text-[var(--color-gold-light)] text-xs font-semibold rounded hover:bg-[var(--color-oxblood)] cursor-pointer"
                  >
                    Assign Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Cluster Course & Learning Paths */}
        <div className="lg:col-span-4 bg-[var(--color-wine)] text-[var(--color-ivory)] border-2 border-[var(--color-gold)] rounded p-6 shadow-2xl space-y-4">
          <div className="border-b border-[var(--color-gold)]/30 pb-3">
            <span className="text-[10px] uppercase tracking-widest text-[var(--color-gold-light)] font-semibold block">
              Capacity Building
            </span>
            <h3 className="font-display font-bold text-lg text-[var(--color-ivory)]">
              Cluster Learning Paths
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            {COURSES.map((c) => (
              <div key={c.id} className="p-3 bg-[var(--color-oxblood)] border border-[var(--color-gold)]/30 rounded space-y-1">
                <span className="text-[10px] text-[var(--color-gold-light)] uppercase font-semibold">{c.category}</span>
                <h5 className="font-display font-bold text-sm text-[var(--color-ivory)]">{c.title}</h5>
                <p className="text-[11px] text-[var(--color-ivory)]/70">{c.estimatedTime} • {c.languages.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Onboard Member Modal */}
      {showAddMemberModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[var(--color-cream)] border-2 border-[var(--color-gold)] rounded p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-display font-bold text-lg text-[var(--color-wine)]">
              Onboard Member on Behalf (Sualkuchi Guild)
            </h3>

            <form onSubmit={handleAddMemberOnBehalf} className="space-y-3 text-xs">
              <div>
                <label className="block uppercase font-semibold text-[var(--color-wine)] mb-1">
                  Artisan Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lakhi Kanta Das"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--color-ivory)] border border-[var(--color-gold)]/40 rounded focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-[var(--color-wine)] mb-1">
                  Craft Specialty *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Eri Ahimsa Silk Weaving"
                  value={newMemberSpecialty}
                  onChange={(e) => setNewMemberSpecialty(e.target.value)}
                  className="w-full px-3 py-2 bg-[var(--color-ivory)] border border-[var(--color-gold)]/40 rounded focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="secondary" size="sm" type="button" onClick={() => setShowAddMemberModal(false)}>
                  Cancel
                </Button>
                <Button variant="gold" size="sm" type="submit">
                  Confirm Registration
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
