import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuthStore } from '@/stores/auth';
import { Avatar, Card, SectionHeader } from '@/components/ui';
import { COLORS, SPACING } from '@/constants';

export default function StaffProfileScreen() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar firstName={user?.firstName} lastName={user?.lastName} size={80} color={COLORS.staff} />
        <Text style={styles.name}>
          {user?.firstName && user?.lastName
            ? `${user.firstName} ${user.lastName}`
            : user?.username}
        </Text>
        <Text style={styles.role}>STAFF MEMBER</Text>
      </View>

      <View style={styles.content}>
        <SectionHeader title="Account Information" />
        <Card>
          <InfoRow label="Username" value={user?.username || '-'} />
          <InfoRow label="Email" value={user?.email || '-'} />
          <InfoRow label="Phone" value={user?.phone || '-'} />
          <InfoRow label="Position" value={user?.position || '-'} />
          <InfoRow label="Status" value={user?.isActive ? 'Active' : 'Inactive'} />
        </Card>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 12,
  },
  role: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.staff,
    marginTop: 4,
    letterSpacing: 1,
  },
  content: {
    padding: SPACING.lg,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: COLORS.danger,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  logoutText: {
    color: COLORS.textInverse,
    fontSize: 16,
    fontWeight: '700',
  },
});
