'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import type { Program } from '@office-seniors/api-types';

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data } = await api.get('/api/programs');
        setPrograms(data.data || []);
      } catch (err) {
        console.error('Failed to fetch programs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Programs</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
          + Add Program
        </button>
      </div>

      {loading ? (
        <div className="text-gray-500 text-center py-8">Loading...</div>
      ) : programs.length === 0 ? (
        <div className="text-gray-500 text-center py-8">No programs found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {programs.map((program) => (
            <div key={program.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">{program.name}</h3>
              {program.description && (
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{program.description}</p>
              )}
              <div className="space-y-1 text-sm text-gray-600">
                {program.category && <p>📁 {program.category}</p>}
                {program.scheduleDays && <p>📅 {program.scheduleDays}</p>}
                {program.location && <p>📍 {program.location}</p>}
                {program.instructor && <p>👤 {program.instructor}</p>}
                {program.capacity && <p>👥 Max: {program.capacity}</p>}
              </div>
              <div className="mt-4 flex gap-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
