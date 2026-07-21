export type UserRole = 'customer' | 'weaver';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  preferredLanguage: string;
  avatar?: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  weaveName: string;
  region: string;
  weaverId: string;
  weaverName: string;
  weaverVillage: string;
  weaverAvatar: string;
  price: number;
  weaverSharePercentage: number;
  stock: number;
  mood: 'wedding' | 'royal' | 'heirloom-gift' | 'quiet-luxury' | 'sustainable-luxe' | 'temple-heritage';
  material: string;
  hoursInvested: number;
  giCertified: boolean;
  description: string;
  culturalMeaning: string;
  textureUrl: string;
  macroTextureUrl: string;
  images: string[];
  audioUrl?: string;
  qrId: string;
}

export interface Weaver {
  id: string;
  name: string;
  village: string;
  region: string;
  specialty: string;
  avatar: string;
  heroImage: string;
  biography: string;
  yearsWeaving: number;
  piecesCreated: number;
  totalCustomersServed: number;
  clusterSize: number;
  clusterId?: string;
  videoUrl?: string;
  verificationStatus: 'verified' | 'pending';
  awards?: string[];
}

export interface MoodCollection {
  id: string;
  title: string;
  subtitle: string;
  editorialWallText: string;
  moodKey: 'wedding' | 'royal' | 'heirloom-gift' | 'quiet-luxury' | 'sustainable-luxe' | 'temple-heritage';
  heroImage: string;
  accentColorHex: string;
}

export interface PassportRecord {
  id: string;
  qrId: string;
  productId: string;
  productTitle: string;
  weaverId: string;
  weaverName: string;
  village: string;
  clusterName?: string;
  material: string;
  weavingHours: number;
  storySnapshot: string;
  ledgerRef: string;
  issuedAt: string;
  status: 'active' | 'revoked';
}

export interface Experience {
  id: string;
  title: string;
  duration: string;
  price: number;
  groupSize: string;
  location: string;
  description: string;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerLocation: string;
  productTitle: string;
  weaverName: string;
  price: number;
  weaverPayout: number;
  status: 'Placed' | 'Shipped' | 'Delivered';
  qrId: string;
  image: string;
  transactionRef: string;
}

export interface BuyerRequirement {
  id: string;
  buyerName: string;
  buyerCity: string;
  craftRequested: string;
  quantity: number;
  targetDeadline: string;
  budgetPerPiece: number;
  notes: string;
  status: 'Open for Bids' | 'Allocated' | 'In Loom';
}

export interface Course {
  id: string;
  title: string;
  category: string;
  estimatedTime: string;
  languages: string[];
  description: string;
  completed?: boolean;
}
