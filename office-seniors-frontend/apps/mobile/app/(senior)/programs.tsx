import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useApi } from '@/hooks/useApi';
import { Card, StatusBadge, EmptyState } from '@/components/ui';
import { COLORS, SPACING } from '@/constants';
import type { Program } from '@office-seniors/api-types';

const CATEGORY_ICONS: Record<string, string> = {
  exercise: '🏃',
  social: '🎉',
  health: '❤️',
  education: '📚',
  recreation: '🎮',
};

export default function ProgramsScreen() {
  const { data: programs, loading, refetch } = useApi<Program[]>('/api/programs');
  const programsList = Array.isArray(programs) ? programs : [];

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
    >
      <View style={styles.content}>
        {programsList.length === 0 ? (
          <EmptyState
            icon="📋"
            title="No Programs"
            message="Available programs will appear here"
          />
        ) : (
          programsList.map((program) => (
            <Card key={program.id}>
              <View style={styles.cardHeader}>
                <View style={styles.titleRow}>
                  <Text style={styles.categoryIcon}>
                    {CATEGORY_ICONS[program.category || ''] || '📋'}
                  </Text>
                  <Text style={styles.name}>{program.name}</Text>
                </View>
                {program.applicationStatus && (
                  <StatusBadge status={program.applicationStatus} />
                )}
              </View>
              {program.description && (
                <Text style={styles.description} numberOfLines={2}>
                  {program.description}
                </Text>
              )}
              <View style={styles.meta}>
                {program.category && (
                  <Text style={styles.metaItem}>📁 {program.category}</Text>
                )}
                {program.scheduleDays && (
                  <Text style={styles.metaItem}>📅 {program.scheduleDays}</Text>
                )}
                {program.location && (
                  <Text style={styles.metaItem}>📍 {program.location}</Text>
                )}
                {program.instructor && (
                  <Text style={styles.metaItem}>👤 {program.instructor}</Text>
                )}
              </View>
              {program.isEnrolled && (
                <View style={styles.enrolledBadge}>
                  <Text style={styles.enrolledText}>✅ Enrolled</Text>
                </View>
              )}
            </Card>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
  },
  description: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 8,
  },
  meta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 12,
  },
  metaItem: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  enrolledBadge: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  enrolledText: {
    fontSize: 13,
    color: COLORS.success,
    fontWeight: '600',
  },
});
