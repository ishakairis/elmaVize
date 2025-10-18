import { getTranslations } from 'next-intl/server';
import { ContactForm } from '@/components/forms/ContactForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { company } from '@/config/company';
import { Mail, Phone, MapPin } from 'lucide-react';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const tInfo = await getTranslations({ locale, namespace: 'contact.info' });

  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-gray-600">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>{t('title')}</CardTitle>
              <CardDescription>{t('subtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{tInfo('phone')}</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={`tel:${company.phone}`}
                  className="flex items-center gap-3 text-primary hover:underline"
                >
                  <Phone className="h-5 w-5" />
                  {company.phone}
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{tInfo('email')}</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-center gap-3 text-primary hover:underline"
                >
                  <Mail className="h-5 w-5" />
                  {company.email}
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{tInfo('address')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{company.address[locale as 'tr' | 'en']}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

