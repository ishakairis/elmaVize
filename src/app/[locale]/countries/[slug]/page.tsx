import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';

export default async function CountryDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale });

  const country = await prisma.country.findUnique({
    where: { slug },
    include: {
      visaPrograms: {
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!country) {
    notFound();
  }

  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            {locale === 'tr' ? country.nameTr : country.nameEn}
          </h1>
          {(country.descriptionTr || country.descriptionEn) && (
            <p className="text-lg text-gray-600">
              {locale === 'tr'
                ? country.descriptionTr
                : country.descriptionEn}
            </p>
          )}
        </div>

        {/* Main Content */}
        {(country.contentTr || country.contentEn) && (
          <Card className="mb-12">
            <CardContent className="p-8">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html:
                    locale === 'tr' ? country.contentTr : country.contentEn,
                }}
              />
            </CardContent>
          </Card>
        )}

        {/* Visa Programs */}
        {country.visaPrograms.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              {t('countries.programs')}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {country.visaPrograms.map((program) => (
                <Card
                  key={program.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <CardTitle>
                      {locale === 'tr' ? program.titleTr : program.titleEn}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {locale === 'tr'
                        ? program.excerptTr
                        : program.excerptEn}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="default" size="sm">
                      <Link href={`/visas/${program.slug}`}>
                        {t('common.readMore')}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                {locale === 'tr'
                  ? 'Başvurmak İster Misiniz?'
                  : 'Would You Like to Apply?'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {locale === 'tr'
                  ? 'Hemen başvuru formumuzu doldurun, sizinle iletişime geçelim.'
                  : 'Fill out our application form now and we will contact you.'}
              </p>
              <Button asChild size="lg">
                <Link href="/application">{t('nav.application')}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

