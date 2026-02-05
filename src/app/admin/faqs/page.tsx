'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit } from 'lucide-react';
import DeleteButton from '@/components/admin/DeleteButton';
import { useAdminLocale } from '@/contexts/AdminLocaleContext';

export default function FAQsPage() {
  const { t } = useAdminLocale();
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/faqs-list')
      .then(res => res.json())
      .then(data => {
        setFaqs(data);
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
          <h1 className="text-3xl font-bold">{t.faqs.title}</h1>
          <p className="text-gray-600 mt-1">{t.faqs.subtitle}</p>
        </div>
        <Link href="/admin/faqs/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            {t.faqs.addFAQ}
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <Card key={faq.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{faq.questionEn}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{faq.questionTr}</p>
                  <p className="text-sm text-gray-500 mt-2">{t.countries.order}: {faq.order}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Link href={`/admin/faqs/${faq.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <DeleteButton id={faq.id} name={faq.questionEn} type="faqs" />
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {faqs.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">{t.faqs.noFAQs}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
