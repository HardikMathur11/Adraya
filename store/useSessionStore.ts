import { create } from 'zustand';

export type UserRole = 'customer' | 'weaver';
export type LanguageCode = 'en' | 'hi' | 'as' | 'bn' | 'ta';

interface SessionStore {
  currentMood: 'wedding' | 'royal' | 'heirloom-gift' | 'quiet-luxury' | 'sustainable-luxe' | 'temple-heritage';
  currentLanguage: LanguageCode;
  isLoadingThread: boolean;
  activeRole: UserRole;
  setMood: (mood: 'wedding' | 'royal' | 'heirloom-gift' | 'quiet-luxury' | 'sustainable-luxe' | 'temple-heritage') => void;
  setLanguage: (lang: LanguageCode) => void;
  setLoadingThread: (loading: boolean) => void;
  setActiveRole: (role: UserRole) => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  currentMood: 'heirloom-gift',
  currentLanguage: 'en',
  isLoadingThread: false,
  activeRole: 'customer', // Default to Customer mode
  setMood: (mood) => set({ currentMood: mood }),
  setLanguage: (lang) => set({ currentLanguage: lang }),
  setLoadingThread: (loading) => set({ isLoadingThread: loading }),
  setActiveRole: (role) => set({ activeRole: role }),
}));
