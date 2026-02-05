'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { FAQ } from '@prisma/client';
import { useAdminLocale } from '@/contexts/AdminLocaleContext';

interface FAQFormProps {
  faq?: FAQ;
}

export default function FAQForm({ faq }: FAQFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useAdminLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    questionTr: faq?.questionTr || '',
    questionEn: faq?.questionEn || '',
    answerTr: faq?.answerTr || '',
    answerEn: faq?.answerEn || '',
    order: faq?.order || 0,
    published: faq?.published !== undefined ? faq.published : true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = faq
        ? `/api/admin/faqs/${faq.id}`
        : '/api/admin/faqs';
      
      const method = faq ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save FAQ');
      }

      toast({
        title: 'Success',
        description: `FAQ ${faq ? 'updated' : 'created'} successfully`,
      });

      router.push('/admin/faqs');
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save FAQ',
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
          <CardTitle>{t.faqs.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="questionEn">{t.forms.questionEn} *</Label>
            <Input
              id="questionEn"
              name="questionEn"
              value={formData.questionEn}
              onChange={handleChange}
              required
              placeholder="How long does visa application take?"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="questionTr">{t.forms.questionTr} *</Label>
            <Input
              id="questionTr"
              name="questionTr"
              value={formData.questionTr}
              onChange={handleChange}
              required
              placeholder="Vize başvurusu ne kadar sürer?"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.faqs.answer}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="answerEn">{t.forms.answerEn} *</Label>
            <Textarea
              id="answerEn"
              name="answerEn"
              value={formData.answerEn}
              onChange={handleChange}
              rows={6}
              required
              placeholder="Enter the answer in English..."
            />
            <p className="text-sm text-gray-500">
              {t.forms.htmlTags}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="answerTr">{t.forms.answerTr} *</Label>
            <Textarea
              id="answerTr"
              name="answerTr"
              value={formData.answerTr}
              onChange={handleChange}
              rows={6}
              required
              placeholder="Türkçe cevabı girin..."
            />
            <p className="text-sm text-gray-500">
              {t.forms.htmlTags}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.forms.settings}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
            <p className="text-sm text-gray-500">
              {t.forms.lowerFirst}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="published"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-300"
            />
            <Label htmlFor="published" className="cursor-pointer">
              {t.forms.publishedVisible}
            </Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/faqs')}
          disabled={isSubmitting}
        >
          {t.common.cancel}
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t.common.saving : faq ? t.common.update : t.common.create}
        </Button>
      </div>
    </form>
  );
}
