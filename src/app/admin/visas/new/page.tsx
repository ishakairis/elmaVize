'use client';

import { useEffect, useState } from 'react';
import VisaForm from '@/components/admin/VisaForm';
import { useAdminLocale } from '@/contexts/AdminLocaleContext';

export default function NewVisaPage() {
  const { t } = useAdminLocale();
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/countries-list')
      .then(res => res.json())
      .then(data => {
        setCountries(data);
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
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t.visas.newProgram}</h1>
        <p className="text-gray-600 mt-1">{t.visas.createProgram}</p>
      </div>

      <VisaForm countries={countries} />
    </div>
  );
}
