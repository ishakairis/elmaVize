'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import FAQForm from '@/components/admin/FAQForm';
import { useAdminLocale } from '@/contexts/AdminLocaleContext';

export default function EditFAQPage() {
  const { t } = useAdminLocale();
  const params = useParams();
  const id = params?.id as string;
  const [faq, setFaq] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/faqs/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(setFaq)
      .catch(() => notFound())
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">{t.common.loading}</div>
      </div>
    );
  }

  if (!faq) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t.faqs.editFAQ}</h1>
        <p className="text-gray-600 mt-1">{t.faqs.updateFAQ}</p>
      </div>

      <FAQForm faq={faq} />
    </div>
  );
}
