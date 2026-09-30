'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/auth';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/dashboard/seniors', label: 'Seniors', icon: '👴' },
  { href: '/dashboard/staff', label: 'Staff', icon: '👨‍⚕️' },
  { href: '/dashboard/appointments', label: 'Appointments', icon: '📅' },
  { href: '/dashboard/programs', label: 'Programs', icon: '📋' },
  { href: '/dashboard/reports', label: 'Reports', icon: '📈' },
  { href: '/dashboard/notifications', label: 'Notifications', icon: '🔔' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🏛️</span>
          <div>
            <h1 className="font-bold text-gray-900">Office of Seniors</h1>
            <p className="text-xs text-gray-500">Admin Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
            {user?.firstName?.[0] || user?.username?.[0] || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.firstName || user?.username}
            </p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full text-left text-sm text-gray-600 hover:text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
