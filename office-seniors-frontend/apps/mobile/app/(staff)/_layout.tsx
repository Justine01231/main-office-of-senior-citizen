import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { COLORS } from '@/constants';

function TabIcon({ icon, focused }: { icon: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.5 }}>{icon}</Text>
  );
}

export default function StaffTabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.staff,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          paddingBottom: 4,
          height: 60,
        },
        headerStyle: {
          backgroundColor: COLORS.surface,
        },
        headerTintColor: COLORS.textPrimary,
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          headerTitle: 'Staff Dashboard',
          tabBarIcon: ({ focused }) => <TabIcon icon="📊" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="seniors"
        options={{
          title: 'Seniors',
          tabBarIcon: ({ focused }) => <TabIcon icon="👴" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: 'Appointments',
          tabBarIcon: ({ focused }) => <TabIcon icon="📅" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ focused }) => <TabIcon icon="✅" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon icon="👤" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
