'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function ReportsPage() {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30');

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/api/reports?period=${period}`);
        setReport(data.data);
      } catch (err) {
        console.error('Failed to fetch report', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [period]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="180">Last 6 months</option>
          <option value="365">Last year</option>
        </select>
      </div>

      {loading ? (
        <div className="text-gray-500 text-center py-8">Loading report...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Overview</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Seniors</span>
                <span className="font-semibold">{report?.totalSeniors || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Seniors</span>
                <span className="font-semibold">{report?.activeSeniors || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Staff</span>
                <span className="font-semibold">{report?.totalStaff || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Appointments</span>
                <span className="font-semibold">{report?.totalAppointments || 0}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Period</h2>
            <p className="text-gray-600">Data for the last {period} days</p>
          </div>
        </div>
      )}
    </div>
  );
}
