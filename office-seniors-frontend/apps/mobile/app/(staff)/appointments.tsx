import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useApi } from '@/hooks/useApi';
import { Card, StatusBadge, EmptyState, SectionHeader } from '@/components/ui';
import { formatDate, formatTime } from '@/utils';
import { COLORS, SPACING } from '@/constants';
import type { Appointment } from '@office-seniors/api-types';

export default function StaffAppointmentsScreen() {
  const { data: appointments, loading, refetch } = useApi<Appointment[]>('/api/appointments');
  const appointmentsList = Array.isArray(appointments) ? appointments : [];

  const today = new Date().toISOString().split('T')[0];
  const todaysAppts = appointmentsList.filter((a) => a.appointmentDate === today);
  const upcoming = appointmentsList
    .filter((a) => a.appointmentDate > today && (a.status === 'scheduled' || a.status === 'confirmed'))
    .slice(0, 5);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
    >
      <View style={styles.section}>
        <SectionHeader title="Today's Appointments" />
        {todaysAppts.length === 0 ? (
          <Card>
            <Text style={styles.emptyText}>No appointments today</Text>
          </Card>
        ) : (
          todaysAppts.map((appt) => (
            <Card key={appt.id}>
              <View style={styles.cardHeader}>
                <Text style={styles.title}>{appt.title}</Text>
                <StatusBadge status={appt.status} />
              </View>
              <Text style={styles.detail}>⏰ {formatTime(appt.appointmentTime)}</Text>
              <Text style={styles.detail}>👴 Senior #{appt.seniorId}</Text>
              {appt.location && <Text style={styles.detail}>📍 {appt.location}</Text>}
            </Card>
          ))
        )}
      </View>

      <View style={styles.section}>
        <SectionHeader title="Upcoming" />
        {upcoming.length === 0 ? (
          <EmptyState icon="📅" title="No Upcoming" message="No upcoming appointments" />
        ) : (
          upcoming.map((appt) => (
            <Card key={appt.id}>
              <View style={styles.cardHeader}>
                <Text style={styles.title}>{appt.title}</Text>
                <StatusBadge status={appt.status} />
              </View>
              <Text style={styles.detail}>
                📅 {formatDate(appt.appointmentDate)} at {formatTime(appt.appointmentTime)}
              </Text>
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
  section: {
    padding: SPACING.lg,
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
  detail: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textMuted,
    paddingVertical: SPACING.lg,
  },
});
