import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import { Briefcase } from 'lucide-react';

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });

  // Try to get work page content from database
  let pageContent = null;
  try {
    pageContent = await prisma.page.findUnique({
      where: { slug: 'work' },
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
            <Briefcase className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {t('work')}
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            {locale === 'tr'
              ? 'Yurtdışında çalışma fırsatları için profesyonel destek'
              : 'Professional support for overseas work opportunities'}
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
                      ? 'Yurtdışında çalışma hayallerinizi gerçeğe dönüştürmenize yardımcı oluyoruz. Çalışma izni başvurularından iş bulma sürecine kadar her adımda yanınızdayız.'
                      : 'We help you make your overseas work dreams come true. We are with you at every step from work permit applications to the job finding process.'}
                  </p>

                  <h2 className="text-2xl font-semibold mt-8 mb-4">
                    {locale === 'tr'
                      ? 'İş Danışmanlığı Hizmetlerimiz'
                      : 'Our Work Consultancy Services'}
                  </h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      {locale === 'tr'
                        ? 'Çalışma izni başvurusu danışmanlığı'
                        : 'Work permit application consultancy'}
                    </li>
                    <li>
                      {locale === 'tr'
                        ? 'İş arama sürecinde destek'
                        : 'Support in job search process'}
                    </li>
                    <li>
                      {locale === 'tr'
                        ? 'CV ve motivasyon mektubu hazırlama'
                        : 'CV and cover letter preparation'}
                    </li>
                    <li>
                      {locale === 'tr'
                        ? 'Mülakat hazırlığı'
                        : 'Interview preparation'}
                    </li>
                    <li>
                      {locale === 'tr'
                        ? 'Vize ve yasal süreçler hakkında bilgilendirme'
                        : 'Information about visa and legal processes'}
                    </li>
                    <li>
                      {locale === 'tr'
                        ? 'İş yerleştirme desteği'
                        : 'Job placement support'}
                    </li>
                  </ul>

                  <h2 className="text-2xl font-semibold mt-8 mb-4">
                    {locale === 'tr' ? 'Popüler Ülkeler' : 'Popular Countries'}
                  </h2>
                  <p>
                    {locale === 'tr'
                      ? 'Almanya, Hollanda, İngiltere, Kanada, Avustralya ve daha birçok ülkede çalışma izni başvurularınızda size destek oluyoruz.'
                      : 'We support you in your work permit applications in Germany, Netherlands, United Kingdom, Canada, Australia and many more countries.'}
                  </p>
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
                  ? 'Yurtdışında Çalışmak için İlk Adımı Atın'
                  : 'Take the First Step to Work Abroad'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {locale === 'tr'
                  ? 'Hemen başvuru formumuzu doldurun, size en uygun çalışma fırsatlarını değerlendirelim.'
                  : 'Fill out our application form now and let us evaluate the most suitable work opportunities for you.'}
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

