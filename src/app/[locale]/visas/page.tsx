import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';

export default async function VisasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'visas' });

  const programs = await prisma.visaProgram.findMany({
    orderBy: { order: 'asc' },
    include: {
      country: true,
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
          {programs.map((program) => (
            <Card key={program.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-2">
                  {program.country && (
                    <span className="text-sm text-primary font-medium">
                      {locale === 'tr'
                        ? program.country.nameTr
                        : program.country.nameEn}
                    </span>
                  )}
                </div>
                <CardTitle>
                  {locale === 'tr' ? program.titleTr : program.titleEn}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {locale === 'tr' ? program.excerptTr : program.excerptEn}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="default" size="sm">
                  <Link href={`/visas/${program.slug}`}>
                    {t('subtitle').includes('solutions') ? 'Learn More' : 'Daha Fazla'}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {programs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {locale === 'tr'
                ? 'Henüz vize programı eklenmemiş.'
                : 'No visa programs added yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

