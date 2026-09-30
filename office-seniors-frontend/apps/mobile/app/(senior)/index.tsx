import { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useAuthStore } from '@/stores/auth';
import { useApi } from '@/hooks/useApi';
import { Card, StatCard, SectionHeader, StatusBadge, Avatar } from '@/components/ui';
import { formatDate, formatTime } from '@/utils';
import { COLORS, SPACING } from '@/constants';
import type { Appointment, Notification, DashboardStats } from '@office-seniors/api-types';

export default function SeniorHomeScreen() {
  const { user } = useAuthStore();
  const { data: stats, loading, refetch: refetchStats } = useApi<DashboardStats>('/api/staff/dashboard');
  const { data: appointments, refetch: refetchAppts } = useApi<Appointment[]>('/api/appointments');
  const { data: notifications, refetch: refetchNotifs } = useApi<Notification[]>('/api/notifications');

  const appointmentList = Array.isArray(appointments) ? appointments : [];
  const notificationList = Array.isArray(notifications) ? notifications : [];

  const onRefresh = () => {
    refetchStats();
    refetchAppts();
    refetchNotifs();
  };

  const upcomingAppointments = appointmentList
    .filter((a) => a.status === 'scheduled' || a.status === 'confirmed')
    .slice(0, 3);

  const unreadCount = notificationList.filter((n) => !n.isRead).length;

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
    >
      <View style={styles.greeting}>
        <Avatar firstName={user?.firstName} lastName={user?.lastName} size={48} />
        <View style={styles.greetingText}>
          <Text style={styles.greetingLabel}>Welcome back,</Text>
          <Text style={styles.greetingName}>
            {user?.firstName || user?.username || 'User'} 👋
          </Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <StatCard label="Appointments" value={stats?.totalAppointments || 0} icon="📅" color={COLORS.primary} />
        <StatCard label="Notifications" value={unreadCount} icon="🔔" color={COLORS.warning} />
      </View>

      <View style={styles.section}>
        <SectionHeader title="Upcoming Appointments" action="View All" onAction={() => {}} />
        {upcomingAppointments.length === 0 ? (
          <Card>
            <Text style={styles.emptyText}>No upcoming appointments</Text>
          </Card>
        ) : (
          upcomingAppointments.map((appt) => (
            <Card key={appt.id}>
              <View style={styles.appointmentRow}>
                <View style={styles.appointmentInfo}>
                  <Text style={styles.appointmentTitle}>{appt.title}</Text>
                  <Text style={styles.appointmentDetail}>
                    📅 {formatDate(appt.appointmentDate)} at {formatTime(appt.appointmentTime)}
                  </Text>
                  {appt.location && (
                    <Text style={styles.appointmentDetail}>📍 {appt.location}</Text>
                  )}
                </View>
                <StatusBadge status={appt.status} />
              </View>
            </Card>
          ))
        )}
      </View>

      <View style={styles.section}>
        <SectionHeader title="Recent Notifications" />
        {notificationList.slice(0, 5).map((notif) => (
          <Card key={notif.id}>
            <View style={styles.notifRow}>
              <View style={[styles.notifDot, !notif.isRead && styles.notifDotUnread]} />
              <View style={styles.notifContent}>
                <Text style={styles.notifTitle}>{notif.title}</Text>
                <Text style={styles.notifMessage} numberOfLines={2}>
                  {notif.message}
                </Text>
                {notif.createdAt && (
                  <Text style={styles.notifTime}>{formatDate(notif.createdAt)}</Text>
                )}
              </View>
            </View>
          </Card>
        ))}
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
  statsRow: {
    flexDirection: 'row',
    padding: SPACING.lg,
    gap: 12,
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
  appointmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  appointmentInfo: {
    flex: 1,
    marginRight: 12,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  appointmentDetail: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  notifRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notifDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
    marginTop: 6,
    marginRight: 12,
  },
  notifDotUnread: {
    backgroundColor: COLORS.primary,
  },
  notifContent: {
    flex: 1,
  },
  notifTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  notifMessage: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  notifTime: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 4,
  },
});
