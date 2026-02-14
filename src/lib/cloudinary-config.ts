/**
 * Cloudinary Configuration
 * 
 * This file contains configuration for Cloudinary image uploads.
 * Required environment variables:
 * - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: Your Cloudinary cloud name
 * - NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: Unsigned upload preset (optional if using signed uploads)
 * - CLOUDINARY_API_KEY: API key (for server-side operations)
 * - CLOUDINARY_API_SECRET: API secret (for signed uploads)
 */

export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '',
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY || '',
  apiSecret: process.env.CLOUDINARY_API_SECRET || '',
};

/**
 * Validates that all required Cloudinary environment variables are set
 */
export function validateCloudinaryConfig(): boolean {
  if (!cloudinaryConfig.cloudName) {
    console.warn('Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME environment variable');
    return false;
  }
  
  if (!cloudinaryConfig.uploadPreset) {
    console.warn('Missing NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET environment variable');
    return false;
  }

  // For signed uploads, we need the API key (must be NEXT_PUBLIC_ for client-side access)
  if (cloudinaryConfig.apiSecret && !cloudinaryConfig.apiKey) {
    console.warn('Missing NEXT_PUBLIC_CLOUDINARY_API_KEY - required for signed uploads');
    return false;
  }

  return true;
}

/**
 * Check if Cloudinary is configured and ready to use
 */
export function isCloudinaryConfigured(): boolean {
  const hasCloudName = !!cloudinaryConfig.cloudName;
  const hasUploadPreset = !!cloudinaryConfig.uploadPreset;
  
  // For signed uploads, both API key and secret are needed
  if (cloudinaryConfig.apiSecret) {
    return hasCloudName && hasUploadPreset && !!cloudinaryConfig.apiKey;
  }
  
  // For unsigned uploads, just need cloud name and preset
  return hasCloudName && hasUploadPreset;
}

/**
 * Get the Cloudinary image URL with transformations
 */
export function getCloudinaryImageUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'scale' | 'thumb';
    quality?: 'auto' | number;
    format?: 'auto' | 'jpg' | 'png' | 'webp';
  }
): string {
  const { cloudName } = cloudinaryConfig;
  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
  } = options || {};

  const transformations: string[] = [];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  if (quality) transformations.push(`q_${quality}`);
  if (format) transformations.push(`f_${format}`);

  const transformStr = transformations.length > 0 ? `${transformations.join(',')}` : '';

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformStr}/${publicId}`;
}
