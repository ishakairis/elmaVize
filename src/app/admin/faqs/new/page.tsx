'use client';

import FAQForm from '@/components/admin/FAQForm';
import { useAdminLocale } from '@/contexts/AdminLocaleContext';

export default function NewFAQPage() {
  const { t } = useAdminLocale();
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t.faqs.newFAQ}</h1>
        <p className="text-gray-600 mt-1">{t.faqs.createFAQ}</p>
      </div>

      <FAQForm />
    </div>
  );
}
