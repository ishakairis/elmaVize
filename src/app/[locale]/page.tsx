import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, GraduationCap, Briefcase, CheckCircle, Clock, Award } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Fetch featured countries and visa programs
  const featuredCountries = await prisma.country.findMany({
    where: { featured: true },
    orderBy: { order: 'asc' },
    take: 6,
  });

  const featuredPrograms = await prisma.visaProgram.findMany({
    where: { featured: true },
    orderBy: { order: 'asc' },
    take: 3,
    include: { country: true },
  });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection locale={locale} />

      {/* Services Section */}
      <ServicesSection locale={locale} />

      {/* Featured Programs */}
      {featuredPrograms.length > 0 && (
        <FeaturedProgramsSection programs={featuredPrograms} locale={locale} />
      )}

      {/* Featured Countries */}
      {featuredCountries.length > 0 && (
        <FeaturedCountriesSection countries={featuredCountries} locale={locale} />
      )}

      {/* Why Choose Us */}
      <WhyChooseUsSection locale={locale} />

      {/* CTA Section */}
      <CTASection locale={locale} />
    </div>
  );
}

async function HeroSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home.hero' });

  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {t('title')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('subtitle')}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg">
              <Link href="/application">{t('cta')}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">{t('learnMore')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

async function ServicesSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home.services' });

  const services = [
    {
      icon: Globe,
      title: t('visa.title'),
      description: t('visa.description'),
      href: '/visas',
    },
    {
      icon: GraduationCap,
      title: t('education.title'),
      description: t('education.description'),
      href: '/education',
    },
    {
      icon: Briefcase,
      title: t('work.title'),
      description: t('work.description'),
      href: '/work',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('title')}
          </h2>
        </div>
        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="px-0">
                  <Link href={service.href}>
                    Daha Fazla →
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

async function FeaturedProgramsSection({ 
  programs, 
  locale 
}: { 
  programs: any[]; 
  locale: string;
}) {
  const t = await getTranslations({ locale });

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            {t('home.featured.title')}
          </h2>
          <Button asChild variant="outline">
            <Link href="/visas">{t('home.featured.viewAll')}</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <Card key={program.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>
                  {locale === 'tr' ? program.titleTr : program.titleEn}
                </CardTitle>
                <CardDescription>
                  {program.country
                    ? locale === 'tr'
                      ? program.country.nameTr
                      : program.country.nameEn
                    : program.visaType}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {locale === 'tr' ? program.excerptTr : program.excerptEn}
                </p>
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
    </section>
  );
}

async function FeaturedCountriesSection({ 
  countries, 
  locale 
}: { 
  countries: any[]; 
  locale: string;
}) {
  const t = await getTranslations({ locale });

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            {t('countries.title')}
          </h2>
          <Button asChild variant="outline">
            <Link href="/countries">{t('common.viewAll')}</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {countries.map((country) => (
            <Card key={country.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>
                  {locale === 'tr' ? country.nameTr : country.nameEn}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {locale === 'tr'
                    ? country.descriptionTr
                    : country.descriptionEn}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="default" size="sm">
                  <Link href={`/countries/${country.slug}`}>
                    {t('countries.viewDetails')}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

async function WhyChooseUsSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home.whyUs' });

  const features = [
    {
      icon: Award,
      title: t('experience.title'),
      description: t('experience.description'),
    },
    {
      icon: CheckCircle,
      title: t('success.title'),
      description: t('success.description'),
    },
    {
      icon: Clock,
      title: t('support.title'),
      description: t('support.description'),
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('title')}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

async function CTASection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale });

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          {t('home.hero.title')}
        </h2>
        <p className="text-lg mb-8 opacity-90">{t('home.hero.subtitle')}</p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg" variant="secondary">
            <Link href="/application">{t('nav.application')}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">{t('nav.contact')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

