export const COLORS = {
  primary: '#3B82F6',
  primaryDark: '#2563EB',
  primaryLight: '#93C5FD',
  secondary: '#6366F1',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#06B6D4',

  background: '#F9FAFB',
  surface: '#FFFFFF',
  border: '#E5E7EB',

  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  textInverse: '#FFFFFF',

  senior: '#3B82F6',
  staff: '#8B5CF6',
  admin: '#F59E0B',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

export const FONT_SIZE = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  title: 28,
} as const;

export const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
