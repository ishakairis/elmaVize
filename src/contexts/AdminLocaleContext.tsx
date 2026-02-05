'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import adminEn from '@/../../messages/admin-en.json';
import adminTr from '@/../../messages/admin-tr.json';

type Locale = 'en' | 'tr';

interface AdminLocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: typeof adminEn;
}

const AdminLocaleContext = createContext<AdminLocaleContextType | undefined>(undefined);

const translations = {
  en: adminEn,
  tr: adminTr,
};

export function AdminLocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  // Load locale from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('adminLocale') as Locale;
    if (saved && (saved === 'en' || saved === 'tr')) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('adminLocale', newLocale);
  };

  const value = {
    locale,
    setLocale,
    t: translations[locale],
  };

  return (
    <AdminLocaleContext.Provider value={value}>
      {children}
    </AdminLocaleContext.Provider>
  );
}

export function useAdminLocale() {
  const context = useContext(AdminLocaleContext);
  if (context === undefined) {
    throw new Error('useAdminLocale must be used within AdminLocaleProvider');
  }
  return context;
}
