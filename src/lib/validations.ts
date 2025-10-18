import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir email adresi giriniz'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalıdır'),
});

export const applicationFormSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir email adresi giriniz'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası giriniz'),
  targetCountry: z.string().min(1, 'Lütfen bir ülke seçiniz'),
  visaType: z.string().min(1, 'Lütfen vize tipi seçiniz'),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ApplicationFormData = z.infer<typeof applicationFormSchema>;



