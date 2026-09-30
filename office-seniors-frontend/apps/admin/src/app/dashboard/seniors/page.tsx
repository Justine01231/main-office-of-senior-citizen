'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import type { Senior } from '@office-seniors/api-types';

export default function SeniorsPage() {
  const [seniors, setSeniors] = useState<Senior[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeniors = async () => {
      try {
        const { data } = await api.get('/api/seniors');
        setSeniors(data.data || []);
      } catch (err) {
        console.error('Failed to fetch seniors', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSeniors();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Senior Citizens</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
          + Add Senior
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Username</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Registered</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">Loading...</td>
              </tr>
            ) : seniors.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">No seniors found</td>
              </tr>
            ) : (
              seniors.map((senior) => (
                <tr key={senior.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {senior.user?.firstName} {senior.user?.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">@{senior.user?.username}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      senior.user?.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {senior.user?.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {senior.createdAt ? new Date(senior.createdAt).toLocaleDateString() : '-'}
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
