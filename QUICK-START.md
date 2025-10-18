# 🚀 Quick Start - Elma Vize Website

**Your visa consultancy website is ready!** Follow these steps to get started.

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies
```bash
npm install
```
*This will take 1-2 minutes.*

### Step 2: Create Environment File
Create a `.env` file in the root directory and add:
```env
DATABASE_URL="file:./dev.db"
```

### Step 3: Initialize Database
```bash
npm run db:push
```
*This creates the database tables.*

### Step 4: Add Sample Data
```bash
npm run db:seed
```
*This adds sample countries, visa programs, blog posts, and FAQs.*

### Step 5: Start the Development Server
```bash
npm run dev
```

### Step 6: Open Your Browser
Visit: **http://localhost:3000**

🎉 **That's it! Your website is running!**

---

## 🎨 What You'll See

Your website now has:

- ✅ **Homepage** with hero section and featured content
- ✅ **4 Countries**: Germany, Canada, UK, Netherlands
- ✅ **3 Visa Programs**: EU Blue Card, Express Entry, Skilled Worker Visa
- ✅ **2 Blog Posts**: Sample articles
- ✅ **3 FAQs**: Common questions
- ✅ **Contact & Application Forms**: Working and saving to database

---

## 📝 Customize Your Website

### 1. Update Company Information
Edit `src/config/company.ts`:
```typescript
export const company = {
  name: {
    tr: 'Elma Vize Danışmanlık',  // Change this
    en: 'Elma Visa Consultancy',  // And this
  },
  phone: '+90 555 123 4567',      // Your phone
  email: 'info@elmavize.com',     // Your email
  // ... etc
};
```

### 2. Add Your Logo
Replace `public/logos/logo.svg` with your own logo file.

### 3. Manage Content
Open the database editor:
```bash
npm run db:studio
```

This opens at **http://localhost:5555**

You can:
- Add/edit countries
- Add/edit visa programs
- Write blog posts
- Update FAQs
- Modify static pages

---

## 🌐 Change Language

The site supports Turkish and English:

- **Turkish**: http://localhost:3000/tr
- **English**: http://localhost:3000/en

Use the language switcher in the header to toggle between languages.

---

## 📱 Test Your Website

### Mobile View
1. Open Chrome DevTools (F12)
2. Click the mobile device icon
3. Select a device (iPhone, iPad, etc.)

### Forms
Try the forms:
- **Contact Form**: http://localhost:3000/tr/contact
- **Application Form**: http://localhost:3000/tr/application

Submissions are saved in the database (view in Prisma Studio).

---

## 🚀 Deploy to Production

When you're ready to go live:

### Option 1: Vercel (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Add environment variable: `DATABASE_URL` (Vercel Postgres)
6. Deploy!

**Full deployment guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

### Option 2: Other Platforms
The site can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS
- DigitalOcean

---

## 📚 Documentation

- **[README.md](./README.md)** - Complete documentation
- **[SETUP.md](./SETUP.md)** - Detailed setup guide
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment instructions
- **[PROJECT-OVERVIEW.md](./PROJECT-OVERVIEW.md)** - Technical architecture
- **[IMPLEMENTATION-STATUS.md](./IMPLEMENTATION-STATUS.md)** - What's included

---

## 🆘 Common Issues

### "Cannot find module '@prisma/client'"
```bash
npm run db:generate
```

### "Database error"
Delete and recreate:
```bash
rm prisma/dev.db
npm run db:push
npm run db:seed
```

### "Port 3000 already in use"
```bash
npm run dev -- -p 3001
```

---

## ✅ Checklist

Before going live:

- [ ] Update company information in `src/config/company.ts`
- [ ] Replace logo in `public/logos/logo.svg`
- [ ] Add real countries and visa programs
- [ ] Write blog posts
- [ ] Update About page content
- [ ] Test all forms
- [ ] Check mobile responsiveness
- [ ] Test both languages (TR/EN)
- [ ] Set up email notifications (optional)
- [ ] Deploy to Vercel
- [ ] Set up custom domain

---

## 🎯 Next Steps

### Immediate (Today)
1. ✅ Get the site running locally
2. Update company info
3. Test all pages

### This Week
1. Add your logo
2. Write real content
3. Add actual countries and visa programs
4. Test forms

### Before Launch
1. Deploy to Vercel
2. Set up custom domain
3. Test everything in production
4. Set up email notifications

---

## 💡 Tips

1. **Use Prisma Studio** for content management - it's easier than editing files
2. **Test in both languages** - make sure translations work
3. **Mobile first** - most users will visit on mobile
4. **SEO matters** - Add good descriptions to your content
5. **Keep it updated** - Regular blog posts help with SEO

---

## 📞 Support

Need help?
- 📧 Email: info@elmavize.com
- 📖 Docs: Check the documentation files
- 🐛 Issues: Check IMPLEMENTATION-STATUS.md

---

## 🎉 Congratulations!

You now have a professional, bilingual visa consultancy website. 

**Time to make it yours!** 🚀

---

**Built with ❤️ using Next.js, TypeScript, Prisma, and Tailwind CSS**




