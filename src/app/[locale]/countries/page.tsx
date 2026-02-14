import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import * as Flags from 'country-flag-icons/react/3x2';

export default async function CountriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'countries' });

  const countries = await prisma.country.findMany({
    orderBy: { order: 'asc' },
    include: {
      _count: {
        select: { visaPrograms: true },
      },
    },
  });

  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-gray-600">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {countries.map((country) => {
            const FlagComponent = country.iso2Code && (Flags as any)[country.iso2Code];
            
            return (
              <Card key={country.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  {FlagComponent && (
                    <div className="mb-4 flex justify-center">
                      {React.createElement(FlagComponent, { 
                        className: "w-24 h-18 rounded shadow-md" 
                      })}
                    </div>
                  )}
                  <CardTitle className="text-center">
                    {locale === 'tr' ? country.nameTr : country.nameEn}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-center">
                    {locale === 'tr'
                      ? country.descriptionTr
                      : country.descriptionEn}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {country._count.visaPrograms} {t('programs')}
                    </span>
                    <Button asChild variant="default" size="sm">
                      <Link href={`/countries/${country.slug}`}>
                        {t('viewDetails')}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {countries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {locale === 'tr'
                ? 'Henüz ülke eklenmemiş.'
                : 'No countries added yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

