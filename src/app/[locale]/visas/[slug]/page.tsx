import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';

export default async function VisaDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale });

  const program = await prisma.visaProgram.findUnique({
    where: { slug },
    include: {
      country: true,
    },
  });

  if (!program) {
    notFound();
  }

  return (
    <div className="py-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          {program.country && (
            <div className="mb-4">
              <Link
                href={`/countries/${program.country.slug}`}
                className="text-primary hover:underline"
              >
                {locale === 'tr'
                  ? program.country.nameTr
                  : program.country.nameEn}
              </Link>
            </div>
          )}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            {locale === 'tr' ? program.titleTr : program.titleEn}
          </h1>
          {(program.excerptTr || program.excerptEn) && (
            <p className="text-lg text-gray-600">
              {locale === 'tr' ? program.excerptTr : program.excerptEn}
            </p>
          )}
        </div>

        {/* Main Content */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html:
                  locale === 'tr' ? program.contentTr : program.contentEn,
              }}
            />
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                {locale === 'tr'
                  ? 'Bu Programa Başvurmak İster Misiniz?'
                  : 'Would You Like to Apply to This Program?'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {locale === 'tr'
                  ? 'Hemen başvuru formumuzu doldurun, detaylı bilgi alalım.'
                  : 'Fill out our application form now and get detailed information.'}
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

