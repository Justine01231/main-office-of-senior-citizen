import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useApi } from '@/hooks/useApi';
import { Card, Avatar, EmptyState, StatusBadge } from '@/components/ui';
import { COLORS, SPACING } from '@/constants';
import type { Senior } from '@office-seniors/api-types';

export default function StaffSeniorsScreen() {
  const { data: seniors, loading, refetch } = useApi<Senior[]>('/api/staff/assigned-seniors');
  const seniorsList = Array.isArray(seniors) ? seniors : [];

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
    >
      <View style={styles.content}>
        <Text style={styles.count}>{seniorsList.length} assigned seniors</Text>

        {seniorsList.length === 0 ? (
          <EmptyState
            icon="👴"
            title="No Assigned Seniors"
            message="You don't have any assigned seniors yet"
          />
        ) : (
          seniorsList.map((senior) => (
            <Card key={senior.id}>
              <View style={styles.seniorRow}>
                <Avatar
                  firstName={senior.user?.firstName}
                  lastName={senior.user?.lastName}
                  size={48}
                />
                <View style={styles.seniorInfo}>
                  <Text style={styles.seniorName}>
                    {senior.user?.firstName} {senior.user?.lastName}
                  </Text>
                  <Text style={styles.seniorDetail}>
                    @{senior.user?.username}
                  </Text>
                  {senior.user?.phone && (
                    <Text style={styles.seniorDetail}>📱 {senior.user.phone}</Text>
                  )}
                </View>
                <StatusBadge status={senior.user?.isActive ? 'active' : 'inactive'} />
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
  content: {
    padding: SPACING.lg,
  },
  count: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  seniorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seniorInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  seniorName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  seniorDetail: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
});
