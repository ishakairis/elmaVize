'use client';

import BlogForm from '@/components/admin/BlogForm';
import { useAdminLocale } from '@/contexts/AdminLocaleContext';

export default function NewBlogPage() {
  const { t } = useAdminLocale();
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t.blog.newPost}</h1>
        <p className="text-gray-600 mt-1">{t.blog.createPost}</p>
      </div>

      <BlogForm />
    </div>
  );
}
