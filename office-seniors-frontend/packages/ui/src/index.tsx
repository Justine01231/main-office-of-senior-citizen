import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { getStatusColor } from '@office-seniors/utils';

// ── Status Badge ──────────────────────────────────────────────
export function StatusBadge({ status }: { status: string }) {
  return (
    <View style={[styles.badge, { backgroundColor: getStatusColor(status) + '20' }]}>
      <Text style={[styles.badgeText, { color: getStatusColor(status) }]}>
        {status.replace('_', ' ').toUpperCase()}
      </Text>
    </View>
  );
}

// ── Card ──────────────────────────────────────────────────────
interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: object;
}

export function Card({ children, onPress, style }: CardProps) {
  if (onPress) {
    return (
      <TouchableOpacity style={[styles.card, style]} onPress={onPress} activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }
  return <View style={[styles.card, style]}>{children}</View>;
}

// ── Empty State ───────────────────────────────────────────────
interface EmptyStateProps {
  icon: string;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>{icon}</Text>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyMessage}>{message}</Text>
      {actionLabel && onAction && (
        <TouchableOpacity style={styles.emptyAction} onPress={onAction}>
          <Text style={styles.emptyActionText}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ── Loading Screen ────────────────────────────────────────────
export function LoadingScreen({ message = 'Loading...' }: { message?: string }) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#3B82F6" />
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  );
}

// ── Avatar ────────────────────────────────────────────────────
interface AvatarProps {
  firstName?: string | null;
  lastName?: string | null;
  size?: number;
  color?: string;
}

export function Avatar({ firstName, lastName, size = 40, color = '#3B82F6' }: AvatarProps) {
  const initials = (firstName?.charAt(0) || '') + (lastName?.charAt(0) || '');
  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
      ]}
    >
      <Text style={[styles.avatarText, { fontSize: size * 0.4 }]}>
        {initials.toUpperCase() || '?'}
      </Text>
    </View>
  );
}

// ── Section Header ────────────────────────────────────────────
interface SectionHeaderProps {
  title: string;
  action?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, action, onAction }: SectionHeaderProps) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && onAction && (
        <TouchableOpacity onPress={onAction}>
          <Text style={styles.sectionAction}>{action}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ── Stat Card ─────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  color?: string;
}

export function StatCard({ label, value, icon, color = '#3B82F6' }: StatCardProps) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  emptyAction: {
    marginTop: 16,
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  emptyActionText: {
    color: '#fff',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  sectionAction: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
});
