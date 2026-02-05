'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Globe, 
  FileText, 
  MessageSquare, 
  ClipboardList,
  Users,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';
import { useAdminLocale } from '@/contexts/AdminLocaleContext';

interface DashboardData {
  stats: {
    countriesCount: number;
    visasCount: number;
    blogPostsCount: number;
    faqsCount: number;
    applicationsCount: number;
    messagesCount: number;
  };
  recentApplications: any[];
  recentMessages: any[];
  userName: string;
}

export default function AdminDashboard() {
  const { t } = useAdminLocale();
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">{t.common.loading}</div>
      </div>
    );
  }

  const stats = [
    {
      title: t.countries.title,
      count: data.stats.countriesCount,
      icon: Globe,
      href: '/admin/countries',
      color: 'text-blue-600',
    },
    {
      title: t.visas.title,
      count: data.stats.visasCount,
      icon: FileText,
      href: '/admin/visas',
      color: 'text-green-600',
    },
    {
      title: t.blog.title,
      count: data.stats.blogPostsCount,
      icon: FileText,
      href: '/admin/blog',
      color: 'text-purple-600',
    },
    {
      title: t.faqs.title,
      count: data.stats.faqsCount,
      icon: HelpCircle,
      href: '/admin/faqs',
      color: 'text-yellow-600',
    },
    {
      title: t.applications.title,
      count: data.stats.applicationsCount,
      icon: ClipboardList,
      href: '/admin/applications',
      color: 'text-red-600',
    },
    {
      title: t.messages.title,
      count: data.stats.messagesCount,
      icon: MessageSquare,
      href: '/admin/messages',
      color: 'text-indigo-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {t.dashboard.welcome}, {data.userName}
        </h1>
        <p className="text-gray-600 mt-2">
          {t.dashboard.overview}
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.count}</div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle>{t.dashboard.recentApplications}</CardTitle>
            <CardDescription>{t.dashboard.latestApps}</CardDescription>
          </CardHeader>
          <CardContent>
            {data.recentApplications.length === 0 ? (
              <p className="text-gray-500 text-sm">{t.dashboard.noApps}</p>
            ) : (
              <div className="space-y-4">
                {data.recentApplications.map((app: any) => (
                  <div key={app.id} className="flex items-start justify-between border-b pb-3 last:border-0">
                    <div>
                      <p className="font-medium">{app.name}</p>
                      <p className="text-sm text-gray-600">{app.email}</p>
                      <p className="text-xs text-gray-500">
                        {app.country?.nameEn || app.targetCountry || 'N/A'} • {app.visaType}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      app.status === 'new' ? 'bg-blue-100 text-blue-700' :
                      app.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                      app.status === 'processing' ? 'bg-purple-100 text-purple-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <CardTitle>{t.dashboard.recentMessages}</CardTitle>
            <CardDescription>{t.dashboard.latestMsgs}</CardDescription>
          </CardHeader>
          <CardContent>
            {data.recentMessages.length === 0 ? (
              <p className="text-gray-500 text-sm">{t.dashboard.noMsgs}</p>
            ) : (
              <div className="space-y-4">
                {data.recentMessages.map((msg: any) => (
                  <div key={msg.id} className="flex items-start justify-between border-b pb-3 last:border-0">
                    <div>
                      <p className="font-medium">{msg.name}</p>
                      <p className="text-sm text-gray-600">{msg.email}</p>
                      <p className="text-xs text-gray-500 truncate max-w-xs">
                        {msg.subject || msg.message.substring(0, 50)}...
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      msg.status === 'new' ? 'bg-blue-100 text-blue-700' :
                      msg.status === 'read' ? 'bg-gray-100 text-gray-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {msg.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
