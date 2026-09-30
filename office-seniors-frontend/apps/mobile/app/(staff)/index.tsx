import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useAuthStore } from '@/stores/auth';
import { useApi } from '@/hooks/useApi';
import { Card, StatCard, SectionHeader, Avatar } from '@/components/ui';
import { COLORS, SPACING } from '@/constants';
import type { DashboardStats, Activity } from '@office-seniors/api-types';

export default function StaffDashboardScreen() {
  const { user } = useAuthStore();
  const { data: stats, loading, refetch } = useApi<DashboardStats>('/api/staff/dashboard');
  const { data: activities } = useApi<Activity[]>('/api/staff/recent-activities?limit=5');
  const activityList = Array.isArray(activities) ? activities : [];

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
    >
      <View style={styles.greeting}>
        <Avatar firstName={user?.firstName} lastName={user?.lastName} size={48} />
        <View style={styles.greetingText}>
          <Text style={styles.greetingLabel}>Staff Dashboard</Text>
          <Text style={styles.greetingName}>
            {user?.firstName || user?.username} 👋
          </Text>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statsRow}>
          <StatCard label="Assigned Seniors" value={stats?.activeSeniors || 0} icon="👴" color={COLORS.senior} />
          <StatCard label="Today's Tasks" value={stats?.pendingTasks || 0} icon="✅" color={COLORS.warning} />
        </View>
        <View style={styles.statsRow}>
          <StatCard label="Appointments" value={stats?.totalAppointments || 0} icon="📅" color={COLORS.primary} />
          <StatCard label="Notifications" value={stats?.unreadNotifications || 0} icon="🔔" color={COLORS.danger} />
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Recent Activity" />
        {activityList.length === 0 ? (
          <Card>
            <Text style={styles.emptyText}>No recent activity</Text>
          </Card>
        ) : (
          activityList.map((activity) => (
            <Card key={activity.id}>
              <View style={styles.activityRow}>
                <View style={styles.activityDot} />
                <View style={styles.activityContent}>
                  <Text style={styles.activityDesc}>{activity.description}</Text>
                  <Text style={styles.activityTime}>{activity.timestamp}</Text>
                </View>
              </View>
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
  greeting: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  greetingText: {
    marginLeft: SPACING.md,
  },
  greetingLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  greetingName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  statsGrid: {
    padding: SPACING.lg,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textMuted,
    paddingVertical: SPACING.lg,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.staff,
    marginTop: 6,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityDesc: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  activityTime: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
});
