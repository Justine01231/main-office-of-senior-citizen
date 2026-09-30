import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useApi } from '@/hooks/useApi';
import { Card, StatusBadge, EmptyState, SectionHeader } from '@/components/ui';
import { formatDate } from '@/utils';
import { COLORS, SPACING } from '@/constants';
import type { HealthRecord } from '@office-seniors/api-types';

const TYPE_ICONS: Record<string, string> = {
  medication: '💊',
  appointment: '🏥',
  condition: '🩺',
  vaccination: '💉',
  allergy: '⚠️',
  exercise: '🏃',
  general: '📋',
};

export default function HealthScreen() {
  const { data: records, loading, refetch } = useApi<HealthRecord[]>('/api/health');
  const recordsList = Array.isArray(records) ? records : [];

  const byType = recordsList.reduce((acc, record) => {
    (acc[record.type] = acc[record.type] || []).push(record);
    return acc;
  }, {} as Record<string, HealthRecord[]>) || {};

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
    >
      {Object.keys(byType).length === 0 ? (
        <EmptyState icon="❤️" title="No Health Records" message="Your health records will appear here" />
      ) : (
        Object.entries(byType).map(([type, typeRecords]) => (
          <View key={type} style={styles.section}>
            <SectionHeader
              title={`${TYPE_ICONS[type] || '📋'} ${type.charAt(0).toUpperCase() + type.slice(1)}`}
            />
            {typeRecords.map((record) => (
              <Card key={record.id}>
                <View style={styles.cardHeader}>
                  <Text style={styles.title}>{record.title}</Text>
                  {record.status && <StatusBadge status={record.status} />}
                </View>
                {record.description && (
                  <Text style={styles.description}>{record.description}</Text>
                )}
                {record.medicineName && (
                  <Text style={styles.detail}>
                    💊 {record.medicineName} - {record.dosage} ({record.frequency})
                  </Text>
                )}
                {record.doctorName && (
                  <Text style={styles.detail}>Doctor: {record.doctorName}</Text>
                )}
                {record.allergen && (
                  <Text style={styles.detail}>
                    ⚠️ {record.allergen} - {record.reaction} ({record.allergySeverity})
                  </Text>
                )}
                {record.createdAt && (
                  <Text style={styles.date}>{formatDate(record.createdAt)}</Text>
                )}
              </Card>
            ))}
          </View>
        ))
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
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  description: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  detail: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  date: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 6,
  },
});
