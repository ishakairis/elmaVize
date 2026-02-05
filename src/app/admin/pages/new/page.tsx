'use client';

import PageForm from '@/components/admin/PageForm';
import { useAdminLocale } from '@/contexts/AdminLocaleContext';

export default function NewPageAdmin() {
  const { t } = useAdminLocale();
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t.pages.newPage}</h1>
        <p className="text-gray-600 mt-1">{t.pages.createPage}</p>
      </div>

      <PageForm />
    </div>
  );
}
