'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { isCloudinaryConfigured } from '@/lib/cloudinary-config';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  disabled?: boolean;
  folder?: string;
  label?: string;
  helpText?: string;
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
  disabled,
  folder = 'elma-vize',
  label = 'Upload Image',
  helpText,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  // Check if Cloudinary is configured
  const isConfigured = isCloudinaryConfigured();

  if (!isConfigured) {
    return (
      <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4">
        <p className="text-sm text-yellow-800">
          <strong>Cloudinary not configured.</strong>
          <br />
          Please set the required environment variables:
          <br />
          <code className="mt-1 block text-xs">
            NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME<br />
            NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET (or CLOUDINARY_API_SECRET)
          </code>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Image Preview */}
      {value && (
        <div className="relative w-full max-w-xs rounded-lg border border-gray-300 p-2">
          <div className="relative aspect-video w-full overflow-hidden rounded-md">
            <Image
              src={value}
              alt="Uploaded image"
              fill
              className="object-cover"
              sizes="(max-width: 384px) 100vw, 384px"
            />
          </div>
          
          {onRemove && !disabled && (
            <button
              type="button"
              onClick={onRemove}
              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow-md hover:bg-red-600 transition-colors"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {/* Upload Button */}
      {!value && (
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          signatureEndpoint="/api/admin/upload"
          options={{
            folder,
            maxFiles: 1,
            resourceType: 'image',
            clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
            maxFileSize: 10485760, // 10MB
            sources: ['local', 'url', 'camera'],
          }}
          onSuccess={(result: any) => {
            console.log('Upload SUCCESS callback:', result);
            const url = result?.info?.secure_url;
            if (url) {
              console.log('Upload successful, URL:', url);
              onChange(url);
            }
            setIsUploading(false);
          }}
          onUpload={(result: any) => {
            console.log('Upload event:', result.event, result);
            if (result.event === 'success') {
              const url = result.info.secure_url;
              console.log('Upload successful via onUpload, URL:', url);
              onChange(url);
              setIsUploading(false);
            }
          }}
          onOpen={() => {
            console.log('Upload widget opened');
            setIsUploading(true);
          }}
          onClose={() => {
            console.log('Upload widget closed');
            setIsUploading(false);
          }}
          onError={(error: any) => {
            console.error('Upload error:', error);
            setIsUploading(false);
          }}
        >
          {({ open }) => (
            <Button
              type="button"
              variant="outline"
              onClick={() => open()}
              disabled={disabled || isUploading}
              className="w-full"
            >
              <Upload className="mr-2 h-4 w-4" />
              {isUploading ? 'Uploading...' : 'Upload from Computer'}
            </Button>
          )}
        </CldUploadWidget>
      )}

      {/* Help Text */}
      {helpText && (
        <p className="text-xs text-gray-500">{helpText}</p>
      )}

      {/* Upload Another (if image exists) */}
      {value && !disabled && (
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          signatureEndpoint="/api/admin/upload"
          options={{
            folder,
            maxFiles: 1,
            resourceType: 'image',
            clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
            maxFileSize: 10485760, // 10MB
            sources: ['local', 'url', 'camera'],
          }}
          onSuccess={(result: any) => {
            console.log('Replace upload SUCCESS callback:', result);
            const url = result?.info?.secure_url;
            if (url) {
              console.log('Replace upload successful, URL:', url);
              onChange(url);
            }
            setIsUploading(false);
          }}
          onUpload={(result: any) => {
            console.log('Replace upload event:', result.event, result);
            if (result.event === 'success') {
              const url = result.info.secure_url;
              console.log('Replace upload successful via onUpload, URL:', url);
              onChange(url);
              setIsUploading(false);
            }
          }}
          onOpen={() => {
            console.log('Replace upload widget opened');
            setIsUploading(true);
          }}
          onClose={() => {
            console.log('Replace upload widget closed');
            setIsUploading(false);
          }}
          onError={(error: any) => {
            console.error('Replace upload error:', error);
            setIsUploading(false);
          }}
        >
          {({ open }) => (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => open()}
              disabled={disabled || isUploading}
            >
              <Upload className="mr-2 h-4 w-4" />
              {isUploading ? 'Uploading...' : 'Replace Image'}
            </Button>
          )}
        </CldUploadWidget>
      )}
    </div>
  );
}
