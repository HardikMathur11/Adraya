import { Experience } from './types';

export const MOCK_EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    title: 'Half-Day Double-Ikat Weaving Immersion',
    duration: '4 Hours',
    price: 2500,
    groupSize: 'Max 4 Connoisseurs',
    location: 'Pochampally Silk Village, Telangana',
    description: 'Spend an unforgettable morning in Radha Devi’s courtyard. Try your hand at shuttle weaving and share a traditional meal.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'exp-2',
    title: 'Meet the Master Weaver — Temple Border Workshop',
    duration: '6 Hours',
    price: 1200,
    groupSize: 'Max 6 Connoisseurs',
    location: 'Kanchipuram, Tamil Nadu',
    description: 'Private access to Lakshmi Amma’s loom. Witness Korvai interlocked border joining and silver zari spinning.',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'exp-3',
    title: 'Festival Textile Tour & Kani Needle Weaving',
    duration: 'Full Day (8 Hours)',
    price: 6000,
    groupSize: 'Max 8 Connoisseurs',
    location: 'Srinagar, Kashmir',
    description: 'Walk through historic craft guilds of Srinagar and learn Kani stick loom weaving with Ghulam Nabi.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000',
  },
];

export async function getExperiences(): Promise<Experience[]> {
  await new Promise((res) => setTimeout(res, 250));
  return MOCK_EXPERIENCES;
}

export async function submitBooking(data: any): Promise<{ success: boolean; bookingId: string }> {
  await new Promise((res) => setTimeout(res, 400));
  return { success: true, bookingId: `BOOK-${Date.now().toString().slice(-4)}` };
}
