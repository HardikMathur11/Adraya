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

export interface ModerationItem {
  id: string;
  entityType: 'product_story' | 'artisan_profile' | 'price_claim';
  entityId: string;
  title: string;
  weaverName: string;
  generatedStory: string;
  suggestedPrice: number;
  weaverSharePct: number;
  status: 'pending' | 'approved' | 'flagged';
  submittedAt: string;
  aiConfidenceScore: number;
}

export interface PassportVersion {
  versionNumber: number;
  snapshotJson: string;
  createdAt: string;
  createdBy: string;
  reason: string;
}

export interface PassportRecord {
  id: string;
  qrId: string;
  productId: string;
  productTitle: string;
  weaverId: string;
  weaverName: string;
  village: string;
  clusterId?: string;
  clusterName?: string;
  material: string;
  weavingHours: number;
  storySnapshot: string;
  ledgerRef: string;
  issuedAt: string;
  issuedByAdminId: string;
  status: 'active' | 'revoked';
  versions: PassportVersion[];
}

export interface AuditLog {
  id: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  targetEntity: string;
  details: string;
  timestamp: string;
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
  clusterSize: number;
  clusterId?: string;
  videoUrl?: string;
  verificationStatus: 'verified' | 'pending';
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

export interface Cluster {
  id: string;
  name: string;
  region: string;
  weaversCount: number;
  craftSpecialty: string;
  capacityPercentage: number;
  avgLeadTimeDays: number;
  moq: number;
  priceRange: string;
  certifications: string[];
  image: string;
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

export const MOOD_COLLECTIONS: MoodCollection[] = [
  {
    id: 'wedding',
    title: 'The Solah Shringar Bridal Atelier',
    subtitle: 'Golden Brocades & Sacred Silk Drapes',
    editorialWallText: 'Woven for sacred unions and imperial celebrations, each piece in this atelier incorporates pure gold zari wires intertwined with Mulberry silk.',
    moodKey: 'wedding',
    heroImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200',
    accentColorHex: '#D9A6A0',
  },
  {
    id: 'royal',
    title: 'Imperial Durbar Heritage',
    subtitle: 'Midnight Indigo & Courtly Velvet Weaves',
    editorialWallText: 'Drawing directly from royal archives of Awadh and Mysore, these weaves evoke the dignified silence of royal courts.',
    moodKey: 'royal',
    heroImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1200',
    accentColorHex: '#1B2A4A',
  },
  {
    id: 'heirloom-gift',
    title: 'Heirloom & Dynasty Treasures',
    subtitle: 'Timeless Oxblood & Pure Mulberry Silks',
    editorialWallText: 'Crafted as physical heirlooms to be passed across three generations. Dyed with madder root and pomegranate rind.',
    moodKey: 'heirloom-gift',
    heroImage: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=1200',
    accentColorHex: '#6B1E28',
  },
  {
    id: 'quiet-luxury',
    title: 'The Minimalist Loom',
    subtitle: 'Raw Pashmina, Tussar & Undyed Linen',
    editorialWallText: 'Understated elegance celebrating the tactile texture of raw handspun fibers. Pure, unpretentious luxury woven without chemical treatment.',
    moodKey: 'quiet-luxury',
    heroImage: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=1200',
    accentColorHex: '#D8CCB8',
  },
  {
    id: 'sustainable-luxe',
    title: 'Eri Silk & Botanical Dyes',
    subtitle: 'Ahimsa Peace Silk from Assam Valleys',
    editorialWallText: 'Cruelty-free Eri silk harvested naturally after the silkworm emerges, dyed exclusively with marigold petals, indigo leaf, and walnut husks.',
    moodKey: 'sustainable-luxe',
    heroImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200',
    accentColorHex: '#5C6B4F',
  },
  {
    id: 'temple-heritage',
    title: 'Sacred Temple Drapes',
    subtitle: 'Kanchipuram Temple Borders & Sacred Geometry',
    editorialWallText: 'Inspired by the carved stone pillars of South Indian temple architecture. Features korvai joinery technique.',
    moodKey: 'temple-heritage',
    heroImage: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=1200',
    accentColorHex: '#0B3D2E',
  },
];

export const WEAVERS: Weaver[] = [
  {
    id: 'master-biren-das',
    name: 'Biren Chandra Das',
    village: 'Sualkuchi',
    region: 'Assam',
    specialty: 'Muga & Eri Silk Jamdani',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    heroImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1400',
    biography: 'A 4th generation master weaver from the silk village of Sualkuchi on the banks of the Brahmaputra.',
    yearsWeaving: 38,
    piecesCreated: 1420,
    clusterSize: 24,
    clusterId: 'sualkuchi-silk-guild',
    videoUrl: '/assets/loom-artisan-video.mp4',
    verificationStatus: 'verified',
  },
  {
    id: 'gurudev-varma',
    name: 'Gurudev Varma',
    village: 'Varanasi Old Quarter',
    region: 'Uttar Pradesh',
    specialty: 'Real Zari Kadwa Brocade',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    heroImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1400',
    biography: 'Master Craftsman awarded Shilp Guru in 2018. Gurudev operates hand-pulled pit looms in Varanasi.',
    yearsWeaving: 45,
    piecesCreated: 890,
    clusterSize: 32,
    clusterId: 'varanasi-kadwa-collective',
    videoUrl: '/assets/loom-artisan-video.mp4',
    verificationStatus: 'verified',
  },
  {
    id: 'meenakshi-sundaram',
    name: 'Meenakshi Sundaram',
    village: 'Kanchipuram',
    region: 'Tamil Nadu',
    specialty: 'Korvai Heavy Temple Border Saree',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    heroImage: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=1400',
    biography: 'Pioneer of eco-dyed Kanchipuram mulberry silks. Meenakshi leads a women-led weaving guild in temple city Kanchipuram.',
    yearsWeaving: 29,
    piecesCreated: 1100,
    clusterSize: 18,
    clusterId: 'kanchipuram-korvai-guild',
    videoUrl: '/loom-artisan-video.mp4',
    verificationStatus: 'verified',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-muga-golden-heritage',
    slug: 'golden-muga-royal-mehela',
    title: 'The Sovereign Golden Muga Silk Mekhela Sador',
    weaveName: 'Assam Muga Silk & Real Gold Leaf Weave',
    region: 'Sualkuchi, Assam',
    weaverId: 'master-biren-das',
    weaverName: 'Biren Chandra Das',
    weaverVillage: 'Sualkuchi',
    weaverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    price: 185000,
    weaverSharePercentage: 82,
    stock: 3,
    mood: 'royal',
    material: '100% Wild Golden Muga Silk & 24K Silver-Gold Zari',
    hoursInvested: 240,
    giCertified: true,
    description: 'An extraordinary masterpiece handwoven over 240 hours. Muga silk is the rarest wild silk on earth.',
    culturalMeaning: 'The Kingfisher and Orchid motifs symbolise eternal abundance and respect for the sacred river systems.',
    textureUrl: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=1000',
    macroTextureUrl: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000',
    ],
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    qrId: 'PASSPORT-AS-2026-0891',
  },
  {
    id: 'prod-benarasi-shikargah',
    slug: 'benarasi-kadwa-shikargah-saree',
    title: 'The Imperial Banarasi Kadwa Shikargah Drape',
    weaveName: 'Varanasi Kadwa Hand-Brocade',
    region: 'Varanasi, Uttar Pradesh',
    weaverId: 'gurudev-varma',
    weaverName: 'Gurudev Varma',
    weaverVillage: 'Varanasi Old Quarter',
    weaverAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    price: 245000,
    weaverSharePercentage: 85,
    stock: 2,
    mood: 'heirloom-gift',
    material: 'Pure Katan Silk & Real Gold Testing Zari',
    hoursInvested: 310,
    giCertified: true,
    description: 'Depicting royal hunting reserves with intricate flora, fauna, and courtly riders.',
    culturalMeaning: 'A homage to the 17th-century Awadh court textiles, celebrating harmony between wilderness and artistic mastery.',
    textureUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000',
    macroTextureUrl: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000',
    ],
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    qrId: 'PASSPORT-UP-2026-0412',
  },
  {
    id: 'prod-kanjeevaram-temple-gopuram',
    slug: 'kanjeevaram-temple-gopuram-border',
    title: 'The Sacred Kanchipuram Gopuram Temple Saree',
    weaveName: 'Korvai Interlocked Temple Border',
    region: 'Kanchipuram, Tamil Nadu',
    weaverId: 'meenakshi-sundaram',
    weaverName: 'Meenakshi Sundaram',
    weaverVillage: 'Kanchipuram',
    weaverAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    price: 168000,
    weaverSharePercentage: 80,
    stock: 4,
    mood: 'temple-heritage',
    material: 'Heavyweight Mulberry Silk & Pure Silver Zari',
    hoursInvested: 190,
    giCertified: true,
    description: 'Featuring the distinctive Korvai construction where body and border yarns are joined seamlessly by two weavers.',
    culturalMeaning: 'Reflects the architectural spiritual journey of South Indian granite temples.',
    textureUrl: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=1000',
    macroTextureUrl: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=1000',
    ],
    qrId: 'PASSPORT-TN-2026-9031',
  },
];

export const CLUSTERS: Cluster[] = [
  {
    id: 'sualkuchi-silk-guild',
    name: 'Sualkuchi Golden Silk Cluster',
    region: 'Kamrup, Assam',
    weaversCount: 340,
    craftSpecialty: 'Muga & Eri Silk Jacquard Weaves',
    capacityPercentage: 78,
    avgLeadTimeDays: 25,
    moq: 10,
    priceRange: '₹35,000 - ₹2,500,000',
    certifications: ['GI-Tagged Assam Silk', 'Fair Trade Certified', 'Ahimsa Peace Silk Standard'],
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'varanasi-kadwa-collective',
    name: 'Varanasi Heritage Handloom Guild',
    region: 'Varanasi, Uttar Pradesh',
    weaversCount: 520,
    craftSpecialty: 'Kadwa Brocade & Tanchoi Silk',
    capacityPercentage: 92,
    avgLeadTimeDays: 35,
    moq: 5,
    priceRange: '₹50,000 - ₹5,000,000',
    certifications: ['GI Varanasi Brocades', 'Handloom Mark India', 'Silk Mark Certified'],
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
  },
];

export const COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Pricing Your Heritage Craft for Global Luxury Markets',
    category: 'Economics & Fair Trade',
    estimatedTime: '45 mins',
    languages: ['Hindi', 'Assamese', 'Bengali', 'Tamil', 'English'],
    description: 'Learn how to calculate true labor hours, raw material appreciation, and fair artisan margins.',
    completed: true,
  },
  {
    id: 'c2',
    title: 'Mastering Smartphone Macro Photography for Silk Weaves',
    category: 'Product Presentation',
    estimatedTime: '30 mins',
    languages: ['Hindi', 'Assamese', 'Bengali', 'Tamil', 'English'],
    description: 'Capture intricate thread details, normal textures, and authentic colors in natural daylight.',
    completed: true,
  },
  {
    id: 'c3',
    title: 'Sustainable Packaging & GI Authenticity Seals',
    category: 'Export & Logistics',
    estimatedTime: '25 mins',
    languages: ['Hindi', 'Assamese', 'English'],
    description: 'How to prepare moisture-proof parchment packaging and affix blockchain GI-tagged seals.',
    completed: false,
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-sualkuchi-day',
    title: 'Golden Muga Silk Immersion & Loom Courtyard Walk',
    duration: 'Full Day (6 Hours)',
    price: 14500,
    groupSize: 'Max 6 Connoisseurs',
    location: 'Sualkuchi Silk Village, Assam',
    description: 'Spend an unforgettable day in the courtyard of Master Weaver Biren Das.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1000',
  },
];
