# 📸 Image Management Guide

**For Website Administrators**

This guide explains how to manage all images on your website through the admin panel. All images are currently set to high-quality stock photos from Unsplash, which you can easily replace with your own images.

---

## 🎯 Quick Overview

Your website has **two types of images**:

### 1. **Site-Wide Settings Images** (Admin → Settings)
These appear globally across your website:
- **Site Logo** - Appears in the header navigation
- **Hero Background** - Homepage main banner background
- **Team Photo** - About page team collaboration image
- **Office Photo** - About page office workspace image

### 2. **Content-Specific Images** (Per Country/Blog/Page)
Each piece of content can have its own image:
- **Countries**: Featured image (landmark/landscape photo)
- **Blog Posts**: Featured image (thumbnail for blog list)
- **Static Pages**: Featured image (page header image)

---

## 🖼️ Managing Site-Wide Images

### Step 1: Access Settings
1. Log into the admin panel at `https://your-domain.com/admin/login`
2. Click **"Settings"** in the navigation menu (⚙️ icon)

### Step 2: Update an Image
1. You'll see tabs for different categories (Branding, Hero Section, About Page)
2. Each image card has **two tabs** for adding images:
   - **URL Tab**: Paste an image link from Unsplash or any website
   - **Upload Tab**: Upload an image directly from your computer

3. **To change an image using a URL:**
   - Click the **"URL"** tab
   - Paste a new image URL in the "Image URL" field
   - Click **"Browse Unsplash"** to find free stock photos (see Step 3 below)
   - Click **"Save"** to apply changes

4. **To upload an image from your computer:**
   - Click the **"Upload"** tab
   - Click **"Upload from Computer"**
   - Select an image file (JPG, PNG, GIF, or WebP, max 10MB)
   - The image will automatically upload and save
   - You can replace it anytime by clicking **"Replace Image"**

### Step 3: Finding Images on Unsplash (Free Stock Photos)
1. Click the "Browse Unsplash" button (opens in new tab)
2. Search for your desired image (e.g., "office workspace", "team meeting", "travel")
3. Click on an image you like
4. Right-click the image → "Copy image address"
5. Paste the URL back in the admin panel
6. **Important:** Add `?w=1920&q=80` to the end of Unsplash URLs for optimal quality
   - Example: `https://images.unsplash.com/photo-123456789?w=1920&q=80`

### Step 4: Uploading Your Own Images (Requires Cloudinary Setup)
To upload images from your computer, Cloudinary must be configured:

1. **First-time setup** (developer or admin):
   - Follow the instructions in `CLOUDINARY-SETUP.md`
   - Free tier: 25GB storage, 25GB bandwidth/month (sufficient for most projects)
   - Takes about 10 minutes to set up

2. **After Cloudinary is configured:**
   - All upload tabs will be active
   - Images are automatically optimized and stored in the cloud
   - CDN delivery ensures fast loading worldwide
   - Images are organized by folder (countries, blog, pages, etc.)

3. **If you see "Cloudinary not configured":**
   - Contact your developer to set up Cloudinary
   - In the meantime, use the URL tab with Unsplash images

### Recommended Image Sizes:
- **Logo**: 300x100px (SVG preferred)
- **Hero Background**: 1920x1080px (landscape)
- **Team/Office Photos**: 1200x800px (landscape)

---

## 🌍 Managing Content-Specific Images

### For Countries:
1. Go to **Admin → Countries**
2. Click **"Edit"** on any country
3. Scroll to the **"Featured Image"** field
4. Choose either:
   - **URL Tab**: Paste an Unsplash URL of a landmark or landscape from that country
     - Example: Eiffel Tower for France, Brandenburg Gate for Germany
   - **Upload Tab**: Upload your own photo from your computer
5. Recommended size: **1200x800px**
6. Click **"Update"** to save

### For Blog Posts:
1. Go to **Admin → Blog Posts**
2. Click **"Edit"** on any post
3. Find the **"Featured Image"** card section
4. Choose either:
   - **URL Tab**: Paste an image URL relevant to your blog topic
   - **Upload Tab**: Upload your own photo from your computer
5. Recommended size: **1200x630px** (also good for social media sharing!)
6. Click **"Update"** to save

### For Static Pages:
1. Go to **Admin → Static Pages**
2. Click **"Edit"** on any page (About, Education, Work, etc.)
3. Find the **"Featured Image"** field
4. Choose either:
   - **URL Tab**: Paste a header image URL that fits the page theme
   - **Upload Tab**: Upload your own photo from your computer
5. Recommended size: **1200x400px** (banner style)
6. Click **"Update"** to save

---

## 🎨 Best Practices

### Image Selection Tips:
✅ **DO:**
- Use high-resolution images (at least 1200px wide)
- Choose images that are relevant to the content
- Prefer landscape orientation for most images
- Use professional, high-quality photos
- Check that the image URL ends with `?w=1200&q=80` for Unsplash (optimal quality)

❌ **DON'T:**
- Use very small or pixelated images
- Use images with heavy text overlays (hard to read on top of your content)
- Use portrait orientation for hero backgrounds or banners
- Forget to test how the image looks on mobile devices

### Free Stock Photo Resources:
- **Unsplash** (https://unsplash.com/) - High-quality, free images
- **Pexels** (https://www.pexels.com/) - Free stock photos and videos
- **Pixabay** (https://pixabay.com/) - Free images and illustrations

---

## 🔧 Technical Details

### How Images Are Stored:
- All images are stored as **URLs** in the database (not as uploaded files)
- The website displays images by fetching them from these URLs
- This means:
  - ✅ Zero server storage usage
  - ✅ Fast loading via external CDN
  - ✅ Easy to update - just change the URL
  - ⚠️ Images must be publicly accessible via URL

### Image Optimization:
- The website automatically optimizes images using Next.js Image component
- This provides:
  - Lazy loading (images load as you scroll)
  - Responsive sizing (different sizes for mobile/desktop)
  - Modern format conversion (WebP when supported)

### Country Flags:
- Country flags use the **country-flag-icons** library
- **No image files needed!** Flags are rendered as React components
- To display a flag: select the ISO country code (US, DE, CA, etc.) in the country form
- The flag automatically appears based on the ISO code

---

## 🚀 Future Enhancements (Phase 4 & 5)

Your system is designed to support these features when you're ready:

### Phase 4: File Upload Support (via Cloudinary)
- Upload your own images directly from the admin panel
- Automatic image optimization and CDN delivery
- Requires: Cloudinary account setup (free tier available)

### Phase 5: Rich Text Editor with Embedded Images
- Add multiple images within blog post content
- Drag-and-drop image positioning
- WYSIWYG editing experience
- Requires: Cloudinary integration + Tiptap editor installation

**Current Status:** URL-based image management is fully functional and ready to use!

---

## 📞 Need Help?

### Common Issues:

**Q: Image doesn't display**
- Check that the URL is correct and publicly accessible
- Try opening the URL in a new browser tab to verify
- Ensure the URL starts with `https://`

**Q: Image is blurry or stretched**
- Use higher resolution images (at least 1200px width)
- Check the recommended size for that specific image type

**Q: Can't find good images on Unsplash**
- Try different search terms (e.g., "business professional", "study abroad", "passport visa")
- Browse Unsplash collections for curated sets
- Check Pexels or Pixabay as alternatives

**Q: Want to upload my own photos**
- This requires Phase 4 implementation (Cloudinary integration)
- For now, you can:
  1. Upload your photo to any image hosting service (Imgur, your own server, etc.)
  2. Copy the public URL
  3. Paste it in the admin panel

---

## 📝 Quick Reference

| Location | What to Update | Where in Admin Panel |
|----------|---------------|---------------------|
| Header Logo | Site logo | Settings → Branding |
| Homepage Hero | Background image | Settings → Hero Section |
| About Page | Team/office photos | Settings → About Page |
| Country Cards | Landmark photos | Countries → Edit → Featured Image |
| Blog Thumbnails | Article images | Blog Posts → Edit → Featured Image |
| Page Headers | Page banners | Static Pages → Edit → Featured Image |
| Country Flags | Flag icons | Countries → Edit → ISO Country Code |

---

## ✅ Testing Checklist

After updating images, verify:
- [ ] Image displays correctly on desktop
- [ ] Image displays correctly on mobile
- [ ] Image loads quickly (no huge file sizes)
- [ ] Image fits well with surrounding content
- [ ] Text is readable over background images
- [ ] All images have appropriate alt text for SEO

---

**Last Updated:** Phase 3 Implementation - January 2026
**System:** Next.js 15 + Prisma + Stock Image URLs (Unsplash)
