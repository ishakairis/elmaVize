'use client';

import CountryForm from '@/components/admin/CountryForm';
import { useAdminLocale } from '@/contexts/AdminLocaleContext';

export default function NewCountryPage() {
  const { t } = useAdminLocale();
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t.countries.newCountry}</h1>
        <p className="text-gray-600 mt-1">{t.countries.createCountry}</p>
      </div>

      <CountryForm />
    </div>
  );
}
