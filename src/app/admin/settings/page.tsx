'use client';

import { use, useEffect, useState } from 'react';
import { ImageManager } from '@/components/admin/ImageManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdminLocale } from '@/contexts/AdminLocaleContext';

interface SiteSetting {
  id: string;
  key: string;
  value: string;
  label: string;
  description: string | null;
  category: string;
  imageType: string | null;
}

export default function SettingsPage() {
  const { t } = useAdminLocale();
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Group settings by category
  const settingsByCategory = settings.reduce((acc, setting) => {
    if (!acc[setting.category]) {
      acc[setting.category] = [];
    }
    acc[setting.category].push(setting);
    return acc;
  }, {} as Record<string, SiteSetting[]>);

  const categories = Object.keys(settingsByCategory);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t.settings?.title || 'Site Settings'}</h1>
        <p className="text-muted-foreground mt-2">
          {t.settings?.description || 'Manage global website settings and images.'}
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No settings found. Run the seed script to create default settings.</p>
        </div>
      ) : categories.length === 1 ? (
        // Single category - no tabs
        <div className="grid grid-cols-1 gap-6">
          {settingsByCategory[categories[0]].map((setting) => (
            <ImageManager
              key={setting.id}
              setting={setting}
              onUpdate={fetchSettings}
            />
          ))}
        </div>
      ) : (
        // Multiple categories - use tabs
        <Tabs defaultValue={categories[0]} className="space-y-6">
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {t.settings?.[category] || category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {settingsByCategory[category].map((setting) => (
                  <ImageManager
                    key={setting.id}
                    setting={setting}
                    onUpdate={fetchSettings}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
