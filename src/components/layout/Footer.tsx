'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { company } from '@/config/company';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const t = useTranslations();
  const params = useParams();
  const locale = (params?.locale as string) || 'tr';

  const navigation = {
    main: [
      { name: t('nav.about'), href: '/about' },
      { name: t('nav.countries'), href: '/countries' },
      { name: t('nav.visas'), href: '/visas' },
      { name: t('nav.blog'), href: '/blog' },
      { name: t('nav.contact'), href: '/contact' },
    ],
    services: [
      { name: t('nav.education'), href: '/education' },
      { name: t('nav.work'), href: '/work' },
      { name: t('nav.faq'), href: '/faq' },
      { name: t('nav.application'), href: '/application' },
    ],
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">
              {company.name[locale as 'tr' | 'en']}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('footer.description')}
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href={`tel:${company.phone}`} className="hover:text-primary">
                  {company.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a
                  href={`mailto:${company.email}`}
                  className="hover:text-primary"
                >
                  {company.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{company.address[locale as 'tr' | 'en']}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold mb-4">
              {t('home.services.title')}
            </h3>
            <ul className="space-y-2">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} {company.name[locale as 'tr' | 'en']}.{' '}
            {t('footer.rights')}
          </p>

          {/* Social Links */}
          {company.social.instagram && (
            <div className="flex gap-4">
              <a
                href={company.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

