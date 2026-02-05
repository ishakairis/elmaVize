# Deployment Guide

This guide will help you deploy the Elma Vize website to Vercel.

## Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- PostgreSQL database (Vercel Postgres recommended)

## Step 1: Prepare Your Repository

1. **Initialize git repository (if not already done):**

```bash
git init
git add .
git commit -m "Initial commit"
```

2. **Create a GitHub repository** and push your code:

```bash
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Step 2: Set Up Vercel Postgres

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Storage" in the sidebar
3. Click "Create Database"
4. Select "Postgres"
5. Choose a name and region for your database
6. Click "Create"
7. Copy the `DATABASE_URL` connection string (you'll need this later)

## Step 3: Deploy to Vercel

1. **Import your project:**
   - Go to Vercel Dashboard
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Click "Import"

2. **Configure Build Settings:**
   - Framework Preset: Next.js
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

3. **Add Environment Variables:**

Click "Environment Variables" and add:

```
DATABASE_URL=<your-vercel-postgres-connection-string>
```

Optional environment variables:

```
RESEND_API_KEY=<your-resend-api-key>
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=admin@yourdomain.com
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=<generate-a-secret>
```

4. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete
   - Your site will be live at `your-project.vercel.app`

## Step 4: Initialize Database

After deployment, you need to push the database schema:

1. **Install Vercel CLI:**

```bash
npm i -g vercel
```

2. **Link your project:**

```bash
vercel link
```

3. **Pull environment variables:**

```bash
vercel env pull .env.local
```

4. **Push database schema:**

```bash
npm run db:push
```

5. **Seed database (optional):**

```bash
npm run db:seed
```

## Step 5: Set Up Custom Domain

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow Vercel's instructions to update your DNS settings
5. Wait for DNS propagation (can take up to 48 hours)

## Step 6: Configure Email Notifications (Optional)

### Using Resend

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain
3. Create an API key
4. Add to Vercel environment variables:
   - `RESEND_API_KEY`
   - `EMAIL_FROM`
   - `EMAIL_TO`
5. Redeploy your application

## Environment Variables Reference

### Required

- `DATABASE_URL` - PostgreSQL connection string

### Optional

- `RESEND_API_KEY` - Resend API key for email notifications
- `EMAIL_FROM` - Sender email address
- `EMAIL_TO` - Recipient email address for notifications
- `NEXTAUTH_URL` - Your production domain (for admin panel)
- `NEXTAUTH_SECRET` - Secret for NextAuth (for admin panel)

## Monitoring and Maintenance

### View Application Logs

1. Go to Vercel Dashboard
2. Select your project
3. Click on a deployment
4. View "Functions" and "Build" logs

### Database Management

Use Prisma Studio to manage your database:

```bash
vercel env pull .env.local
npm run db:studio
```

### Update Content

1. Open Prisma Studio: `npm run db:studio`
2. Edit Countries, Visa Programs, Blog Posts, FAQs, or Pages
3. Changes are reflected immediately on your site

## Troubleshooting

### Build Fails

- Check build logs in Vercel Dashboard
- Ensure all environment variables are set
- Verify `DATABASE_URL` is correct

### Database Connection Issues

- Ensure `DATABASE_URL` includes `?sslmode=require` for Vercel Postgres
- Check that IP allowlist includes Vercel's IPs (usually automatic)

### Forms Not Working

- Check API route logs in Vercel Dashboard
- Verify database schema is up to date: `npm run db:push`
- Ensure environment variables are set correctly

### Internationalization Issues

- Clear browser cache
- Check that `middleware.ts` is properly configured
- Verify locale files exist in `messages/` directory

## Continuous Deployment

Vercel automatically deploys your site when you push to your GitHub repository:

1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push
   ```
3. Vercel automatically builds and deploys

## Rollback

If you need to rollback to a previous version:

1. Go to Vercel Dashboard
2. Click "Deployments"
3. Find the working deployment
4. Click "..." → "Promote to Production"

## Performance Optimization

### Enable Caching

Add revalidation to your pages:

```typescript
export const revalidate = 3600; // Revalidate every hour
```

### Image Optimization

Next.js automatically optimizes images. Ensure you're using the `next/image` component.

### Database Optimization

- Add indexes to frequently queried fields
- Use `select` to fetch only needed data
- Implement pagination for large datasets

## Security Checklist

- [ ] Environment variables are set in Vercel (not in code)
- [ ] API routes validate input
- [ ] Database queries use parameterized queries (Prisma handles this)
- [ ] CORS is properly configured
- [ ] Rate limiting is implemented (optional)
- [ ] HTTPS is enabled (automatic with Vercel)

## Support

For deployment issues:
- Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
- Contact support: support@yourdomain.com

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Resend Documentation](https://resend.com/docs)









