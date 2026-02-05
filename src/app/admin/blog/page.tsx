'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit } from 'lucide-react';
import DeleteButton from '@/components/admin/DeleteButton';
import { formatDate } from '@/lib/utils';
import { useAdminLocale } from '@/contexts/AdminLocaleContext';

export default function BlogPage() {
  const { t } = useAdminLocale();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/blog-list')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
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
          <h1 className="text-3xl font-bold">{t.blog.title}</h1>
          <p className="text-gray-600 mt-1">{t.blog.subtitle}</p>
        </div>
        <Link href="/admin/blog/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            {t.blog.addPost}
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{post.titleEn}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{post.titleTr}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{formatDate(post.publishedAt, 'en')}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      post.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {post.published ? t.blog.published : t.blog.draft}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link href={`/admin/blog/${post.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <DeleteButton id={post.id} name={post.titleEn} type="blog" />
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {posts.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">{t.blog.noPosts}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
