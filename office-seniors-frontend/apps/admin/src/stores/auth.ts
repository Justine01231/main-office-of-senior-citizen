import { create } from 'zustand';
import type { User } from '@office-seniors/api-types';
import api from '@/lib/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  initialize: () => {
    if (typeof window === 'undefined') return;
    const userJson = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');
    if (userJson && token) {
      set({ user: JSON.parse(userJson), isAuthenticated: true });
    }
  },

  login: async (username: string, password: string) => {
    set({ isLoading: true });
    try {
      const { data } = await api.post('/auth/login', { username, password });
      if (data.success && data.data) {
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        set({ user: data.data.user, isAuthenticated: true, isLoading: false });
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error(error.response?.data?.message || error.message);
    }
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },
}));
