import { prisma } from '@/lib/prisma';
import { cache } from 'react';

/**
 * Fetch a single site-wide image URL from SiteSettings
 * Cached for performance
 */
export const getSiteImage = cache(async (key: string): Promise<string | null> => {
  try {
    const setting = await prisma.siteSettings.findUnique({
      where: { key },
      select: { value: true },
    });
    
    return setting?.value || null;
  } catch (error) {
    console.error(`Error fetching site image for key "${key}":`, error);
    return null;
  }
});

/**
 * Fetch all site images for a specific category
 * Returns a Record of key-value pairs
 * Cached for performance
 */
export const getSiteImages = cache(async (category: string): Promise<Record<string, string>> => {
  try {
    const settings = await prisma.siteSettings.findMany({
      where: { category },
      select: { key: true, value: true },
    });
    
    return settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as Record<string, string>);
  } catch (error) {
    console.error(`Error fetching site images for category "${category}":`, error);
    return {};
  }
});

/**
 * Fetch all site settings (useful for admin panel)
 */
export const getAllSiteSettings = cache(async () => {
  try {
    return await prisma.siteSettings.findMany({
      orderBy: [
        { category: 'asc' },
        { createdAt: 'asc' },
      ],
    });
  } catch (error) {
    console.error('Error fetching all site settings:', error);
    return [];
  }
});
