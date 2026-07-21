import { Course } from './types';

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Pricing Your Heritage Craft for Global Luxury Markets',
    category: 'Economics & Fair Trade',
    estimatedTime: '12 mins',
    languages: ['English', 'Hindi', 'Assamese', 'Tamil', 'Bengali'],
    description: 'Calculate labor hours, raw material appreciation, and fair artisan margins for luxury buyers.',
    completed: true,
  },
  {
    id: 'c2',
    title: 'Mastering Smartphone Macro Photography for Silk Weaves',
    category: 'Product Presentation',
    estimatedTime: '15 mins',
    languages: ['English', 'Hindi', 'Assamese', 'Tamil', 'Bengali'],
    description: 'Capture thread details and authentic silk colors in natural daylight using your mobile phone.',
    completed: true,
  },
  {
    id: 'c3',
    title: 'Sustainable Packaging & GI Authenticity Seals',
    category: 'Export & Logistics',
    estimatedTime: '10 mins',
    languages: ['English', 'Hindi', 'Assamese'],
    description: 'Prepare moisture-proof parchment packaging and affix blockchain GI-tagged seals.',
    completed: false,
  },
  {
    id: 'c4',
    title: 'Direct Buyer Communication & Custom Order Terms',
    category: 'B2B Relations',
    estimatedTime: '18 mins',
    languages: ['English', 'Hindi', 'Tamil'],
    description: 'Set clear weaving timelines, sample approvals, and milestone payments with luxury atelier buyers.',
    completed: false,
  },
  {
    id: 'c5',
    title: 'Writing Your Weaving Story & Heritage Narrative',
    category: 'Storytelling',
    estimatedTime: '8 mins',
    languages: ['English', 'Hindi', 'Assamese', 'Tamil', 'Bengali'],
    description: 'Turn centuries of family weaving knowledge into a story that moves global buyers.',
    completed: false,
  },
  {
    id: 'c6',
    title: 'Understanding Your Passport & GI Geographical Indication Tag',
    category: 'Legal & IP',
    estimatedTime: '10 mins',
    languages: ['English', 'Hindi', 'Assamese', 'Tamil', 'Bengali'],
    description: 'Protect your region’s craft heritage with legal GI tag documentation.',
    completed: false,
  },
];

export async function getCourses(): Promise<Course[]> {
  await new Promise((res) => setTimeout(res, 150));
  return MOCK_COURSES;
}

export async function markLessonComplete(courseId: string): Promise<{ success: boolean }> {
  await new Promise((res) => setTimeout(res, 100));
  const c = MOCK_COURSES.find((item) => item.id === courseId);
  if (c) c.completed = true;
  return { success: true };
}
