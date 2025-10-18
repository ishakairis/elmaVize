import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import { GraduationCap } from 'lucide-react';

export default async function EducationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });

  // Try to get education page content from database
  let pageContent = null;
  try {
    pageContent = await prisma.page.findUnique({
      where: { slug: 'education' },
    });
  } catch (error) {
    // Database might not be ready yet
  }

  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {t('education')}
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            {locale === 'tr'
              ? 'Yurtdışında eğitim hayallerinizi gerçeğe dönüştürüyoruz'
              : 'Making your overseas education dreams come true'}
          </p>
        </div>

        {/* Content */}
        <div className="mb-12">
          <Card>
            <CardContent className="p-8">
              {pageContent ? (
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{
                    __html:
                      locale === 'tr'
                        ? pageContent.contentTr
                        : pageContent.contentEn,
                  }}
                />
              ) : (
                <div className="space-y-6 text-gray-700">
                  <p>
                    {locale === 'tr'
                      ? 'Yurtdışında eğitim almak, kariyer ve kişisel gelişim açısından hayatınızda önemli bir dönüm noktası olabilir. Uzman kadromuzla, size en uygun ülke, üniversite ve program seçiminde rehberlik ediyoruz.'
                      : 'Studying abroad can be an important turning point in your life in terms of career and personal development. With our expert team, we guide you in choosing the most suitable country, university and program.'}
                  </p>

                  <h2 className="text-2xl font-semibold mt-8 mb-4">
                    {locale === 'tr'
                      ? 'Eğitim Danışmanlığı Hizmetlerimiz'
                      : 'Our Education Consultancy Services'}
                  </h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      {locale === 'tr'
                        ? 'Ülke ve üniversite seçimi danışmanlığı'
                        : 'Country and university selection consultancy'}
                    </li>
                    <li>
                      {locale === 'tr'
                        ? 'Başvuru süreçlerinde rehberlik'
                        : 'Guidance in application processes'}
                    </li>
                    <li>
                      {locale === 'tr'
                        ? 'Vize başvuru desteği'
                        : 'Visa application support'}
                    </li>
                    <li>
                      {locale === 'tr'
                        ? 'Burs imkanları hakkında bilgilendirme'
                        : 'Information about scholarship opportunities'}
                    </li>
                    <li>
                      {locale === 'tr'
                        ? 'Konaklama ve ulaşım organizasyonu'
                        : 'Accommodation and transportation organization'}
                    </li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                {locale === 'tr'
                  ? 'Yurtdışı Eğitim Başvurunuz için Hazır mısınız?'
                  : 'Ready for Your Overseas Education Application?'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {locale === 'tr'
                  ? 'Hemen başvuru formumuzu doldurun, size en uygun eğitim programını bulalım.'
                  : 'Fill out our application form now and let us find the most suitable education program for you.'}
              </p>
              <Button asChild size="lg">
                <Link href="/application">{t('application')}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

