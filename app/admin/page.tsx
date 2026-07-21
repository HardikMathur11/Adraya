'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  CheckCircle,
  XCircle,
  QrCode,
  Award,
  History,
  FileText,
  AlertTriangle,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import {
  fetchModerationQueue,
  approveModerationItem,
  fetchPassports,
  issuePassport,
  revokePassport,
  fetchAuditLogs,
} from '@/lib/api';
import { ModerationItem, PassportRecord, AuditLog, PRODUCTS } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GoldLabel } from '@/components/ui/GoldLabel';
import { useSessionStore } from '@/store/useSessionStore';

export default function PlatformAdminPage() {
  const { activeRole } = useSessionStore();
  const [moderationItems, setModerationItems] = useState<ModerationItem[]>([]);
  const [passports, setPassports] = useState<PassportRecord[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [activeTab, setActiveTab] = useState<'moderation' | 'passports' | 'audit'>('moderation');
  const [revokeReason, setRevokeReason] = useState<string>('');
  const [selectedPassportQr, setSelectedPassportQr] = useState<string | null>(null);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    const queue = await fetchModerationQueue();
    const passList = await fetchPassports();
    const logs = await fetchAuditLogs();
    setModerationItems(queue);
    setPassports(passList);
    setAuditLogs(logs);
  };

  const handleApproveModeration = async (id: string) => {
    await approveModerationItem(id, 'Aarya Sen (Ops Lead)');
    loadAdminData();
  };

  const handleIssueNewPassport = async (productId: string) => {
    await issuePassport(productId, 'Aarya Sen (Ops Lead)');
    loadAdminData();
  };

  const handleRevokePassport = async () => {
    if (selectedPassportQr && revokeReason) {
      await revokePassport(selectedPassportQr, 'Aarya Sen (Ops Lead)', revokeReason);
      setSelectedPassportQr(null);
      setRevokeReason('');
      loadAdminData();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="bg-[var(--color-wine)] text-[var(--color-ivory)] p-8 rounded-[var(--radius-card)] border-2 border-[var(--color-gold)] shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-gold-light)] bg-[var(--color-oxblood)] px-3 py-1 rounded border border-[var(--color-gold)]/30">
            Platform Operations & Quality Oversight
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--color-ivory)] mt-2">
            Platform Admin Operations Console
          </h1>
          <p className="font-editorial text-sm italic text-[var(--color-ivory)]/80 mt-1">
            Moderate AI-generated provenance claims, issue immutable GI passports, and audit platform direct-payout splits.
          </p>
        </div>

        <Badge variant="verified">Super Admin Access</Badge>
      </div>

      {/* Role Notice Warning if not in Weaver Mode */}
      {activeRole !== 'weaver' && (
        <div className="p-4 bg-amber-950/80 border border-amber-500 rounded text-amber-200 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span>
              You are currently viewing this workspace under simulated role: <strong>{activeRole}</strong>. Switch role to <strong>Weaver & Guild Portal</strong> in the top header bar to unlock full artisan controls.
            </span>
          </div>
        </div>
      )}

      {/* Admin Sub-Tabs */}
      <div className="flex gap-2 border-b border-[var(--color-gold)]/30 pb-3 font-display font-semibold text-xs uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('moderation')}
          className={`px-4 py-2 rounded transition-colors ${
            activeTab === 'moderation'
              ? 'bg-[var(--color-wine)] text-[var(--color-gold-light)] font-bold shadow'
              : 'bg-[var(--color-cream)] text-[var(--color-charcoal)] hover:bg-[var(--color-gold-light)]/20'
          }`}
        >
          AI Moderation Queue ({moderationItems.filter((i) => i.status === 'pending').length} Pending)
        </button>

        <button
          onClick={() => setActiveTab('passports')}
          className={`px-4 py-2 rounded transition-colors ${
            activeTab === 'passports'
              ? 'bg-[var(--color-wine)] text-[var(--color-gold-light)] font-bold shadow'
              : 'bg-[var(--color-cream)] text-[var(--color-charcoal)] hover:bg-[var(--color-gold-light)]/20'
          }`}
        >
          GI Passport Registry ({passports.length})
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded transition-colors ${
            activeTab === 'audit'
              ? 'bg-[var(--color-wine)] text-[var(--color-gold-light)] font-bold shadow'
              : 'bg-[var(--color-cream)] text-[var(--color-charcoal)] hover:bg-[var(--color-gold-light)]/20'
          }`}
        >
          System Audit Logs ({auditLogs.length})
        </button>
      </div>

      {/* TAB 1: AI CONTENT MODERATION QUEUE */}
      {activeTab === 'moderation' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center text-xs text-[var(--color-taupe)]">
            <span>Verify AI-generated product titles, price claims, and provenance text before first publication.</span>
            <button onClick={loadAdminData} className="flex items-center gap-1 text-[var(--color-wine)] font-bold hover:underline">
              <RefreshCw className="w-3.5 h-3.5" /> Refresh Queue
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {moderationItems.map((item) => (
              <div
                key={item.id}
                className={`bg-[var(--color-cream)] border-2 rounded-[var(--radius-card)] p-6 shadow-fabric space-y-4 ${
                  item.status === 'pending' ? 'border-[var(--color-gold)]' : 'border-[var(--color-taupe)]/30 opacity-70'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--color-gold)]/20 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <GoldLabel>{item.entityType.replace('_', ' ')}</GoldLabel>
                      <span className="text-xs font-bold text-[var(--color-oxblood)]">
                        AI Confidence Score: {item.aiConfidenceScore}%
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-[var(--color-wine)] mt-1">
                      {item.title}
                    </h3>
                  </div>

                  <Badge variant={item.status === 'approved' ? 'verified' : item.status === 'pending' ? 'quality-check' : 'default'}>
                    Status: {item.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="md:col-span-2">
                    <span className="text-[10px] text-[var(--color-taupe)] uppercase tracking-widest font-semibold block">
                      Generated Story Narrative
                    </span>
                    <p className="font-editorial text-sm italic text-[var(--color-charcoal)] leading-relaxed mt-1">
                      "{item.generatedStory}"
                    </p>
                  </div>

                  <div className="bg-[var(--color-ivory)] p-3 rounded border border-[var(--color-gold)]/20 space-y-2">
                    <div>
                      <span className="text-[10px] text-[var(--color-taupe)] uppercase block font-semibold">Artisan Name</span>
                      <span className="font-bold text-[var(--color-oxblood)]">{item.weaverName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--color-taupe)] uppercase block font-semibold">Target Price & Payout</span>
                      <span className="font-display font-bold text-base text-[var(--color-wine)]">
                        ₹{item.suggestedPrice.toLocaleString('en-IN')} ({item.weaverSharePct}% Direct Share)
                      </span>
                    </div>
                  </div>
                </div>

                {item.status === 'pending' && (
                  <div className="flex justify-end gap-3 pt-2 border-t border-[var(--color-gold)]/20">
                    <Button variant="secondary" size="sm">
                      Flag / Request Edit
                    </Button>
                    <Button variant="primary" size="sm" onClick={() => handleApproveModeration(item.id)}>
                      Approve & Publish to Atelier
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: GI PASSPORT REGISTRY */}
      {activeTab === 'passports' && (
        <div className="space-y-6">
          <div className="bg-[var(--color-cream)] border border-[var(--color-gold)]/30 rounded p-6 shadow-fabric space-y-4">
            <h3 className="font-display font-bold text-base text-[var(--color-wine)] uppercase tracking-wider">
              Issue New GI Authenticity Passport
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <select id="issueProductSelect" className="flex-1 px-4 py-2.5 bg-white border border-[var(--color-gold)]/40 rounded text-xs">
                {PRODUCTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} (Artisan: {p.weaverName})
                  </option>
                ))}
              </select>
              <Button
                variant="gold"
                size="md"
                onClick={() => {
                  const sel = (document.getElementById('issueProductSelect') as HTMLSelectElement).value;
                  handleIssueNewPassport(sel);
                }}
              >
                Sign & Issue Passport
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {passports.map((pass) => (
              <div
                key={pass.id}
                className="bg-[var(--color-cream)] border border-[var(--color-gold)]/30 rounded p-6 shadow-fabric space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-xs text-[var(--color-oxblood)] font-bold">
                      {pass.qrId}
                    </span>
                    <h4 className="font-display font-bold text-lg text-[var(--color-wine)]">
                      {pass.productTitle}
                    </h4>
                    <p className="text-xs text-[var(--color-taupe)]">
                      Master Weaver: {pass.weaverName} ({pass.village}) • {pass.weavingHours} Loom Hours
                    </p>
                  </div>

                  <Badge variant={pass.status === 'active' ? 'verified' : 'in-progress'}>
                    {pass.status.toUpperCase()}
                  </Badge>
                </div>

                {/* Version History Table */}
                <div className="text-xs space-y-1">
                  <span className="text-[10px] text-[var(--color-taupe)] uppercase tracking-widest block font-semibold">
                    Append-Only Version Audit History ({pass.versions.length} versions)
                  </span>
                  <div className="bg-[var(--color-ivory)] border border-[var(--color-gold)]/20 rounded p-3 space-y-2">
                    {pass.versions.map((v) => (
                      <div key={v.versionNumber} className="flex justify-between text-[11px] border-b border-[var(--color-gold)]/10 pb-1">
                        <span>v{v.versionNumber} — {v.reason}</span>
                        <span className="text-[var(--color-taupe)]">{v.createdAt} by {v.createdBy}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <Link href={`/passport/${pass.qrId}`} className="text-xs font-bold text-[var(--color-oxblood)] hover:underline">
                    View Public QR Landing Page →
                  </Link>

                  {pass.status === 'active' && (
                    <button
                      onClick={() => setSelectedPassportQr(pass.qrId)}
                      className="text-xs text-red-700 hover:underline font-semibold"
                    >
                      Revoke Passport
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Revoke Modal */}
          {selectedPassportQr && (
            <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
              <div className="bg-[var(--color-cream)] border-2 border-red-800 rounded p-6 max-w-md w-full space-y-4">
                <h3 className="font-display font-bold text-lg text-red-900">
                  Revoke GI Passport ({selectedPassportQr})
                </h3>
                <p className="text-xs text-[var(--color-charcoal)]">
                  Revoking will append an immutable revocation entry to the digital provenance record.
                </p>

                <textarea
                  rows={3}
                  placeholder="Enter reason for revocation..."
                  value={revokeReason}
                  onChange={(e) => setRevokeReason(e.target.value)}
                  className="w-full text-xs p-2 border border-red-400 rounded focus:outline-none"
                />

                <div className="flex justify-end gap-2">
                  <Button variant="secondary" size="sm" onClick={() => setSelectedPassportQr(null)}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" onClick={handleRevokePassport}>
                    Confirm Revocation
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SYSTEM AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="bg-[var(--color-cream)] border border-[var(--color-gold)]/30 rounded p-6 shadow-fabric space-y-4">
          <h3 className="font-display font-bold text-base text-[var(--color-wine)] uppercase tracking-wider">
            Platform Immutable Audit Logs
          </h3>

          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 bg-[var(--color-ivory)] border border-[var(--color-gold)]/20 rounded text-xs space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[var(--color-oxblood)]">{log.action}</span>
                  <span className="text-[10px] text-[var(--color-taupe)] font-mono">{log.timestamp}</span>
                </div>
                <p className="text-[var(--color-charcoal)]">{log.details}</p>
                <div className="text-[10px] text-[var(--color-taupe)]">
                  Actor: <strong>{log.actorName}</strong> ({log.actorRole}) • Target: {log.targetEntity}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
