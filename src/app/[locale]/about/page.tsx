import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { Card, CardContent } from '@/components/ui/card';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  // Try to get about page content from database
  let pageContent = null;
  try {
    pageContent = await prisma.page.findUnique({
      where: { slug: 'about' },
    });
  } catch (error) {
    // Database might not be ready yet
  }

  return (
    <div className="py-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-gray-600">{t('subtitle')}</p>
        </div>

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
                    ? 'Elma Vize Danışmanlık olarak, yurtdışı vize, eğitim ve iş danışmanlığı alanında uzman ekibimizle hizmet vermekteyiz.'
                    : 'As Elma Visa Consultancy, we provide services in the field of visa, education and work consultancy abroad with our expert team.'}
                </p>
                <p>
                  {locale === 'tr'
                    ? 'Yılların getirdiği deneyim ve uzmanlıkla, müşterilerimizin hayallerini gerçekleştirmelerine yardımcı oluyoruz. Profesyonel kadromuz ve güçlü referanslarımızla, vize başvuru süreçlerinizde yanınızdayız.'
                    : 'With years of experience and expertise, we help our clients realize their dreams. With our professional staff and strong references, we are with you in your visa application processes.'}
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">
                  {locale === 'tr' ? 'Hizmetlerimiz' : 'Our Services'}
                </h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    {locale === 'tr'
                      ? 'Vize Danışmanlığı ve Başvuru Desteği'
                      : 'Visa Consultancy and Application Support'}
                  </li>
                  <li>
                    {locale === 'tr'
                      ? 'Yurtdışı Eğitim Danışmanlığı'
                      : 'Overseas Education Consultancy'}
                  </li>
                  <li>
                    {locale === 'tr'
                      ? 'Yurtdışı İş ve Çalışma İzni Danışmanlığı'
                      : 'Overseas Work and Work Permit Consultancy'}
                  </li>
                  <li>
                    {locale === 'tr'
                      ? 'Göçmenlik Danışmanlığı'
                      : 'Immigration Consultancy'}
                  </li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

