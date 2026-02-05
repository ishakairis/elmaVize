# Project Overview: Elma Vize Danışmanlık

## Executive Summary

This is a modern, bilingual (Turkish/English) visa consultancy website built with Next.js 15, designed to help users find visa programs, apply for consultancy services, and access information about studying and working abroad.

## Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI (headless components)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Internationalization**: next-intl

### Backend
- **Database ORM**: Prisma
- **Database**: SQLite (development) / PostgreSQL (production)
- **API Routes**: Next.js API Routes
- **Email**: Resend (optional integration)

### Development Tools
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Package Manager**: npm

## Project Architecture

### Directory Structure

```
elmaVize/
├── src/                          # Source code
│   ├── app/                      # Next.js App Router
│   │   ├── [locale]/            # Internationalized routes
│   │   │   ├── page.tsx         # Homepage
│   │   │   ├── about/           # About page
│   │   │   ├── application/     # Application form
│   │   │   ├── blog/            # Blog listing & detail
│   │   │   ├── contact/         # Contact page
│   │   │   ├── countries/       # Countries listing & detail
│   │   │   ├── education/       # Education consultancy
│   │   │   ├── faq/             # FAQs
│   │   │   ├── visas/           # Visa programs listing & detail
│   │   │   ├── work/            # Work consultancy
│   │   │   └── layout.tsx       # Locale layout
│   │   ├── api/                 # API routes
│   │   │   ├── applications/    # Application submissions
│   │   │   └── contact/         # Contact form submissions
│   │   ├── globals.css          # Global styles
│   │   └── layout.tsx           # Root layout
│   ├── components/              # React components
│   │   ├── forms/               # Form components
│   │   │   ├── ApplicationForm.tsx
│   │   │   └── ContactForm.tsx
│   │   ├── layout/              # Layout components
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/                  # UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx
│   │       ├── accordion.tsx
│   │       └── ...
│   ├── config/                  # Configuration
│   │   └── company.ts           # Company info (name, phone, email, etc.)
│   ├── hooks/                   # Custom React hooks
│   │   └── use-toast.ts
│   ├── i18n/                    # Internationalization
│   │   └── routing.ts           # i18n routing config
│   ├── lib/                     # Utility functions
│   │   ├── prisma.ts            # Prisma client
│   │   ├── utils.ts             # Helper functions
│   │   └── validations.ts       # Form schemas
│   └── types/                   # TypeScript types
│       └── index.ts
├── messages/                     # Translation files
│   ├── en.json                  # English translations
│   └── tr.json                  # Turkish translations
├── prisma/                      # Database
│   ├── schema.prisma            # Database schema
│   ├── seed.ts                  # Seed script
│   └── dev.db                   # SQLite database (dev)
├── public/                      # Static assets
│   └── logos/
│       └── logo.svg
├── .env                         # Environment variables
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md                    # Main documentation
├── SETUP.md                     # Quick setup guide
├── DEPLOYMENT.md                # Deployment guide
├── PROJECT-OVERVIEW.md          # This file
├── tailwind.config.ts
└── tsconfig.json
```

## Key Features

### 1. Internationalization (i18n)
- **Supported Languages**: Turkish (tr), English (en)
- **Default Language**: Turkish
- **URL Structure**: `/{locale}/path` (e.g., `/tr/about`, `/en/about`)
- **Language Switcher**: Available in header
- **Translation Management**: JSON files in `messages/` directory

### 2. Dynamic Content Management
All content is stored in the database and can be managed through Prisma Studio:

- **Countries**: Information about countries with visa programs
- **Visa Programs**: Different types of visa programs (work, study, tourist, etc.)
- **Blog Posts**: News and articles about visas and living abroad
- **FAQs**: Frequently asked questions
- **Static Pages**: About, Education, Work pages

### 3. Forms
Two main forms with validation:

- **Contact Form**: General inquiries
  - Fields: Name, Email, Subject, Message
  - Saves to `ContactMessage` table
  
- **Application Form**: Visa consultancy applications
  - Fields: Name, Email, Phone, Country, Visa Type, Message
  - Saves to `Application` table

### 4. Database Schema

```prisma
Country
  - id, slug, nameTr, nameEn
  - descriptionTr, descriptionEn
  - contentTr, contentEn
  - flagImage, featured, order
  - visaPrograms (relation)

VisaProgram
  - id, slug, titleTr, titleEn
  - contentTr, contentEn
  - excerptTr, excerptEn
  - visaType, featured, order
  - countryId (relation to Country)

BlogPost
  - id, slug, titleTr, titleEn
  - contentTr, contentEn
  - excerptTr, excerptEn
  - author, category, published
  - publishedAt

FAQ
  - id, questionTr, questionEn
  - answerTr, answerEn
  - order, published

Page
  - id, slug, titleTr, titleEn
  - contentTr, contentEn

Application
  - id, name, email, phone
  - countryId, visaType, message
  - status (new, contacted, processing, completed)

ContactMessage
  - id, name, email, subject, message
  - status (new, read, replied)

User
  - id, email, password, name, role
  - (For future admin panel)
```

## Page Flow & User Journey

### 1. Homepage (`/`)
- Hero section with CTA buttons
- Services overview (Visa, Education, Work)
- Featured visa programs
- Featured countries
- Why choose us section
- Final CTA section

### 2. Countries Listing (`/countries`)
- Grid of all countries
- Each card shows: Name, Description, Number of programs
- Click to view country details

### 3. Country Detail (`/countries/[slug]`)
- Country description and full content
- List of available visa programs for that country
- CTA to apply

### 4. Visa Programs Listing (`/visas`)
- Grid of all visa programs
- Shows country association
- Click to view program details

### 5. Visa Program Detail (`/visas/[slug]`)
- Full program description
- Eligibility, benefits, process
- CTA to apply

### 6. Blog Listing (`/blog`)
- Grid of published blog posts
- Shows: Title, Excerpt, Date, Author
- Click to read full post

### 7. Blog Post Detail (`/blog/[slug]`)
- Full blog post content
- Back button to blog listing
- CTA section

### 8. Application Page (`/application`)
- Application form
- Country and visa type selectors
- Submits to database

### 9. Contact Page (`/contact`)
- Contact form
- Company contact information
- Phone, Email, Address display

### 10. Static Pages
- **About** (`/about`): Company information
- **Education** (`/education`): Education consultancy services
- **Work** (`/work`): Work consultancy services
- **FAQ** (`/faq`): Accordion with Q&A

## Data Flow

### Form Submission Flow

1. User fills out form (Contact or Application)
2. Form validation (client-side with Zod)
3. Submit to API route (`/api/contact` or `/api/applications`)
4. API validates data
5. Saves to database via Prisma
6. (Optional) Sends email notification
7. Returns success/error to user
8. Shows toast notification

### Content Rendering Flow

1. Page component runs on server
2. Fetches data from database via Prisma
3. Filters by locale for translations
4. Renders with React Server Components
5. Client components handle interactivity
6. Static content is cached

## Styling System

### Tailwind CSS
- Utility-first CSS framework
- Custom color scheme defined in `tailwind.config.ts`
- CSS variables for theming in `globals.css`

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Secondary**: Gray
- **Accent**: Light blue
- **Background**: White
- **Foreground**: Dark gray

### Responsive Breakpoints
- **sm**: 640px (Mobile landscape)
- **md**: 768px (Tablet)
- **lg**: 1024px (Desktop)
- **xl**: 1280px (Large desktop)

## Component Library

### UI Components (Radix UI based)
- `Button`: Multiple variants (default, outline, ghost, link)
- `Card`: Container for content sections
- `Input`: Text input fields
- `Textarea`: Multi-line text input
- `Select`: Dropdown selector
- `Label`: Form labels
- `Accordion`: Collapsible Q&A
- `Toast`: Notifications

### Layout Components
- `Header`: Navigation bar with language switcher
- `Footer`: Footer with links and contact info

### Form Components
- `ContactForm`: Reusable contact form
- `ApplicationForm`: Visa application form

## Configuration

### Company Information (`src/config/company.ts`)
Central place for company details:
- Company name (bilingual)
- Logo path
- Contact: Phone, Email, Address
- Social media links
- Company description

### Environment Variables
- `DATABASE_URL`: Database connection string
- `RESEND_API_KEY`: Email service API key (optional)
- `EMAIL_FROM`: Sender email address (optional)
- `EMAIL_TO`: Admin email for notifications (optional)

## Development Workflow

### Local Development
1. Install dependencies: `npm install`
2. Set up database: `npm run db:push`
3. Seed data: `npm run db:seed`
4. Start dev server: `npm run dev`
5. Open Prisma Studio: `npm run db:studio`

### Making Changes

#### Adding a New Country
1. Open Prisma Studio
2. Go to Country model
3. Add new record with translations
4. Set `featured: true` to show on homepage

#### Adding a New Page
1. Create folder in `src/app/[locale]/`
2. Add `page.tsx` file
3. Update Header navigation
4. Add translations to `messages/*.json`

#### Modifying Styles
1. Edit Tailwind classes directly in components
2. Or modify `globals.css` for global styles
3. Update `tailwind.config.ts` for theme changes

## Security Considerations

### Data Validation
- All forms use Zod schemas
- Server-side validation in API routes
- Prisma prevents SQL injection

### Environment Variables
- Never commit `.env` file
- Use Vercel environment variables for production
- Keep secrets out of client-side code

### Best Practices
- HTTPS enabled (automatic with Vercel)
- Input sanitization
- Rate limiting recommended for forms
- CORS properly configured

## Performance Optimization

### Next.js Features
- **Server Components**: Reduce client-side JavaScript
- **Image Optimization**: Automatic with `next/image`
- **Font Optimization**: Google Fonts automatically optimized
- **Static Generation**: Where possible

### Database
- Indexed fields for fast queries
- Selective field fetching
- Connection pooling with Prisma

### Caching
- Add `revalidate` to pages for ISR
- Browser caching for static assets
- Database query caching

## Future Enhancements

### Admin Panel
- Authentication with NextAuth.js
- CRUD interfaces for all content
- User management
- Application tracking

### Advanced Features
- Multi-step application forms
- File upload capability
- Payment integration
- Client dashboard
- Email automation
- Analytics dashboard

### SEO Improvements
- Sitemap generation
- Robots.txt
- Open Graph tags
- Structured data (JSON-LD)
- Meta descriptions per page

## Maintenance

### Regular Tasks
1. **Weekly**: Review form submissions in Prisma Studio
2. **Monthly**: Update blog content
3. **Quarterly**: Review and update visa programs
4. **As needed**: Update company information

### Monitoring
- Check Vercel deployment logs
- Monitor form submission success rates
- Review user traffic and page performance
- Database backup (if using production DB)

## Support & Documentation

- **Main Documentation**: [README.md](./README.md)
- **Setup Guide**: [SETUP.md](./SETUP.md)
- **Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Prisma Documentation**: https://www.prisma.io/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

## License & Credits

© 2024 Elma Vize Danışmanlık. All rights reserved.

Built with:
- Next.js
- React
- TypeScript
- Prisma
- Tailwind CSS
- Radix UI









