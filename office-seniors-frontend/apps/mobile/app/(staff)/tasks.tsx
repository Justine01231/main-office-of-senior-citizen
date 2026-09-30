import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useApi } from '@/hooks/useApi';
import { Card, EmptyState, StatusBadge } from '@/components/ui';
import { COLORS, SPACING } from '@/constants';
import type { BenefitApplication } from '@office-seniors/api-types';

export default function StaffTasksScreen() {
  const { data: tasks, loading, refetch } = useApi<BenefitApplication[]>('/api/staff/pending-tasks');
  const tasksList = Array.isArray(tasks) ? tasks : [];

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
    >
      <View style={styles.content}>
        <Text style={styles.count}>{tasksList.length} pending tasks</Text>

        {tasksList.length === 0 ? (
          <EmptyState
            icon="✅"
            title="All Caught Up"
            message="No pending tasks"
          />
        ) : (
          tasksList.map((task) => (
            <Card key={task.id}>
              <View style={styles.cardHeader}>
                <Text style={styles.title}>{task.applicationType}</Text>
                <StatusBadge status={task.status} />
              </View>
              {task.notes && (
                <Text style={styles.notes} numberOfLines={2}>{task.notes}</Text>
              )}
              {task.priority && (
                <Text style={styles.priority}>Priority: {task.priority}</Text>
              )}
              {task.estimatedAmount && (
                <Text style={styles.amount}>Estimated: ₱{task.estimatedAmount}</Text>
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
  count: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  notes: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  priority: {
    fontSize: 12,
    color: COLORS.warning,
    marginTop: 6,
    fontWeight: '600',
  },
  amount: {
    fontSize: 13,
    color: COLORS.success,
    marginTop: 2,
  },
});
