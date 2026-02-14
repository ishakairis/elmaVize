'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ExternalLink, Upload, Link as LinkIcon } from 'lucide-react';
import { useAdminLocale } from '@/contexts/AdminLocaleContext';
import ImageUpload from './ImageUpload';

interface ImageManagerProps {
  setting: {
    id: string;
    key: string;
    value: string;
    label: string;
    description: string | null;
    imageType: string | null;
  };
  onUpdate?: () => void;
}

export function ImageManager({ setting, onUpdate }: ImageManagerProps) {
  const { t } = useAdminLocale();
  const { toast } = useToast();
  const [imageUrl, setImageUrl] = useState(setting.value);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!imageUrl.trim()) {
      toast({
        title: 'Error',
        description: 'Image URL cannot be empty',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`/api/admin/settings/${setting.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: imageUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to update setting');
      }

      toast({
        title: t.common.save || 'Saved',
        description: `${setting.label} updated successfully`,
      });

      onUpdate?.();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update image',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{setting.label}</CardTitle>
        {setting.description && (
          <CardDescription>{setting.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Image Preview */}
        {imageUrl && (
          <div className="relative w-full h-48 border rounded overflow-hidden bg-gray-50">
            <Image
              src={imageUrl}
              alt={setting.label}
              fill
              className="object-contain"
              unoptimized
              onError={() => {
                // Show broken image placeholder
              }}
            />
          </div>
        )}

        {/* Tabs for URL or Upload */}
        <Tabs defaultValue="url" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url">
              <LinkIcon className="h-4 w-4 mr-2" />
              URL
            </TabsTrigger>
            <TabsTrigger value="upload">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </TabsTrigger>
          </TabsList>

          {/* URL Input Tab */}
          <TabsContent value="url" className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor={`image-${setting.id}`}>Image URL</Label>
              <Input
                id={`image-${setting.id}`}
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
              />
              <p className="text-xs text-muted-foreground">
                Paste an Unsplash or other image URL. For best results, use high-resolution images.
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <Button
                onClick={handleSave}
                disabled={isSaving || imageUrl === setting.value}
              >
                {isSaving ? t.common.saving : t.common.save}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('https://unsplash.com/', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Browse Unsplash
              </Button>

              {imageUrl !== setting.value && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setImageUrl(setting.value)}
                >
                  Reset
                </Button>
              )}
            </div>
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-3">
            <ImageUpload
              value={imageUrl}
              onChange={async (url) => {
                setImageUrl(url);
                // Auto-save after upload
                setIsSaving(true);
                try {
                  const response = await fetch(`/api/admin/settings/${setting.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ value: url }),
                  });

                  if (!response.ok) {
                    throw new Error('Failed to update setting');
                  }

                  toast({
                    title: t.common.save || 'Saved',
                    description: `${setting.label} updated successfully`,
                  });

                  onUpdate?.();
                } catch (error) {
                  toast({
                    title: 'Error',
                    description: 'Failed to update image',
                    variant: 'destructive',
                  });
                } finally {
                  setIsSaving(false);
                }
              }}
              onRemove={() => {
                setImageUrl('');
              }}
              folder={`elma-vize/${setting.category}`}
              label=""
              helpText="Upload an image from your computer (max 10MB). Supported formats: JPG, PNG, GIF, WebP."
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
