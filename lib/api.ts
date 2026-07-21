import { PRODUCTS, WEAVERS, CLUSTERS, Product, UserRole } from './data';

export async function fetchCatalog(filters?: { mood?: string; region?: string }): Promise<Product[]> {
  await new Promise((res) => setTimeout(res, 150));
  let result = [...PRODUCTS];

  if (filters?.mood && filters.mood !== 'all') {
    result = result.filter((p) => p.mood === filters.mood);
  }
  if (filters?.region && filters.region !== 'all') {
    result = result.filter((p) => p.region.toLowerCase().includes(filters.region!.toLowerCase()));
  }
  return result;
}

export async function fetchRoleAnalytics(role: UserRole) {
  await new Promise((res) => setTimeout(res, 150));

  if (role === 'weaver') {
    return {
      totalEarnings: 1517000,
      weaverShareAvg: '82%',
      completedOrders: 12,
      hoursInvestedTotal: 2880,
      activeListingsCount: 3,
      clusterCapacityPct: 78,
    };
  }

  // Customer Role Analytics / Transparency View
  return {
    platformGmv: '₹4,85,00,000',
    totalArtisansBenefitted: 1270,
    avgDirectPayoutPct: '83.4%',
    verifiedGiPassportsIssued: 890,
  };
}

// Moderation & Passport Exports for Weaver Guild Management
export async function fetchModerationQueue() {
  await new Promise((res) => setTimeout(res, 100));
  return [
    {
      id: 'mod-1',
      entityType: 'product_story' as const,
      entityId: 'prod-muga-golden-heritage',
      title: 'The Sovereign Golden Muga Silk Mekhela Sador',
      weaverName: 'Biren Chandra Das',
      generatedStory: 'Handwoven in Sualkuchi over 240 hours. Muga silk naturally improves in golden luster with every wash.',
      suggestedPrice: 185000,
      weaverSharePct: 82,
      status: 'approved' as const,
      submittedAt: '2026-07-20 14:30',
      aiConfidenceScore: 98,
    },
  ];
}

export async function approveModerationItem(id: string, adminName: string) {
  await new Promise((res) => setTimeout(res, 100));
  return { success: true };
}

export async function fetchPassports() {
  await new Promise((res) => setTimeout(res, 100));
  return [
    {
      id: 'pass-01',
      qrId: 'PASSPORT-AS-2026-0891',
      productId: 'prod-muga-golden-heritage',
      productTitle: 'The Sovereign Golden Muga Silk Mekhela Sador',
      weaverId: 'master-biren-das',
      weaverName: 'Biren Chandra Das',
      village: 'Sualkuchi',
      material: '100% Wild Golden Muga Silk & 24K Silver-Gold Zari',
      weavingHours: 240,
      storySnapshot: 'An extraordinary masterpiece handwoven over 240 hours in Sualkuchi, Assam.',
      ledgerRef: '0x891A...B4E9 (Polygon GI Registry)',
      issuedAt: '2026-07-15 10:00',
      issuedByAdminId: 'u-admin',
      status: 'active' as const,
      versions: [
        {
          versionNumber: 1,
          snapshotJson: '{"material": "Wild Muga Silk", "hours": 240}',
          createdAt: '2026-07-15 10:00',
          createdBy: 'Biren Chandra Das (Master Weaver)',
          reason: 'Initial GI Certificate Issuance',
        },
      ],
    },
  ];
}

export async function issuePassport(productId: string, adminName: string) {
  await new Promise((res) => setTimeout(res, 100));
  return {
    success: true,
    passport: {
      id: `pass-${Date.now()}`,
      qrId: `PASSPORT-IND-${Date.now().toString().slice(-4)}`,
      productId,
      productTitle: 'Heritage Handloom Weave',
      weaverId: 'master-biren-das',
      weaverName: adminName,
      village: 'Sualkuchi',
      material: 'Mulberry Silk',
      weavingHours: 200,
      storySnapshot: 'Signed artisan masterpiece',
      ledgerRef: '0x...GI',
      issuedAt: new Date().toISOString(),
      issuedByAdminId: 'u-admin',
      status: 'active' as const,
      versions: [],
    },
  };
}

export async function revokePassport(qrId: string, adminName: string, reason: string) {
  await new Promise((res) => setTimeout(res, 100));
  return { success: true };
}

export async function fetchAuditLogs() {
  await new Promise((res) => setTimeout(res, 100));
  return [
    {
      id: 'aud-101',
      actorName: 'Biren Chandra Das',
      actorRole: 'weaver' as const,
      action: 'PASSPORT_ISSUED',
      targetEntity: 'PASSPORT-AS-2026-0891',
      details: 'Signed GI authenticity certificate for Muga Silk Mekhela Sador.',
      timestamp: '2026-07-21 12:30:00',
    },
  ];
}
