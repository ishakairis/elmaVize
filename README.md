# Elma Vize Danışmanlık / Elma Visa Consultancy

A professional visa consultancy website built with Next.js 15, TypeScript, Prisma, and Tailwind CSS.

## Features

- 🌐 **Bilingual Support** (Turkish & English) with next-intl
- 📱 **Fully Responsive** design for all devices
- 🎨 **Modern UI** with Tailwind CSS and Radix UI components
- 🗄️ **Database** with Prisma ORM (SQLite for development, PostgreSQL for production)
- 📝 **Dynamic Content Management** for Countries, Visa Programs, Blog Posts, FAQs
- 📬 **Contact & Application Forms** with database storage
- 🔍 **SEO Optimized** with proper meta tags and structured data
- ⚡ **Fast Performance** with Next.js 15 App Router and Server Components

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Database:** Prisma with SQLite (dev) / PostgreSQL (prod)
- **Internationalization:** next-intl
- **Form Validation:** Zod
- **Email:** Resend (optional)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository:**

```bash
git clone <your-repo-url>
cd elmaVize
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"

# Optional: Email service (Resend)
RESEND_API_KEY="your_resend_api_key"
EMAIL_FROM="noreply@yourdomain.com"
EMAIL_TO="admin@yourdomain.com"

# Optional: NextAuth (if implementing admin panel)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_secret_here"
```

4. **Initialize the database:**

```bash
npm run db:push
```

5. **Seed the database with sample data (optional):**

```bash
npm run db:seed
```

6. **Run the development server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Prisma Studio
- `npm run db:generate` - Generate Prisma Client
- `npm run db:seed` - Seed database with sample data

## Project Structure

```
elmaVize/
├── src/
│   ├── app/
│   │   ├── [locale]/           # Internationalized routes
│   │   │   ├── about/          # About page
│   │   │   ├── application/    # Application form
│   │   │   ├── blog/           # Blog listing & posts
│   │   │   ├── contact/        # Contact page
│   │   │   ├── countries/      # Countries & details
│   │   │   ├── education/      # Education page
│   │   │   ├── faq/            # FAQ page
│   │   │   ├── visas/          # Visa programs
│   │   │   ├── work/           # Work page
│   │   │   └── page.tsx        # Homepage
│   │   ├── api/                # API routes
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── forms/              # Form components
│   │   ├── layout/             # Header, Footer
│   │   └── ui/                 # Reusable UI components
│   ├── config/
│   │   └── company.ts          # Company configuration
│   ├── lib/
│   │   ├── prisma.ts           # Prisma client
│   │   ├── utils.ts            # Utility functions
│   │   └── validations.ts      # Form validations
│   ├── hooks/                  # Custom React hooks
│   ├── i18n/                   # i18n configuration
│   └── types/                  # TypeScript types
├── messages/                   # Translation files
│   ├── en.json
│   └── tr.json
├── prisma/
│   └── schema.prisma           # Database schema
├── public/                     # Static assets
└── package.json
```

## Configuration

### Company Information

Edit `src/config/company.ts` to update:
- Company name (Turkish & English)
- Logo path
- Contact information (phone, email, address)
- Social media links

### Translations

Update translation files in `messages/` directory:
- `tr.json` - Turkish translations
- `en.json` - English translations

## Content Management

### Adding Countries

1. Open Prisma Studio: `npm run db:studio`
2. Navigate to "Country" model
3. Add new country with Turkish and English content
4. Set `featured: true` to display on homepage

### Adding Visa Programs

1. Open Prisma Studio: `npm run db:studio`
2. Navigate to "VisaProgram" model
3. Add new program and link to a country (optional)
4. Set `featured: true` to display on homepage

### Adding Blog Posts

1. Open Prisma Studio: `npm run db:studio`
2. Navigate to "BlogPost" model
3. Add new post with Turkish and English content
4. Set `published: true` to make it visible

### Adding FAQs

1. Open Prisma Studio: `npm run db:studio`
2. Navigate to "FAQ" model
3. Add questions and answers in both languages
4. Set order for display sequence

## Deployment

### Vercel (Recommended)

1. **Push your code to GitHub**

2. **Import project to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository

3. **Configure environment variables:**
   - Add `DATABASE_URL` for PostgreSQL (use Vercel Postgres)
   - Add other environment variables as needed

4. **Deploy:**
   - Vercel will automatically build and deploy your site
   - Set up custom domain in Vercel dashboard

### Database Migration

For production, switch from SQLite to PostgreSQL:

1. **Update `DATABASE_URL` in `.env`:**

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

2. **Update Prisma schema** (`prisma/schema.prisma`):

```prisma
datasource db {
  provider = "postgresql"  // Change from sqlite
  url      = env("DATABASE_URL")
}
```

3. **Run migrations:**

```bash
npm run db:push
```

## Email Notifications (Optional)

To enable email notifications for form submissions:

1. **Sign up for Resend:** [resend.com](https://resend.com)

2. **Add API key to `.env`:**

```env
RESEND_API_KEY="re_xxx"
EMAIL_FROM="noreply@yourdomain.com"
EMAIL_TO="admin@yourdomain.com"
```

3. **Uncomment email sending code** in:
   - `src/app/api/contact/route.ts`
   - `src/app/api/applications/route.ts`

## Customization

### Styling

- Edit `src/app/globals.css` for global styles
- Modify Tailwind config in `tailwind.config.ts`
- Update color scheme using CSS variables

### Adding New Pages

1. Create a new folder in `src/app/[locale]/`
2. Add `page.tsx` file
3. Update navigation in `src/components/layout/Header.tsx`
4. Add translations to `messages/en.json` and `messages/tr.json`

## Support

For questions or issues, please contact:
- Email: info@elmavize.com
- Phone: +90 555 123 4567

## License

Copyright © 2025 Elma Vize Danışmanlık. All rights reserved.









