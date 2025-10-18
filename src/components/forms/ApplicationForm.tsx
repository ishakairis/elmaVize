'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface ApplicationFormProps {
  countries: Array<{ id: string; nameTr: string; nameEn: string }>;
  visaTypes?: Array<{ value: string; labelTr: string; labelEn: string }>;
}

export function ApplicationForm({ countries, visaTypes }: ApplicationFormProps) {
  const t = useTranslations('application.form');
  const locale = useTranslations().raw('').locale || 'tr';
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedVisaType, setSelectedVisaType] = useState('');

  const defaultVisaTypes = [
    { value: 'tourist', labelTr: 'Turistik Vize', labelEn: 'Tourist Visa' },
    { value: 'work', labelTr: 'Çalışma Vizesi', labelEn: 'Work Visa' },
    { value: 'student', labelTr: 'Öğrenci Vizesi', labelEn: 'Student Visa' },
    { value: 'business', labelTr: 'İş Vizesi', labelEn: 'Business Visa' },
  ];

  const types = visaTypes || defaultVisaTypes;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      countryId: selectedCountry,
      visaType: selectedVisaType,
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: t('success'),
          variant: 'default',
        });
        e.currentTarget.reset();
        setSelectedCountry('');
        setSelectedVisaType('');
      } else {
        toast({
          title: t('error'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: t('error'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">{t('name')}</Label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="email">{t('email')}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="phone">{t('phone')}</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="country">{t('country')}</Label>
        <Select value={selectedCountry} onValueChange={setSelectedCountry} required>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder={t('countryPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.id} value={country.id}>
                {locale === 'tr' ? country.nameTr : country.nameEn}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="visaType">{t('visaType')}</Label>
        <Select value={selectedVisaType} onValueChange={setSelectedVisaType} required>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder={t('visaTypePlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            {types.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {locale === 'tr' ? type.labelTr : type.labelEn}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="message">{t('message')}</Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          className="mt-1"
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? t('submitting') : t('submit')}
      </Button>
    </form>
  );
}





