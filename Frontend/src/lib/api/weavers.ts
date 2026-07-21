import { Weaver } from './types';

export interface GuildMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  experienceYears: number;
}

export interface BankSettlement {
  id: string;
  date: string;
  amount: number;
  utrNumber: string;
  bankName: string;
  status: 'Settled' | 'Processing';
}

export const MOCK_GUILD_MEMBERS: GuildMember[] = [
  { id: 'gm-1', name: 'Saraswati Devi', role: 'Master Dye Specialist', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400', experienceYears: 22 },
  { id: 'gm-2', name: 'Ramesh Chander', role: 'Warp Setup Craftsman', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400', experienceYears: 16 },
  { id: 'gm-3', name: 'Kavita Reddy', role: 'Double-Ikat Shuttle Weaver', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400', experienceYears: 14 },
  { id: 'gm-4', name: 'Venkatesh Rao', role: 'Silk Thread Spinning Master', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400', experienceYears: 28 },
];

export const MOCK_BANK_SETTLEMENTS: BankSettlement[] = [
  { id: 'SET-901', date: '2026-07-20', amount: 32400, utrNumber: 'SBI00098447101', bankName: 'State Bank of India (Pochampally Branch)', status: 'Settled' },
  { id: 'SET-889', date: '2026-07-15', amount: 48200, utrNumber: 'SBI00098441199', bankName: 'State Bank of India (Pochampally Branch)', status: 'Settled' },
  { id: 'SET-870', date: '2026-07-08', amount: 35840, utrNumber: 'SBI00098439002', bankName: 'State Bank of India (Pochampally Branch)', status: 'Settled' },
];

export const MOCK_WEAVERS: Weaver[] = [
  {
    id: 'radha-devi',
    name: 'Radha Devi',
    village: 'Pochampally',
    region: 'Telangana',
    specialty: 'Double-Ikat Silk Resist Dyeing',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    heroImage: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=1400',
    biography: 'Radha Devi began weaving at age twelve, learning the double-Ikat technique from her mother-in-law. Today she leads a women-led cluster of 44 weavers in Pochampally.',
    yearsWeaving: 18,
    piecesCreated: 64,
    totalCustomersServed: 58,
    clusterSize: 44,
    clusterId: 'pochampally-ikat-guild',
    videoUrl: '/assets/loom-artisan-video.mp4',
    verificationStatus: 'verified',
    awards: ['National Handloom Merit Award 2021', 'Telangana State Craft Master Honor'],
  },
  {
    id: 'lakshmi-amma',
    name: 'Lakshmi Amma',
    village: 'Kanchipuram',
    region: 'Tamil Nadu',
    specialty: 'Korvai Heavy Temple Border Silks',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    heroImage: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=1400',
    biography: 'A pioneer of eco-dyed Kanchipuram mulberry silks. Lakshmi leads a master weaving guild in temple city Kanchipuram.',
    yearsWeaving: 29,
    piecesCreated: 110,
    totalCustomersServed: 96,
    clusterSize: 18,
    clusterId: 'kanchipuram-korvai-guild',
    videoUrl: '/assets/loom-artisan-video.mp4',
    verificationStatus: 'verified',
    awards: ['UNESCO Craft Excellence Seal', 'Sant Kabir Awardee'],
  },
  {
    id: 'bipul-das',
    name: 'Bipul Das',
    village: 'Sualkuchi',
    region: 'Assam',
    specialty: 'Muga & Eri Silk Jacquard',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
    heroImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1400',
    biography: 'A 4th generation master weaver from Sualkuchi on the banks of the Brahmaputra, specializing in wild golden Muga silk.',
    yearsWeaving: 22,
    piecesCreated: 85,
    totalCustomersServed: 72,
    clusterSize: 24,
    clusterId: 'sualkuchi-silk-guild',
    videoUrl: '/assets/loom-artisan-video.mp4',
    verificationStatus: 'verified',
    awards: ['Assam Silk Legend Honor', 'GI Assam Weaver Pioneer'],
  },
  {
    id: 'ghulam-nabi',
    name: 'Ghulam Nabi',
    village: 'Srinagar',
    region: 'Kashmir',
    specialty: 'Kani Needle Weave Pashmina',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    heroImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1400',
    biography: 'Master craftsman preserving 16th-century Persian Kani needle weaving techniques in the Kashmir valley.',
    yearsWeaving: 35,
    piecesCreated: 92,
    totalCustomersServed: 84,
    clusterSize: 15,
    clusterId: 'kashmir-kani-guild',
    videoUrl: '/assets/loom-artisan-video.mp4',
    verificationStatus: 'verified',
    awards: ['Shilp Guru Award 2018', 'State Artisan Gold Medalist'],
  },
  {
    id: 'gurudev-varma',
    name: 'Gurudev Varma',
    village: 'Varanasi Old Quarter',
    region: 'Uttar Pradesh',
    specialty: 'Real Zari Kadwa Brocade',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    heroImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1400',
    biography: 'Awarded Shilp Guru in 2018. Gurudev operates hand-pulled pit looms in Varanasi weaving 24K real gold zari brocades.',
    yearsWeaving: 45,
    piecesCreated: 310,
    totalCustomersServed: 280,
    clusterSize: 32,
    clusterId: 'varanasi-kadwa-collective',
    videoUrl: '/assets/loom-artisan-video.mp4',
    verificationStatus: 'verified',
    awards: ['Shilp Guru 2018', 'National Award for Master Weavers'],
  },
  {
    id: 'savita-kshirsagar',
    name: 'Savita Kshirsagar',
    village: 'Yeola',
    region: 'Maharashtra',
    specialty: 'Yeola Paithani Peacock Tapestry',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    heroImage: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=1400',
    biography: 'Master Paithani weaver specializing in gold zari pallus woven with zero reverse threads in Yeola.',
    yearsWeaving: 24,
    piecesCreated: 78,
    totalCustomersServed: 65,
    clusterSize: 16,
    clusterId: 'yeola-paithani-guild',
    videoUrl: '/assets/loom-artisan-video.mp4',
    verificationStatus: 'verified',
    awards: ['Maharashtra State Shilpkar Honor', 'Handloom Heritage Seal'],
  },
];

export async function getFeaturedWeavers(): Promise<Weaver[]> {
  await new Promise((res) => setTimeout(res, 200));
  return MOCK_WEAVERS;
}

export async function getWeaverById(id: string): Promise<Weaver | undefined> {
  await new Promise((res) => setTimeout(res, 150));
  return MOCK_WEAVERS.find((w) => w.id === id) || MOCK_WEAVERS[0];
}

export async function getGuildMembers(): Promise<GuildMember[]> {
  await new Promise((res) => setTimeout(res, 150));
  return MOCK_GUILD_MEMBERS;
}

export async function getBankSettlements(): Promise<BankSettlement[]> {
  await new Promise((res) => setTimeout(res, 150));
  return MOCK_BANK_SETTLEMENTS;
}
