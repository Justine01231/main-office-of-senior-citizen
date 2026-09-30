'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import type { Appointment } from '@office-seniors/api-types';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await api.get('/api/appointments');
        setAppointments(data.data || []);
      } catch (err) {
        console.error('Failed to fetch appointments', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const statusColors: Record<string, string> = {
    scheduled: 'bg-blue-100 text-blue-700',
    confirmed: 'bg-green-100 text-green-700',
    completed: 'bg-gray-100 text-gray-700',
    cancelled: 'bg-red-100 text-red-700',
    'no-show': 'bg-orange-100 text-orange-700',
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Appointments</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Title</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Time</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Type</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-500">Loading...</td>
              </tr>
            ) : appointments.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-500">No appointments found</td>
              </tr>
            ) : (
              appointments.map((appt) => (
                <tr key={appt.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{appt.title}</td>
                  <td className="px-6 py-4 text-gray-600">{appt.appointmentDate}</td>
                  <td className="px-6 py-4 text-gray-600">{appt.appointmentTime}</td>
                  <td className="px-6 py-4 text-gray-600">{appt.type}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[appt.status] || 'bg-gray-100 text-gray-700'}`}>
                      {appt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
