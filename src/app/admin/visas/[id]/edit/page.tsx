'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import VisaForm from '@/components/admin/VisaForm';
import { useAdminLocale } from '@/contexts/AdminLocaleContext';

export default function EditVisaPage() {
  const { t } = useAdminLocale();
  const params = useParams();
  const id = params?.id as string;
  const [visa, setVisa] = useState<any>(null);
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/admin/visas/${id}`).then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      }),
      fetch('/api/admin/countries-list').then(res => res.json())
    ])
      .then(([visaData, countriesData]) => {
        setVisa(visaData);
        setCountries(countriesData);
        setLoading(false);
      })
      .catch(() => notFound());
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">{t.common.loading}</div>
      </div>
    );
  }

  if (!visa) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t.visas.editProgram}</h1>
        <p className="text-gray-600 mt-1">{t.visas.updateProgram}</p>
      </div>

      <VisaForm visa={visa} countries={countries} />
    </div>
  );
}
