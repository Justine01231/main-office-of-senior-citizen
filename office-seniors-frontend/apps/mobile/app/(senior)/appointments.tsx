import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useApi } from '@/hooks/useApi';
import { Card, StatusBadge, EmptyState, SectionHeader } from '@/components/ui';
import { formatDate, formatTime } from '@/utils';
import { COLORS, SPACING } from '@/constants';
import type { Appointment } from '@office-seniors/api-types';

export default function AppointmentsScreen() {
  const { data: appointments, loading, refetch } = useApi<Appointment[]>('/api/appointments');
  const appointmentsList = Array.isArray(appointments) ? appointments : [];

  const upcoming = appointmentsList
    .filter((a) => a.status === 'scheduled' || a.status === 'confirmed')
    .sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime());

  const past = appointmentsList
    .filter((a) => a.status === 'completed' || a.status === 'cancelled')
    .sort((a, b) => new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime());

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
    >
      <View style={styles.section}>
        <SectionHeader title="Upcoming" />
        {upcoming.length === 0 ? (
          <EmptyState icon="📅" title="No Appointments" message="You have no upcoming appointments" />
        ) : (
          upcoming.map((appt) => (
            <Card key={appt.id}>
              <View style={styles.cardHeader}>
                <Text style={styles.title}>{appt.title}</Text>
                <StatusBadge status={appt.status} />
              </View>
              <Text style={styles.detail}>📅 {formatDate(appt.appointmentDate)} at {formatTime(appt.appointmentTime)}</Text>
              {appt.type && <Text style={styles.detail}>Type: {appt.type}</Text>}
              {appt.location && <Text style={styles.detail}>📍 {appt.location}</Text>}
              {appt.doctorName && <Text style={styles.detail}>Doctor: {appt.doctorName}</Text>}
              {appt.description && <Text style={styles.description}>{appt.description}</Text>}
            </Card>
          ))
        )}
      </View>

      {past.length > 0 && (
        <View style={styles.section}>
          <SectionHeader title="Past" />
          {past.map((appt) => (
            <Card key={appt.id} style={styles.pastCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.title}>{appt.title}</Text>
                <StatusBadge status={appt.status} />
              </View>
              <Text style={styles.detail}>{formatDate(appt.appointmentDate)} at {formatTime(appt.appointmentTime)}</Text>
            </Card>
          ))}
        </View>
      )}
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
    marginBottom: 8,
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
  description: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 8,
    fontStyle: 'italic',
  },
  pastCard: {
    opacity: 0.7,
  },
});
