import { create } from 'zustand';
import { UserRole } from '../lib/api/types';

export type LanguageCode = 'en' | 'hi' | 'as' | 'bn' | 'ta';

interface SessionStore {
  currentLanguage: LanguageCode;
  activeRole: UserRole;
  setLanguage: (lang: LanguageCode) => void;
  setActiveRole: (role: UserRole) => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  currentLanguage: 'en',
  activeRole: 'customer',
  setLanguage: (lang) => set({ currentLanguage: lang }),
  setActiveRole: (role) => set({ activeRole: role }),
}));
