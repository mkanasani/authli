import { create } from 'zustand';

interface Content {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

interface Store {
  theme: 'light' | 'dark';
  contents: Content[];
  isLoading: boolean;
  toggleTheme: () => void;
  setContents: (contents: Content[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<Store>((set) => ({
  theme: 'light',
  contents: [],
  isLoading: false,
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setContents: (contents) => set({ contents }),
  setLoading: (loading) => set({ isLoading: loading }),
}));