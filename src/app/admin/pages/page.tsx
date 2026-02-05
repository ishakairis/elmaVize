'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit } from 'lucide-react';
import DeleteButton from '@/components/admin/DeleteButton';
import { useAdminLocale } from '@/contexts/AdminLocaleContext';

export default function PagesAdminPage() {
  const { t } = useAdminLocale();
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/pages-list')
      .then(res => res.json())
      .then(data => {
        setPages(data);
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
          <h1 className="text-3xl font-bold">{t.pages.title}</h1>
          <p className="text-gray-600 mt-1">{t.pages.subtitle}</p>
        </div>
        <Link href="/admin/pages/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            {t.pages.addPage}
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pages.map((page) => (
          <Card key={page.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{page.titleEn}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{page.titleTr}</p>
                  <p className="text-sm text-gray-500 mt-2">{t.countries.slug}: /{page.slug}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Link href={`/admin/pages/${page.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <DeleteButton id={page.id} name={page.titleEn} type="pages" />
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {pages.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">{t.pages.noPages}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
