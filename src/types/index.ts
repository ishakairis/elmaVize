// Common types used across the application

export interface Locale {
  tr: string;
  en: string;
}

export interface Country {
  id: string;
  slug: string;
  nameTr: string;
  nameEn: string;
  descriptionTr: string;
  descriptionEn: string;
  contentTr: string;
  contentEn: string;
  flagImage?: string | null;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface VisaProgram {
  id: string;
  slug: string;
  titleTr: string;
  titleEn: string;
  contentTr: string;
  contentEn: string;
  excerptTr: string;
  excerptEn: string;
  visaType: string;
  featured: boolean;
  order: number;
  countryId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  id: string;
  slug: string;
  titleTr: string;
  titleEn: string;
  contentTr: string;
  contentEn: string;
  excerptTr: string;
  excerptEn: string;
  author: string;
  category: string;
  published: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface FAQ {
  id: string;
  questionTr: string;
  questionEn: string;
  answerTr: string;
  answerEn: string;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Page {
  id: string;
  slug: string;
  titleTr: string;
  titleEn: string;
  contentTr: string;
  contentEn: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  targetCountry?: string | null;
  countryId?: string | null;
  visaType?: string | null;
  programId?: string | null;
  message: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}









