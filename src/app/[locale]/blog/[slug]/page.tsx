import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Card, CardContent } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale });

  const post = await prisma.blogPost.findUnique({
    where: { slug, published: true },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="py-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('blog.title')}
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
            <span>{formatDate(post.publishedAt, locale)}</span>
            <span>•</span>
            <span>{post.category}</span>
            <span>•</span>
            <span>{post.author}</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            {locale === 'tr' ? post.titleTr : post.titleEn}
          </h1>
          {(post.excerptTr || post.excerptEn) && (
            <p className="text-xl text-gray-600">
              {locale === 'tr' ? post.excerptTr : post.excerptEn}
            </p>
          )}
        </div>

        {/* Main Content */}
        <Card>
          <CardContent className="p-8">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: locale === 'tr' ? post.contentTr : post.contentEn,
              }}
            />
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                {locale === 'tr'
                  ? 'Sorularınız mı Var?'
                  : 'Have Questions?'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {locale === 'tr'
                  ? 'Bizimle iletişime geçin veya hemen başvurunuzu yapın.'
                  : 'Contact us or apply now.'}
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild>
                  <Link href="/contact">{t('nav.contact')}</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/application">{t('nav.application')}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

