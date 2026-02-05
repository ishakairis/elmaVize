# Quick Setup Guide

This guide will help you get the Elma Vize website running locally in just a few minutes.

## Quick Start (5 minutes)

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages and automatically generate the Prisma client.

### 2. Set Up Database

Create a `.env` file in the root directory:

```bash
# Copy this into your .env file
DATABASE_URL="file:./dev.db"
```

Then initialize the database:

```bash
npm run db:push
```

### 3. Seed Sample Data (Optional but Recommended)

```bash
npm run db:seed
```

This creates sample countries, visa programs, blog posts, and FAQs so you can see the site in action.

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser! 🎉

## What You'll See

After seeding, the site will have:

- **Homepage** with featured programs and countries
- **4 Countries**: Germany, Canada, UK, Netherlands
- **3 Visa Programs**: EU Blue Card, Express Entry, Skilled Worker Visa
- **2 Blog Posts**: About visa applications and studying abroad
- **3 FAQs**: Common questions about visa applications
- **Contact Form** and **Application Form** (submissions saved to database)

## Viewing Your Data

To view and edit your database:

```bash
npm run db:studio
```

This opens Prisma Studio in your browser at [http://localhost:5555](http://localhost:5555).

## Language Switching

The site is bilingual (Turkish/English):

- Turkish: [http://localhost:3000/tr](http://localhost:3000/tr)
- English: [http://localhost:3000/en](http://localhost:3000/en)

Default language is Turkish.

## Customizing Company Information

Edit `src/config/company.ts`:

```typescript
export const company = {
  name: {
    tr: 'Your Company Name TR',
    en: 'Your Company Name EN',
  },
  logo: '/logos/logo.svg',
  phone: '+90 555 123 4567',
  email: 'info@yourcompany.com',
  // ... etc
};
```

## Next Steps

1. **Add Content**: Use Prisma Studio to add more countries, visa programs, and blog posts
2. **Customize Styling**: Edit `src/app/globals.css` and Tailwind classes
3. **Update Translations**: Modify `messages/tr.json` and `messages/en.json`
4. **Add Logo**: Replace `public/logos/logo.svg` with your own logo
5. **Deploy**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:push         # Update database schema
npm run db:studio       # Open database GUI
npm run db:seed         # Seed sample data
npm run db:generate     # Regenerate Prisma Client

# Code Quality
npm run lint            # Run ESLint
```

## Troubleshooting

### Error: Cannot find module '@prisma/client'

Run:
```bash
npm run db:generate
```

### Database errors

Delete the database and recreate:
```bash
rm prisma/dev.db
npm run db:push
npm run db:seed
```

### Port 3000 already in use

Either:
- Stop the process using port 3000
- Or run on a different port: `npm run dev -- -p 3001`

### Module not found errors after adding packages

```bash
rm -rf node_modules package-lock.json
npm install
```

## File Structure Overview

```
elmaVize/
├── src/
│   ├── app/[locale]/        # Pages (homepage, about, countries, etc.)
│   ├── components/          # React components
│   ├── config/              # Configuration files
│   └── lib/                 # Utility functions
├── messages/                # Translation files
├── prisma/                  # Database schema & migrations
├── public/                  # Static assets (images, logos)
└── README.md               # Full documentation
```

## Getting Help

- Check the [README.md](./README.md) for detailed documentation
- Check the [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions
- Email: info@elmavize.com

## Need to Reset Everything?

```bash
# Delete everything and start fresh
rm -rf node_modules package-lock.json prisma/dev.db .next
npm install
npm run db:push
npm run db:seed
npm run dev
```

---

**That's it!** You should now have a fully functional visa consultancy website running locally.

Happy coding! 🚀









