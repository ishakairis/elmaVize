'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export function ContactForm() {
  const t = useTranslations('contact.form');
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
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
        <Label htmlFor="subject">{t('subject')}</Label>
        <Input
          id="subject"
          name="subject"
          type="text"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="message">{t('message')}</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1"
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? t('sending') : t('submit')}
      </Button>
    </form>
  );
}





