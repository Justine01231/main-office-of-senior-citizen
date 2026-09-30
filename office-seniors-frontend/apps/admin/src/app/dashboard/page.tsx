'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

interface DashboardData {
  totalSeniors: number;
  activeSeniors: number;
  totalStaff: number;
  activeStaff: number;
  totalAppointments: number;
  pendingTasks: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/api/reports');
        setStats(data.data);
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-gray-500">Loading dashboard...</div>;
  }

  const statCards = [
    { label: 'Total Seniors', value: stats?.totalSeniors || 0, icon: '👴', color: 'blue' },
    { label: 'Active Seniors', value: stats?.activeSeniors || 0, icon: '✅', color: 'green' },
    { label: 'Total Staff', value: stats?.totalStaff || 0, icon: '👨‍⚕️', color: 'purple' },
    { label: 'Active Staff', value: stats?.activeStaff || 0, icon: '👥', color: 'indigo' },
    { label: 'Appointments', value: stats?.totalAppointments || 0, icon: '📅', color: 'amber' },
    { label: 'Pending Tasks', value: stats?.pendingTasks || 0, icon: '📋', color: 'red' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <span className="text-3xl">{card.icon}</span>
              <div>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                <p className="text-sm text-gray-500">{card.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Manage Seniors', href: '/dashboard/seniors', icon: '👴' },
            { label: 'Manage Staff', href: '/dashboard/staff', icon: '👨‍⚕️' },
            { label: 'Appointments', href: '/dashboard/appointments', icon: '📅' },
            { label: 'View Reports', href: '/dashboard/reports', icon: '📈' },
          ].map((action) => (
            <a
              key={action.href}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
