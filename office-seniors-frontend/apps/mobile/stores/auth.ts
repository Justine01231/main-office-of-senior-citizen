import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import type { User, UserRole } from '@office-seniors/api-types';
import { api } from '@/services/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (data: {
    username: string;
    password: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: UserRole;
  }) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,

  initialize: async () => {
    try {
      const userJson = await SecureStore.getItemAsync('user');
      const token = await SecureStore.getItemAsync('accessToken');

      if (userJson && token) {
        const user = JSON.parse(userJson) as User;
        set({ user, isAuthenticated: true, isInitialized: true });
      } else {
        set({ isInitialized: true });
      }
    } catch {
      set({ isInitialized: true });
    }
  },

  login: async (username: string, password: string) => {
    set({ isLoading: true });
    try {
      const { data } = await api.post('/auth/login', { username, password });

      if (data.success && data.data) {
        await SecureStore.setItemAsync('accessToken', data.data.accessToken);
        await SecureStore.setItemAsync('refreshToken', data.data.refreshToken);
        await SecureStore.setItemAsync('user', JSON.stringify(data.data.user));

        set({
          user: data.data.user,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error(error.response?.data?.message || error.message || 'Login failed');
    }
  },

  register: async (registerData) => {
    set({ isLoading: true });
    try {
      const { data } = await api.post('/auth/register', registerData);

      if (data.success && data.data) {
        await SecureStore.setItemAsync('accessToken', data.data.accessToken);
        await SecureStore.setItemAsync('refreshToken', data.data.refreshToken);
        await SecureStore.setItemAsync('user', JSON.stringify(data.data.user));

        set({
          user: data.data.user,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error(error.response?.data?.message || error.message || 'Registration failed');
    }
  },

  logout: async () => {
    try {
      const refreshToken = await SecureStore.getItemAsync('refreshToken');
      if (refreshToken) {
        await api.post('/auth/logout', { refreshToken }).catch(() => {});
      }
    } finally {
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('refreshToken');
      await SecureStore.deleteItemAsync('user');
      set({ user: null, isAuthenticated: false });
    }
  },

  refreshUser: async () => {
    try {
      const { data } = await api.get('/auth/me');
      if (data.success && data.data) {
        await SecureStore.setItemAsync('user', JSON.stringify(data.data));
        set({ user: data.data });
      }
    } catch {}
  },
}));
