'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth';
import Sidebar from '@/components/layout/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, initialize } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initialize();
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/login');
    }
  }, [mounted, isAuthenticated]);

  if (!mounted || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}
