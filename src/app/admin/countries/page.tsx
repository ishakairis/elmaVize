'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import DeleteCountryButton from '@/components/admin/DeleteCountryButton';
import { useAdminLocale } from '@/contexts/AdminLocaleContext';

export default function CountriesPage() {
  const { t } = useAdminLocale();
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/countries-list')
      .then(res => res.json())
      .then(data => {
        setCountries(data);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">{t.common.loading}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t.countries.title}</h1>
          <p className="text-gray-600 mt-1">{t.countries.subtitle}</p>
        </div>
        <Link href="/admin/countries/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            {t.countries.addCountry}
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {countries.map((country) => (
          <Card key={country.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{country.nameEn}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{country.nameTr}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Link href={`/admin/countries/${country.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <DeleteCountryButton countryId={country.id} countryName={country.nameEn} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.countries.slug}:</span>
                  <span className="font-medium">{country.slug}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.countries.visaPrograms}:</span>
                  <span className="font-medium">{country._count.visaPrograms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.countries.applications}:</span>
                  <span className="font-medium">{country._count.applications}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.countries.featured}:</span>
                  <span className={`font-medium ${country.featured ? 'text-green-600' : 'text-gray-400'}`}>
                    {country.featured ? t.common.yes : t.common.no}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.countries.order}:</span>
                  <span className="font-medium">{country.order}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {countries.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">{t.countries.noCountries}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
