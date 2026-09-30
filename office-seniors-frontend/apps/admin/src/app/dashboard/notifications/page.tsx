'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import type { Notification } from '@office-seniors/api-types';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await api.get('/api/notifications');
        setNotifications(data.data || []);
      } catch (err) {
        console.error('Failed to fetch notifications', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No notifications</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notif) => (
              <div key={notif.id} className={`px-6 py-4 ${!notif.isRead ? 'bg-blue-50' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${!notif.isRead ? 'bg-blue-600' : 'bg-gray-300'}`} />
                  <div>
                    <h3 className="font-medium text-gray-900">{notif.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {notif.createdAt ? new Date(notif.createdAt).toLocaleString() : ''}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
