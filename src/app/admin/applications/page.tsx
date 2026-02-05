'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import StatusSelect from '@/components/admin/StatusSelect';
import { useAdminLocale } from '@/contexts/AdminLocaleContext';

export default function ApplicationsPage() {
  const { t } = useAdminLocale();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/applications-list')
      .then(res => res.json())
      .then(data => {
        setApplications(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">{t.common.loading}</div>
      </div>
    );
  }

  const stats = {
    total: applications.length,
    new: applications.filter((a: any) => a.status === 'new').length,
    contacted: applications.filter((a: any) => a.status === 'contacted').length,
    processing: applications.filter((a: any) => a.status === 'processing').length,
    completed: applications.filter((a: any) => a.status === 'completed').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t.applications.title}</h1>
        <p className="text-gray-600 mt-1">{t.applications.subtitle}</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-gray-600">{t.common.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
            <p className="text-xs text-gray-600">{t.common.new}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">{stats.contacted}</div>
            <p className="text-xs text-gray-600">{t.applications.contacted}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-600">{stats.processing}</div>
            <p className="text-xs text-gray-600">{t.applications.processing}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <p className="text-xs text-gray-600">{t.applications.completed}</p>
          </CardContent>
        </Card>
      </div>

      {/* Applications List */}
      <Card>
        <CardHeader>
          <CardTitle>{t.applications.allApplications}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applications.map((app: any) => (
              <div
                key={app.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{app.name}</h3>
                        <p className="text-sm text-gray-600">{app.email}</p>
                        <p className="text-sm text-gray-600">{app.phone}</p>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Country:</span>{' '}
                        {app.country?.nameEn || app.targetCountry || 'N/A'}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Visa Type:</span> {app.visaType || 'N/A'}
                      </p>
                      {app.program && (
                        <p className="text-sm">
                          <span className="font-medium">Program:</span> {app.program.titleEn}
                        </p>
                      )}
                      {app.message && (
                        <p className="text-sm mt-2">
                          <span className="font-medium">Message:</span>
                          <br />
                          {app.message}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        Submitted: {formatDate(app.createdAt, 'en')}
                      </p>
                    </div>
                  </div>
                  <div className="md:w-48">
                    <StatusSelect
                      id={app.id}
                      currentStatus={app.status}
                      type="application"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {applications.length === 0 && (
            <p className="text-center text-gray-500 py-8">{t.applications.noApplications}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
