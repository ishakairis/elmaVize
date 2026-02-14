import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, GraduationCap, Briefcase, CheckCircle, Clock, Award } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import * as Flags from 'country-flag-icons/react/3x2';
import { getVisaIcon, getVisaGradient } from '@/lib/visa-icons';
import { DotsPattern } from '@/components/ui/patterns';
import { getSiteImage } from '@/lib/site-images';
import Image from 'next/image';

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
  const heroBackgroundUrl = await getSiteImage('hero_background');

  return (
    <section className="relative overflow-hidden py-24 lg:py-40">
      {/* Background Image or Gradient */}
      {heroBackgroundUrl ? (
        <>
          <div className="absolute inset-0">
            <Image
              src={heroBackgroundUrl}
              alt="Hero background"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40" />
        </>
      ) : (
        <>
          {/* Fallback gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]" />
        </>
      )}
      
      {/* Pattern overlay using DotsPattern */}
      <DotsPattern className="absolute inset-0 opacity-20">
        <div />
      </DotsPattern>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className={`text-5xl font-bold tracking-tight sm:text-7xl ${heroBackgroundUrl ? 'text-white drop-shadow-lg' : 'text-gray-900'}`}>
            {t('title')}
          </h1>
          <p className={`mt-8 text-xl leading-8 font-medium ${heroBackgroundUrl ? 'text-white/95 drop-shadow' : 'text-gray-700'}`}>
            {t('subtitle')}
          </p>
          <div className="mt-12 flex items-center justify-center gap-x-6 flex-wrap gap-y-4">
            <Button asChild size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow">
              <Link href="/application">{t('cta')}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className={`text-lg px-8 py-6 border-2 ${heroBackgroundUrl ? 'bg-white/10 border-white text-white hover:bg-white hover:text-gray-900' : 'hover:bg-gray-50'}`}>
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
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: GraduationCap,
      title: t('education.title'),
      description: t('education.description'),
      href: '/education',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Briefcase,
      title: t('work.title'),
      description: t('work.description'),
      href: '/work',
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('title')}
          </h2>
        </div>
        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
              <CardHeader>
                <div className={`mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${service.gradient} shadow-lg`}>
                  <service.icon className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="mt-2">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="px-0 hover:translate-x-1 transition-transform">
                  <Link href={service.href}>
                    {locale === 'tr' ? 'Daha Fazla' : 'Learn More'} →
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
    <section className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            {t('home.featured.title')}
          </h2>
          <Button asChild variant="outline">
            <Link href="/visas">{t('home.featured.viewAll')}</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => {
            const gradient = getVisaGradient(program.visaType);
            const icon = getVisaIcon(program.visaType);
            
            return (
              <Card key={program.id} className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CardHeader>
                  <div className={`mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-md`}>
                    {icon}
                  </div>
                  <CardTitle className="text-center">
                    {locale === 'tr' ? program.titleTr : program.titleEn}
                  </CardTitle>
                  <CardDescription className="text-center flex items-center justify-center gap-2 flex-wrap">
                    <Badge variant="secondary">{program.visaType}</Badge>
                    {program.country && (
                      <span>
                        {locale === 'tr'
                          ? program.country.nameTr
                          : program.country.nameEn}
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4 text-center">
                    {locale === 'tr' ? program.excerptTr : program.excerptEn}
                  </p>
                  <div className="flex justify-center">
                    <Button asChild variant="default" size="sm">
                      <Link href={`/visas/${program.slug}`}>
                        {t('common.readMore')}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900">
            {t('countries.title')}
          </h2>
          <Button asChild variant="outline" size="lg">
            <Link href="/countries">{t('common.viewAll')}</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {countries.map((country) => {
            const FlagComponent = country.iso2Code && (Flags as any)[country.iso2Code];
            
            return (
              <Card key={country.id} className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="pb-4">
                  {FlagComponent && (
                    <div className="mb-6 flex justify-center">
                      {React.createElement(FlagComponent, { 
                        className: "w-28 h-21 rounded shadow-lg" 
                      })}
                    </div>
                  )}
                  <CardTitle className="text-center text-2xl">
                    {locale === 'tr' ? country.nameTr : country.nameEn}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-center mt-3 text-base">
                    {locale === 'tr'
                      ? country.descriptionTr
                      : country.descriptionEn}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center pt-2">
                  <Button asChild variant="default">
                    <Link href={`/countries/${country.slug}`}>
                      {t('countries.viewDetails')}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
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
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: CheckCircle,
      title: t('success.title'),
      description: t('success.description'),
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Clock,
      title: t('support.title'),
      description: t('support.description'),
      gradient: 'from-blue-500 to-indigo-500',
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            {t('title')}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="text-center group hover:-translate-y-1 transition-transform duration-300">
              <div className={`mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:shadow-xl transition-shadow`}>
                <feature.icon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{feature.description}</p>
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
    <section className="relative py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,.05)_75%)] bg-[length:40px_40px] opacity-20" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
          {t('home.hero.title')}
        </h2>
        <p className="text-xl mb-12 opacity-95 max-w-2xl mx-auto leading-relaxed">
          {t('home.hero.subtitle')}
        </p>
        <div className="flex gap-6 justify-center flex-wrap">
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow">
            <Link href="/application">{t('nav.application')}</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 border-white hover:bg-white hover:text-primary transition-colors">
            <Link href="/contact">{t('nav.contact')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

