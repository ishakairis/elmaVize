import { getTranslations } from 'next-intl/server';
import { ApplicationForm } from '@/components/forms/ApplicationForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'application' });

  // Fetch all countries for the dropdown
  const countries = await prisma.country.findMany({
    orderBy: { nameTr: 'asc' },
    select: {
      id: true,
      nameTr: true,
      nameEn: true,
    },
  });

  return (
    <div className="py-20">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-gray-600">{t('subtitle')}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('title')}</CardTitle>
            <CardDescription>{t('subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ApplicationForm countries={countries} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

