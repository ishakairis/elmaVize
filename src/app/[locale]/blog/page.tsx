import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow flex flex-col">
              <CardHeader>
                <div className="text-sm text-muted-foreground mb-2">
                  {formatDate(post.publishedAt, locale)}
                </div>
                <CardTitle className="line-clamp-2">
                  {locale === 'tr' ? post.titleTr : post.titleEn}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {locale === 'tr' ? post.excerptTr : post.excerptEn}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button asChild variant="ghost" className="px-0">
                  <Link href={`/blog/${post.slug}`}>
                    {t('readMore')} →
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {locale === 'tr'
                ? 'Henüz blog yazısı yayınlanmamış.'
                : 'No blog posts published yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

