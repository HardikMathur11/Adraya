import { User } from './types';

export const MOCK_LOGGED_USER: User = {
  id: 'radha-devi',
  name: 'Radha Devi',
  email: 'radha.devi@weaver.weaveheritage.org',
  phone: '+91 94350 88776',
  role: 'weaver',
  preferredLanguage: 'en',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
};

export async function getCurrentUser(): Promise<User> {
  await new Promise((res) => setTimeout(res, 100));
  return MOCK_LOGGED_USER;
}
