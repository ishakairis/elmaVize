'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit } from 'lucide-react';
import DeleteButton from '@/components/admin/DeleteButton';
import { useAdminLocale } from '@/contexts/AdminLocaleContext';

export default function VisasPage() {
  const { t } = useAdminLocale();
  const [visaPrograms, setVisaPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/visas-list')
      .then(res => res.json())
      .then(data => {
        setVisaPrograms(data);
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t.visas.title}</h1>
          <p className="text-gray-600 mt-1">{t.visas.subtitle}</p>
        </div>
        <Link href="/admin/visas/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            {t.visas.addProgram}
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visaPrograms.map((visa) => (
          <Card key={visa.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{visa.titleEn}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{visa.titleTr}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Link href={`/admin/visas/${visa.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <DeleteButton
                    id={visa.id}
                    name={visa.titleEn}
                    type="visas"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.countries.slug}:</span>
                  <span className="font-medium">{visa.slug}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.visas.type}:</span>
                  <span className="font-medium">{visa.visaType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.visas.country}:</span>
                  <span className="font-medium">{visa.country?.nameEn || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.countries.applications}:</span>
                  <span className="font-medium">{visa._count.applications}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.countries.featured}:</span>
                  <span className={`font-medium ${visa.featured ? 'text-green-600' : 'text-gray-400'}`}>
                    {visa.featured ? t.common.yes : t.common.no}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {visaPrograms.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">{t.visas.noPrograms}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
