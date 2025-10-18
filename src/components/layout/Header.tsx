'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useParams, usePathname as useNextPathname } from 'next/navigation';
import { company } from '@/config/company';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe } from 'lucide-react';

export function Header() {
  const t = useTranslations();
  const params = useParams();
  const locale = (params?.locale as string) || 'tr';
  const fullPathname = useNextPathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.countries'), href: '/countries' },
    { name: t('nav.visas'), href: '/visas' },
    { name: t('nav.education'), href: '/education' },
    { name: t('nav.work'), href: '/work' },
    { name: t('nav.blog'), href: '/blog' },
    { name: t('nav.faq'), href: '/faq' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const toggleLanguage = () => {
    const newLocale = locale === 'tr' ? 'en' : 'tr';
    
    // Get the path without the current locale prefix
    // fullPathname will be like "/tr/countries" or "/en" or "/tr"
    let pathWithoutLocale = fullPathname;
    
    // Remove the current locale from the beginning
    if (pathWithoutLocale.startsWith(`/${locale}`)) {
      pathWithoutLocale = pathWithoutLocale.substring(`/${locale}`.length);
    }
    
    // If empty or just "/", make it empty string
    if (!pathWithoutLocale || pathWithoutLocale === '/') {
      pathWithoutLocale = '';
    }
    
    // Construct new URL with new locale
    window.location.href = `/${newLocale}${pathWithoutLocale}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-xl font-bold text-primary">
              {company.name[locale as 'tr' | 'en']}
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="gap-2"
          >
            <Globe className="h-4 w-4" />
            {locale.toUpperCase()}
          </Button>
          <Button asChild size="sm">
            <Link href="/application">{t('nav.application')}</Link>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-2 px-4 pb-4 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="gap-2 w-full"
              >
                <Globe className="h-4 w-4" />
                {locale === 'tr' ? 'English' : 'Türkçe'}
              </Button>
              <Button asChild size="sm" className="w-full">
                <Link href="/application">{t('nav.application')}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

