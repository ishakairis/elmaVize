'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import StatusSelect from '@/components/admin/StatusSelect';
import { useAdminLocale } from '@/contexts/AdminLocaleContext';

export default function MessagesPage() {
  const { t } = useAdminLocale();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/messages-list')
      .then(res => res.json())
      .then(data => {
        setMessages(data);
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

  const stats = {
    total: messages.length,
    new: messages.filter((m: any) => m.status === 'new').length,
    read: messages.filter((m: any) => m.status === 'read').length,
    replied: messages.filter((m: any) => m.status === 'replied').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t.messages.title}</h1>
        <p className="text-gray-600 mt-1">{t.messages.subtitle}</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-gray-600">{t.common.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
            <p className="text-xs text-gray-600">{t.common.new}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-600">{stats.read}</div>
            <p className="text-xs text-gray-600">{t.messages.read}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.replied}</div>
            <p className="text-xs text-gray-600">{t.messages.replied}</p>
          </CardContent>
        </Card>
      </div>

      {/* Messages List */}
      <Card>
        <CardHeader>
          <CardTitle>{t.messages.allMessages}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.map((msg: any) => (
              <div
                key={msg.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{msg.name}</h3>
                        <p className="text-sm text-gray-600">{msg.email}</p>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1">
                      {msg.subject && (
                        <p className="text-sm">
                          <span className="font-medium">Subject:</span> {msg.subject}
                        </p>
                      )}
                      <p className="text-sm mt-2">
                        <span className="font-medium">Message:</span>
                        <br />
                        {msg.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Received: {formatDate(msg.createdAt, 'en')}
                      </p>
                    </div>
                  </div>
                  <div className="md:w-48">
                    <StatusSelect
                      id={msg.id}
                      currentStatus={msg.status}
                      type="message"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {messages.length === 0 && (
            <p className="text-center text-gray-500 py-8">{t.messages.noMessages}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
