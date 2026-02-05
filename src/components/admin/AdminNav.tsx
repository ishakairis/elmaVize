'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Globe, 
  FileText, 
  HelpCircle, 
  MessageSquare, 
  ClipboardList,
  LogOut,
  Menu,
  X,
  Languages,
  User
} from 'lucide-react';
import { useState } from 'react';
import { useAdminLocale } from '@/contexts/AdminLocaleContext';

interface AdminNavProps {
  user?: {
    name?: string | null;
    email?: string | null;
  };
}

export default function AdminNav({ user }: AdminNavProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { locale, setLocale, t } = useAdminLocale();

  const navItems = [
    { href: '/admin', label: t.nav.dashboard, icon: LayoutDashboard },
    { href: '/admin/countries', label: t.nav.countries, icon: Globe },
    { href: '/admin/visas', label: t.nav.visas, icon: FileText },
    { href: '/admin/blog', label: t.nav.blog, icon: FileText },
    { href: '/admin/faqs', label: t.nav.faqs, icon: HelpCircle },
    { href: '/admin/pages', label: t.nav.pages, icon: FileText },
    { href: '/admin/applications', label: t.nav.applications, icon: ClipboardList },
    { href: '/admin/messages', label: t.nav.messages, icon: MessageSquare },
    { href: '/admin/profile', label: t.nav.profile, icon: User },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/admin" className="text-xl font-bold text-blue-600">
              {t.nav.title}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Language Switcher & User Info & Logout */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-md p-1">
              <button
                onClick={() => setLocale('en')}
                className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                  locale === 'en'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLocale('tr')}
                className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                  locale === 'tr'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                TR
              </button>
            </div>

            {user && (
              <span className="text-sm text-gray-600">
                {user.name || user.email}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t.nav.logout}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
              {/* Mobile Language Switcher */}
              <div className="px-3">
                <div className="flex items-center space-x-2 bg-gray-100 rounded-md p-1">
                  <button
                    onClick={() => setLocale('en')}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded transition-colors ${
                      locale === 'en'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLocale('tr')}
                    className={`flex-1 px-3 py-2 text-sm font-medium rounded transition-colors ${
                      locale === 'tr'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600'
                    }`}
                  >
                    Türkçe
                  </button>
                </div>
              </div>

              {user && (
                <div className="px-3 py-2 text-sm text-gray-600">
                  {user.name || user.email}
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
              >
                <LogOut className="w-4 h-4 mr-2" />
                {t.nav.logout}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
