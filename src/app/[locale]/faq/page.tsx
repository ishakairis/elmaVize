import { getTranslations } from 'next-intl/server';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });

  const faqs = await prisma.fAQ.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="py-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-gray-600">{t('subtitle')}</p>
        </div>

        {faqs.length > 0 ? (
          <Card>
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.id} value={`item-${index}`}>
                    <AccordionTrigger>
                      {locale === 'tr' ? faq.questionTr : faq.questionEn}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div
                        className="text-muted-foreground"
                        dangerouslySetInnerHTML={{
                          __html:
                            locale === 'tr' ? faq.answerTr : faq.answerEn,
                        }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {locale === 'tr'
                ? 'Henüz sık sorulan soru eklenmemiş.'
                : 'No frequently asked questions added yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

