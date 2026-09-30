import { useEffect } from 'react';
import { Slot, useRouter } from 'expo-router';
import { useAuthStore } from '@/stores/auth';
import { LoadingScreen } from '@/components/ui';

export default function RootLayout() {
  const { isAuthenticated, isInitialized, user, initialize } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    if (!isAuthenticated) {
      router.replace('/(auth)/login');
    } else if (user?.role === 'staff') {
      router.replace('/(staff)');
    } else {
      router.replace('/(senior)');
    }
  }, [isInitialized, isAuthenticated, user]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return <Slot />;
}
