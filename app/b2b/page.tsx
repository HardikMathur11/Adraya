'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Building2, Filter, Layers, CheckSquare, Square, ShieldCheck, Clock, ArrowRight, X } from 'lucide-react';
import { CLUSTERS, Cluster } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GoldLabel } from '@/components/ui/GoldLabel';

export default function B2bSourcingPage() {
  const [selectedClusters, setSelectedClusters] = useState<string[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [rfqSubmitted, setRfqSubmitted] = useState(false);

  const [rfqForm, setRfqForm] = useState({
    craftType: 'Assam Muga Silk Brocade',
    quantity: '50',
    targetPrice: '120000',
    deadline: '2026-11-30',
    notes: 'Requiring certified GI tags and custom gold zari border width.',
  });

  const toggleClusterSelection = (id: string) => {
    setSelectedClusters((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRfqSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-[var(--color-wine)] text-[var(--color-ivory)] p-8 sm:p-12 rounded-[var(--radius-card)] border-2 border-[var(--color-gold)] shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-gold-light)] bg-[var(--color-oxblood)] px-3 py-1 rounded border border-[var(--color-gold)]/30">
            Institutional & Enterprise Sourcing
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-[var(--color-ivory)]">
            B2B Cluster Sourcing Portal
          </h1>
          <p className="font-editorial text-base italic text-[var(--color-ivory)]/80">
            Direct wholesale contracts with GI-certified Indian weaving cooperatives. Guaranteed capacity tracking, transparent lead times, and ethical artisan margins.
          </p>
        </div>

        {selectedClusters.length > 0 && (
          <Button
            variant="gold"
            size="lg"
            onClick={() => setShowComparisonModal(true)}
            className="shrink-0 flex items-center gap-2"
          >
            <Layers className="w-4 h-4" />
            <span>Compare Selected ({selectedClusters.length}/3)</span>
          </Button>
        )}
      </div>

      {/* Top Filter Bar */}
      <div className="bg-[var(--color-cream)] border border-[var(--color-gold)]/30 rounded-[var(--radius-card)] p-4 sm:p-6 shadow-fabric flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-wine)]">
          <Filter className="w-4 h-4 text-[var(--color-gold)]" />
          <span>Cluster Filters:</span>
        </div>

        <div className="flex flex-wrap gap-4 text-xs font-medium">
          <select className="px-3 py-2 bg-[var(--color-ivory)] border border-[var(--color-gold)]/30 rounded text-[var(--color-charcoal)] focus:outline-none">
            <option>All Craft Specialties</option>
            <option>Assam Muga & Eri Silk</option>
            <option>Varanasi Kadwa Brocades</option>
            <option>Kanchipuram Temple Silk</option>
          </select>

          <select className="px-3 py-2 bg-[var(--color-ivory)] border border-[var(--color-gold)]/30 rounded text-[var(--color-charcoal)] focus:outline-none">
            <option>MOQ: Any Quantity</option>
            <option>MOQ: &lt; 10 Pieces</option>
            <option>MOQ: 10 - 50 Pieces</option>
          </select>

          <select className="px-3 py-2 bg-[var(--color-ivory)] border border-[var(--color-gold)]/30 rounded text-[var(--color-charcoal)] focus:outline-none">
            <option>Lead Time: &lt; 30 Days</option>
            <option>Lead Time: &lt; 60 Days</option>
          </select>
        </div>
      </div>

      {/* Main Layout (Cluster Grid left, Bulk RFQ Panel right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Cluster Directory Grid */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--color-gold)]/20 pb-3">
            <h3 className="font-display font-bold text-lg text-[var(--color-wine)]">
              Verified Artisan Cooperatives ({CLUSTERS.length})
            </h3>
            <span className="text-xs text-[var(--color-taupe)]">Select up to 3 to compare</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CLUSTERS.map((cluster) => {
              const isSelected = selectedClusters.includes(cluster.id);

              return (
                <div
                  key={cluster.id}
                  className={`bg-[var(--color-cream)] border-2 rounded-[var(--radius-card)] overflow-hidden shadow-fabric transition-all flex flex-col justify-between p-6 space-y-4 ${
                    isSelected
                      ? 'border-[var(--color-gold)] bg-[var(--color-gold-light)]/10'
                      : 'border-[var(--color-gold)]/30 hover:border-[var(--color-gold)]/60'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <button
                      onClick={() => toggleClusterSelection(cluster.id)}
                      className="flex items-center gap-2 text-xs font-semibold text-[var(--color-wine)] hover:text-[var(--color-oxblood)] cursor-pointer"
                    >
                      {isSelected ? (
                        <CheckSquare className="w-5 h-5 text-[var(--color-gold)] fill-[var(--color-wine)]" />
                      ) : (
                        <Square className="w-5 h-5 text-[var(--color-taupe)]" />
                      )}
                      <span>{isSelected ? 'Selected for Compare' : 'Compare Cluster'}</span>
                    </button>
                    <Badge variant="verified">{cluster.weaversCount} Artisans</Badge>
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-lg text-[var(--color-oxblood)]">
                      {cluster.name}
                    </h4>
                    <p className="text-xs text-[var(--color-taupe)] mt-0.5">{cluster.region}</p>
                    <p className="text-xs font-semibold text-[var(--color-charcoal)] mt-2">
                      Specialty: {cluster.craftSpecialty}
                    </p>
                  </div>

                  {/* Woven Capacity Indicator Bar */}
                  <div className="space-y-1.5 pt-2 border-t border-[var(--color-gold)]/20">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-[var(--color-wine)] uppercase text-[10px] tracking-wider">
                        Active Loom Capacity
                      </span>
                      <span className="font-bold text-[var(--color-oxblood)]">
                        {cluster.capacityPercentage}% Booked
                      </span>
                    </div>
                    
                    {/* Woven Bar */}
                    <div className="w-full h-3 bg-[var(--color-ivory)] border border-[var(--color-gold)]/40 rounded-full overflow-hidden p-0.5">
                      <div
                        className="h-full bg-woven-pattern bg-[var(--color-gold)] rounded-full transition-all duration-500"
                        style={{ width: `${cluster.capacityPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 text-[var(--color-charcoal)]">
                    <div>
                      <span className="text-[10px] text-[var(--color-taupe)] uppercase block font-semibold">
                        MOQ
                      </span>
                      <span className="font-bold">{cluster.moq} Units</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--color-taupe)] uppercase block font-semibold">
                        Avg Lead Time
                      </span>
                      <span className="font-bold">{cluster.avgLeadTimeDays} Days</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Link href={`/b2b/cluster/ORDER-2026-901`} className="flex-1">
                      <Button variant="secondary" size="sm" className="w-full text-[10px]">
                        Track Fulfillment
                      </Button>
                    </Link>
                    <Button variant="primary" size="sm" className="flex-1 text-[10px]">
                      Request Sample
                    </Button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Persistent Bulk Order Request Panel */}
        <div className="lg:col-span-4 bg-[var(--color-wine)] text-[var(--color-ivory)] border-2 border-[var(--color-gold)] rounded-[var(--radius-card)] shadow-2xl p-6 space-y-6">
          <div className="border-b border-[var(--color-gold)]/30 pb-3">
            <span className="text-[10px] uppercase tracking-widest text-[var(--color-gold-light)] font-semibold block">
              Direct RFQ Submission
            </span>
            <h3 className="font-display font-bold text-lg text-[var(--color-ivory)]">
              Bulk Order Request Panel
            </h3>
          </div>

          {rfqSubmitted ? (
            <div className="p-6 bg-[var(--color-oxblood)] border border-[var(--color-gold)] rounded text-center space-y-3">
              <ShieldCheck className="w-12 h-12 text-[var(--color-gold)] mx-auto" />
              <h4 className="font-display font-bold text-base text-[var(--color-ivory)]">
                RFQ Submitted to Guild Council
              </h4>
              <p className="text-xs text-[var(--color-ivory)]/80">
                Your request has been broadcasted to verified cluster leaders. Expect formal quotation within 24 hours.
              </p>
              <Button variant="gold" size="sm" onClick={() => setRfqSubmitted(false)}>
                Submit Another Request
              </Button>
            </div>
          ) : (
            <form onSubmit={handleRfqSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-[var(--color-gold-light)] mb-1">
                  Craft / Weave Type
                </label>
                <input
                  type="text"
                  value={rfqForm.craftType}
                  onChange={(e) => setRfqForm({ ...rfqForm, craftType: e.target.value })}
                  className="w-full px-3 py-2 bg-[var(--color-oxblood)] border border-[var(--color-gold)]/40 rounded text-[var(--color-ivory)] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-[var(--color-gold-light)] mb-1">
                    Quantity (Units)
                  </label>
                  <input
                    type="number"
                    value={rfqForm.quantity}
                    onChange={(e) => setRfqForm({ ...rfqForm, quantity: e.target.value })}
                    className="w-full px-3 py-2 bg-[var(--color-oxblood)] border border-[var(--color-gold)]/40 rounded text-[var(--color-ivory)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-[var(--color-gold-light)] mb-1">
                    Target Unit Price (₹)
                  </label>
                  <input
                    type="text"
                    value={rfqForm.targetPrice}
                    onChange={(e) => setRfqForm({ ...rfqForm, targetPrice: e.target.value })}
                    className="w-full px-3 py-2 bg-[var(--color-oxblood)] border border-[var(--color-gold)]/40 rounded text-[var(--color-ivory)] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-[var(--color-gold-light)] mb-1">
                  Target Deadline
                </label>
                <input
                  type="date"
                  value={rfqForm.deadline}
                  onChange={(e) => setRfqForm({ ...rfqForm, deadline: e.target.value })}
                  className="w-full px-3 py-2 bg-[var(--color-oxblood)] border border-[var(--color-gold)]/40 rounded text-[var(--color-ivory)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-[var(--color-gold-light)] mb-1">
                  Custom Requirements / Notes
                </label>
                <textarea
                  rows={3}
                  value={rfqForm.notes}
                  onChange={(e) => setRfqForm({ ...rfqForm, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-[var(--color-oxblood)] border border-[var(--color-gold)]/40 rounded text-[var(--color-ivory)] focus:outline-none"
                />
              </div>

              <Button variant="gold" size="lg" type="submit" className="w-full">
                Submit Wholesale RFQ
              </Button>
            </form>
          )}

        </div>

      </div>

      {/* Side-by-Side Cluster Comparison Modal */}
      {showComparisonModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[var(--color-cream)] border-2 border-[var(--color-gold)] rounded-[var(--radius-card)] p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto space-y-6 relative shadow-2xl">
            <button
              onClick={() => setShowComparisonModal(false)}
              className="absolute top-4 right-4 text-[var(--color-wine)] hover:text-red-700 p-2"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="border-b border-[var(--color-gold)]/30 pb-3">
              <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[var(--color-oxblood)] font-bold">
                INSTITUTIONAL SIDE-BY-SIDE EVALUATION
              </span>
              <h3 className="font-display font-bold text-2xl text-[var(--color-wine)]">
                Cluster Sourcing Comparison Table
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-[var(--color-gold)]/30 text-xs">
                <thead>
                  <tr className="bg-[var(--color-wine)] text-[var(--color-ivory)]">
                    <th className="p-3 border border-[var(--color-gold)]/30">Feature / Metric</th>
                    {selectedClusters.map((id) => {
                      const cl = CLUSTERS.find((c) => c.id === id)!;
                      return (
                        <th key={id} className="p-3 border border-[var(--color-gold)]/30 font-display font-bold text-sm">
                          {cl.name}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-gold)]/20">
                  <tr>
                    <td className="p-3 font-semibold bg-[var(--color-ivory)]">Weaving Region</td>
                    {selectedClusters.map((id) => (
                      <td key={id} className="p-3">{CLUSTERS.find((c) => c.id === id)?.region}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold bg-[var(--color-ivory)]">Minimum Order (MOQ)</td>
                    {selectedClusters.map((id) => (
                      <td key={id} className="p-3 font-bold">{CLUSTERS.find((c) => c.id === id)?.moq} Units</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold bg-[var(--color-ivory)]">Avg Lead Time</td>
                    {selectedClusters.map((id) => (
                      <td key={id} className="p-3">{CLUSTERS.find((c) => c.id === id)?.avgLeadTimeDays} Days</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold bg-[var(--color-ivory)]">Active Capacity</td>
                    {selectedClusters.map((id) => (
                      <td key={id} className="p-3 font-bold text-[var(--color-oxblood)]">
                        {CLUSTERS.find((c) => c.id === id)?.capacityPercentage}% Booked
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold bg-[var(--color-ivory)] font-sans">Certifications</td>
                    {selectedClusters.map((id) => (
                      <td key={id} className="p-3">
                        {CLUSTERS.find((c) => c.id === id)?.certifications.join(', ')}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-right">
              <Button variant="gold" size="md" onClick={() => setShowComparisonModal(false)}>
                Close Comparison
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
