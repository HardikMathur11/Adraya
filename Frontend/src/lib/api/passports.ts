import { PassportRecord } from './types';

export const MOCK_PASSPORTS: PassportRecord[] = [
  {
    id: 'pass-01',
    qrId: 'PASSPORT-PC-2026-8841',
    productId: 'p1',
    productTitle: 'Pochampally Ikat Silk Saree — Peacock Motif',
    weaverId: 'radha-devi',
    weaverName: 'Radha Devi',
    village: 'Pochampally',
    clusterName: 'Pochampally Ikat Guild',
    material: 'Pure Mulberry Silk & Botanical Dyes',
    weavingHours: 140,
    storySnapshot: 'Handwoven in Pochampally over 140 hours using double-Ikat resist-dyeing.',
    ledgerRef: '0x8841...PC2026 (Polygon GI Registry)',
    issuedAt: '2026-07-15 10:00',
    status: 'active',
  },
  {
    id: 'pass-02',
    qrId: 'PASSPORT-TN-2026-9031',
    productId: 'p2',
    productTitle: 'Kanjeevaram Temple Border Saree — Crimson Gold',
    weaverId: 'lakshmi-amma',
    weaverName: 'Lakshmi Amma',
    village: 'Kanchipuram',
    clusterName: 'Kanchipuram Temple Weavers',
    material: 'Heavyweight Mulberry Silk & Pure Silver Zari',
    weavingHours: 210,
    storySnapshot: 'Woven with three single threads of silk twisted with silver zari wire.',
    ledgerRef: '0x9031...TN2026 (Polygon GI Registry)',
    issuedAt: '2026-07-18 16:20',
    status: 'active',
  },
];

export async function getPassportByQrId(qrId: string): Promise<PassportRecord | undefined> {
  await new Promise((res) => setTimeout(res, 200));
  return MOCK_PASSPORTS.find((p) => p.qrId === qrId) || MOCK_PASSPORTS[0];
}
