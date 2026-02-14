# Cloudinary Setup Guide

This guide walks you through setting up Cloudinary for image uploads in the Elma Vize admin panel.

## Why Cloudinary?

Cloudinary provides:
- **Free tier**: 25GB storage, 25GB bandwidth/month (sufficient for most small-medium projects)
- **Automatic optimization**: Images are automatically compressed and served in optimal formats
- **CDN delivery**: Fast image loading worldwide
- **Image transformations**: Resize, crop, and format images on-the-fly
- **Easy setup**: No complex server configuration required

## Setup Instructions

### 1. Create a Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com/)
2. Click **Sign Up for Free**
3. Complete the registration (use your business email if this is for a client)
4. Verify your email address

### 2. Get Your Credentials

After logging in to your Cloudinary dashboard:

1. Go to **Dashboard** (main page)
2. You'll see your credentials:
   - **Cloud Name**: e.g., `dqr8kqvxz`
   - **API Key**: e.g., `123456789012345`
   - **API Secret**: e.g., `AbCdEfGhIjKlMnOpQrStUvWx` (click "eye" icon to reveal)

### 3. Create an Upload Preset (Recommended for Unsigned Uploads)

Unsigned uploads are simpler to set up for development:

1. Go to **Settings** → **Upload** → **Upload presets**
2. Click **Add upload preset**
3. Configure:
   - **Signing Mode**: Change to **Unsigned**
   - **Upload preset name**: e.g., `elma-vize-uploads`
   - **Folder**: e.g., `elma-vize` (optional, organizes your uploads)
   - **Access mode**: **Public** (so images can be viewed)
   - **Unique filename**: Enable (prevents overwriting)
4. Click **Save**
5. Copy the **Upload preset name** (you'll need it for `.env`)

### 4. Configure Environment Variables

#### For Local Development

Add to your `.env.local` file:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your-upload-preset-name"
```

**Example:**
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dqr8kqvxz"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="elma-vize-uploads"
```

#### For Production (Railway/Vercel)

Add the same environment variables to your deployment platform:

**Railway:**
1. Go to your project → **Variables** tab
2. Click **+ New Variable**
3. Add:
   - Variable: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - Value: `your-cloud-name`
4. Repeat for `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`

**Vercel:**
1. Go to your project → **Settings** → **Environment Variables**
2. Add both variables for all environments (Production, Preview, Development)

### 5. Optional: Signed Uploads (More Secure - Recommended for Production)

For production, you should use signed uploads for better security:

1. Add these additional variables to your `.env.local`:

```env
NEXT_PUBLIC_CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

**Important Notes:**
- API Key must have `NEXT_PUBLIC_` prefix so the upload widget can access it
- API Secret should NOT have `NEXT_PUBLIC_` prefix (server-only)
- The app will automatically use signed uploads when both are present
- Never commit `.env.local` to Git

2. Ensure your upload preset is set to **"Signed"** mode in Cloudinary dashboard

## Testing the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Log in to the admin panel: `http://localhost:3000/admin/login`

3. Go to any form with image upload (Countries, Blog, Pages, or Settings)

4. Click the **Upload** tab

5. Try uploading an image from your computer

6. You should see:
   - Upload progress
   - Image preview after successful upload
   - The image URL saved to the database

## Folder Structure

Images are automatically organized in Cloudinary by folder:
- `elma-vize/countries/` - Country featured images
- `elma-vize/blog/` - Blog post thumbnails
- `elma-vize/pages/` - Page header images
- `elma-vize/branding/` - Site logos and branding
- `elma-vize/hero/` - Hero section images
- `elma-vize/about/` - About section images

## Viewing Uploaded Images

1. Go to your Cloudinary dashboard
2. Click **Media Library** in the left sidebar
3. Navigate through folders to see uploaded images
4. Click any image to:
   - View details
   - Get direct URL
   - Delete if needed
   - Apply transformations

## Free Tier Limits

Cloudinary's free tier includes:
- **Storage**: 25GB
- **Bandwidth**: 25GB/month
- **Transformations**: 25 credits/month
- **Media assets**: Unlimited

For most small-medium websites, this is more than sufficient. If you exceed limits:
- Upgrade to a paid plan (starts at $89/month)
- Or use URL-based images for some content (stock photos from Unsplash)

## Handoff to Client

When handing off the project to a client:

### Option 1: Transfer Ownership (Recommended)
1. Go to Cloudinary → **Settings** → **Account**
2. Click **Transfer Product**
3. Enter client's email
4. They'll receive an email to accept the transfer
5. Update environment variables with new credentials

### Option 2: Share Access
1. Go to **Settings** → **Users**
2. Click **Invite user**
3. Add client's email
4. They can access the same Cloudinary account

### Option 3: Client Creates Own Account
1. Client creates their own Cloudinary account
2. Client creates upload preset
3. Update environment variables in production (Railway/Vercel)
4. Optionally migrate existing images (can be done manually via Cloudinary)

## Troubleshooting

### "Cloudinary not configured" Error

**Problem:** Missing environment variables

**Solution:**
1. Check `.env.local` has `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
2. Check upload preset is created and variable is set
3. Restart development server after adding env vars

### Upload Fails with "Invalid signature"

**Problem:** Upload preset is set to "Signed" mode

**Solution:**
1. Go to Cloudinary → **Settings** → **Upload** → **Upload presets**
2. Edit your preset
3. Change **Signing Mode** to **Unsigned**
4. Save

### Images Not Displaying

**Problem:** Upload preset has wrong access mode

**Solution:**
1. Edit upload preset
2. Set **Access mode** to **Public**
3. Save

### "Upload preset must be whitelisted"

**Problem:** Trying to use a signed preset with unsigned uploads

**Solution:**
- Either switch to unsigned preset, OR
- Add API Key and Secret to use signed uploads

## Additional Resources

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Next-Cloudinary Docs](https://next-cloudinary.spacejelly.dev/)
- [Upload Widget Reference](https://cloudinary.com/documentation/upload_widget)
- [Image Transformations](https://cloudinary.com/documentation/image_transformations)

## Support

If you encounter issues:
1. Check the Cloudinary dashboard for error logs
2. Check browser console for client-side errors
3. Check Next.js terminal for server-side errors
4. Refer to Cloudinary's extensive documentation
5. Contact Cloudinary support (free tier includes email support)
