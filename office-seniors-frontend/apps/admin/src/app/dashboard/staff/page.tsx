'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import type { User } from '@office-seniors/api-types';

export default function StaffPage() {
  const [staff, setStaff] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const { data } = await api.get('/staff/list');
        setStaff(data.data || []);
      } catch (err) {
        console.error('Failed to fetch staff', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Staff Members</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
          + Add Staff
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Position</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-500">Loading...</td>
              </tr>
            ) : staff.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-500">No staff found</td>
              </tr>
            ) : (
              staff.map((member) => (
                <tr key={member.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {member.firstName} {member.lastName}
                    </div>
                    <div className="text-sm text-gray-500">@{member.username}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{member.position || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      member.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {member.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                      Deactivate
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
