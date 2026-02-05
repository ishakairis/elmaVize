'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { slugify } from '@/lib/utils';
import { VisaProgram, Country } from '@prisma/client';
import { useAdminLocale } from '@/contexts/AdminLocaleContext';

interface VisaFormProps {
  visa?: VisaProgram;
  countries: Country[];
}

const visaTypes = [
  'Work Visa',
  'Student Visa',
  'Tourist Visa',
  'Business Visa',
  'Family Visa',
  'Permanent Residence',
  'Other',
];

export default function VisaForm({ visa, countries }: VisaFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useAdminLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    slug: visa?.slug || '',
    titleTr: visa?.titleTr || '',
    titleEn: visa?.titleEn || '',
    excerptTr: visa?.excerptTr || '',
    excerptEn: visa?.excerptEn || '',
    contentTr: visa?.contentTr || '',
    contentEn: visa?.contentEn || '',
    visaType: visa?.visaType || '',
    countryId: visa?.countryId || null,
    featured: visa?.featured || false,
    order: visa?.order || 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));

    if (name === 'titleEn' && !visa) {
      setFormData((prev) => ({
        ...prev,
        slug: slugify(value),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = visa
        ? `/api/admin/visas/${visa.id}`
        : '/api/admin/visas';
      
      const method = visa ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save visa program');
      }

      toast({
        title: 'Success',
        description: `Visa program ${visa ? 'updated' : 'created'} successfully`,
      });

      router.push('/admin/visas');
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save visa program',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.forms.basicInfo}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="titleEn">{t.forms.titleEn} *</Label>
              <Input
                id="titleEn"
                name="titleEn"
                value={formData.titleEn}
                onChange={handleChange}
                required
                placeholder="Work Permit Visa"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="titleTr">Title (Turkish) *</Label>
              <Input
                id="titleTr"
                name="titleTr"
                value={formData.titleTr}
                onChange={handleChange}
                required
                placeholder="Çalışma İzni Vizesi"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">{t.forms.slug} *</Label>
            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              placeholder="work-permit-visa"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="visaType">Visa Type *</Label>
              <Select
                value={formData.visaType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, visaType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select visa type" />
                </SelectTrigger>
                <SelectContent>
                  {visaTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="countryId">{t.visas.country} ({t.forms.optional})</Label>
              <Select
                value={formData.countryId || 'none'}
                onValueChange={(value) => setFormData(prev => ({ ...prev, countryId: value === 'none' ? null : value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No specific country</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country.id} value={country.id}>
                      {country.nameEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300"
              />
              <Label htmlFor="featured" className="cursor-pointer">
                {t.forms.featuredHomepage}
              </Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="order">{t.forms.displayOrder}</Label>
              <Input
                type="number"
                id="order"
                name="order"
                value={formData.order}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Short Excerpt</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="excerptEn">{t.forms.excerptEn}</Label>
            <Textarea
              id="excerptEn"
              name="excerptEn"
              value={formData.excerptEn}
              onChange={handleChange}
              rows={2}
              placeholder="Brief description for listing page"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="excerptTr">Excerpt (Turkish)</Label>
            <Textarea
              id="excerptTr"
              name="excerptTr"
              value={formData.excerptTr}
              onChange={handleChange}
              rows={2}
              placeholder="Liste sayfası için kısa açıklama"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.forms.fullContent}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contentEn">Content (English)</Label>
            <Textarea
              id="contentEn"
              name="contentEn"
              value={formData.contentEn}
              onChange={handleChange}
              rows={10}
              placeholder="Enter full content in English..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contentTr">Content (Turkish)</Label>
            <Textarea
              id="contentTr"
              name="contentTr"
              value={formData.contentTr}
              onChange={handleChange}
              rows={10}
              placeholder="Türkçe tam içeriği girin..."
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/visas')}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : visa ? 'Update Program' : 'Create Program'}
        </Button>
      </div>
    </form>
  );
}
