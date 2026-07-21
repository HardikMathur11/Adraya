import { Order, BuyerRequirement } from './types';

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-2026-901',
    date: '2026-07-10',
    customerName: 'Lady Eleanor Vance',
    customerLocation: 'Mayfair, London UK',
    productTitle: 'Pochampally Ikat Silk Saree — Peacock Motif',
    weaverName: 'Radha Devi',
    price: 18500,
    weaverPayout: 15170,
    status: 'Delivered',
    qrId: 'PASSPORT-PC-2026-8841',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=400',
    transactionRef: 'TXN-901-POLY-0x8841',
  },
  {
    id: 'ORD-2026-904',
    date: '2026-07-18',
    customerName: 'Aarav Mehta',
    customerLocation: 'Mumbai, Maharashtra',
    productTitle: 'Golden Muga Silk Heritage Gamosa',
    weaverName: 'Bipul Das',
    price: 4200,
    weaverPayout: 3570,
    status: 'Shipped',
    qrId: 'PASSPORT-AS-2026-1102',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400',
    transactionRef: 'TXN-904-POLY-0x1102',
  },
  {
    id: 'ORD-2026-908',
    date: '2026-07-19',
    customerName: 'Sophia Lorenzi',
    customerLocation: 'Milan, Italy',
    productTitle: 'Kanjeevaram Temple Border Saree — Crimson Gold',
    weaverName: 'Lakshmi Amma',
    price: 32000,
    weaverPayout: 26880,
    status: 'Placed',
    qrId: 'PASSPORT-TN-2026-9031',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=400',
    transactionRef: 'TXN-908-POLY-0x9031',
  },
  {
    id: 'ORD-2026-912',
    date: '2026-07-20',
    customerName: 'Dr. Ananya Roy',
    customerLocation: 'Kolkata, West Bengal',
    productTitle: 'Fine Handspun Kashmir Pashmina Stole',
    weaverName: 'Ghulam Nabi',
    price: 27000,
    weaverPayout: 21600,
    status: 'Placed',
    qrId: 'PASSPORT-JK-2026-4410',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=400',
    transactionRef: 'TXN-912-POLY-0x4410',
  },
];

export const MOCK_BUYER_REQUIREMENTS: BuyerRequirement[] = [
  {
    id: 'REQ-101',
    buyerName: 'Atelier Paris Haute Couture',
    buyerCity: 'Paris, France',
    craftRequested: 'Assam Wild Muga Gold Fabric Yardage',
    quantity: 25,
    targetDeadline: '2026-09-30',
    budgetPerPiece: 14000,
    notes: 'Custom 44-inch width golden muga silk yardage for autumn bridal runway show.',
    status: 'Open for Bids',
  },
  {
    id: 'REQ-102',
    buyerName: 'Heritage Weddings & Co.',
    buyerCity: 'New Delhi, India',
    craftRequested: 'Double-Ikat Pochampally Royal Dupattas',
    quantity: 12,
    targetDeadline: '2026-08-25',
    budgetPerPiece: 18000,
    notes: 'Need custom indigo & madder red motifs for wedding bridal trousseau.',
    status: 'In Loom',
  },
];

export async function getOrdersByCustomer(): Promise<Order[]> {
  await new Promise((res) => setTimeout(res, 200));
  return MOCK_ORDERS;
}

export async function getOrdersByWeaver(): Promise<Order[]> {
  await new Promise((res) => setTimeout(res, 200));
  return MOCK_ORDERS;
}

export async function getBuyerRequirements(): Promise<BuyerRequirement[]> {
  await new Promise((res) => setTimeout(res, 200));
  return MOCK_BUYER_REQUIREMENTS;
}
