# 🚀 Railway Deployment Checklist

## Pre-Deployment

- [ ] Code is committed and pushed to GitHub
- [ ] `.env` file is in `.gitignore` (never commit secrets!)
- [ ] All features tested locally
- [ ] Admin panel tested locally

---

## Railway Setup

### 1. Create Railway Account
- [ ] Sign up at [railway.app](https://railway.app)
- [ ] Connect your GitHub account

### 2. Create New Project
- [ ] Click "New Project"
- [ ] Select "Deploy from GitHub repo"
- [ ] Choose your `elmaVize` repository
- [ ] Railway will create a web service

### 3. Add PostgreSQL Database
- [ ] Click "New" → "Database" → "Add PostgreSQL"
- [ ] Railway automatically links it to your web service
- [ ] `DATABASE_URL` is automatically set

### 4. Configure Environment Variables
Go to your web service → Variables tab:

- [ ] `NEXTAUTH_URL` = `https://your-domain.up.railway.app`
- [ ] `NEXTAUTH_SECRET` = Generate with: `openssl rand -base64 32`
- [ ] Optional: `RESEND_API_KEY` (for email notifications)
- [ ] Optional: `EMAIL_FROM` = `noreply@yourdomain.com`
- [ ] Optional: `EMAIL_TO` = `admin@yourdomain.com`

**Important:** `DATABASE_URL` is set automatically by Railway!

---

## Database Setup

Choose ONE method:

### Method A: Using setup-railway-db.js (Easiest)

1. **Get your DATABASE_URL:**
   - Go to Railway → PostgreSQL service
   - Click "Variables" tab
   - Copy the `DATABASE_URL` value

2. **Run the setup script locally:**
   ```bash
   DATABASE_URL="postgresql://..." node setup-railway-db.js
   ```

   This will:
   - ✅ Create all database tables
   - ✅ Seed sample data
   - ✅ **Create admin user automatically**

### Method B: Using Railway CLI

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and link:**
   ```bash
   railway login
   railway link
   ```
   (Select your elmaVize project)

3. **Push schema:**
   ```bash
   railway run npm run db:push
   ```

4. **Seed database (includes admin creation):**
   ```bash
   railway run npm run db:seed
   ```

---

## Admin User Setup

**Good News!** Admin user is **automatically created** when you seed the database!

### Default Credentials:
- **Email:** `admin@elmavize.com`
- **Password:** `admin123`
- ⚠️ **CRITICAL:** Change this password immediately after first login!

### To Create Custom Admin (Optional):
```bash
railway run npm run admin:create-prod
```

This will prompt you for:
- Custom email
- Custom password (min 8 characters)
- Admin name

See `RAILWAY-ADMIN-SETUP.md` for more details.

---

## Generate Domain

- [ ] Go to your web service in Railway
- [ ] Click "Settings" → "Domains"
- [ ] Click "Generate Domain"
- [ ] Copy your domain (e.g., `elma-vize-production.up.railway.app`)

---

## Test Deployment

### 1. Test Public Website
- [ ] Visit `https://your-domain.up.railway.app`
- [ ] Check homepage loads
- [ ] Check language switcher works (TR/EN)
- [ ] Check all pages:
  - [ ] About
  - [ ] Countries
  - [ ] Visa Programs
  - [ ] Blog
  - [ ] FAQ
  - [ ] Contact
  - [ ] Application
  - [ ] Education
  - [ ] Work

### 2. Test Forms
- [ ] Submit a test contact message
- [ ] Submit a test application
- [ ] Verify they appear in admin panel

### 3. Test Admin Panel
- [ ] Go to `https://your-domain.up.railway.app/admin/login`
- [ ] Login with: `admin@elmavize.com` / `admin123`
- [ ] **IMMEDIATELY change the password!**
- [ ] Test admin features:
  - [ ] Dashboard loads with statistics
  - [ ] View countries
  - [ ] Add a new country
  - [ ] Edit a country
  - [ ] View visa programs
  - [ ] Add a new visa program
  - [ ] View applications (should see test submission)
  - [ ] Update application status
  - [ ] View messages (should see test contact)
  - [ ] Update message status

---

## Post-Deployment

### Security

- [ ] **Change admin password immediately!**
- [ ] Verify `NEXTAUTH_SECRET` is a strong random value
- [ ] Consider creating additional admin users with Railway CLI
- [ ] Never commit `.env` file to git

### Optional Enhancements

- [ ] Set up custom domain (in Railway Settings → Domains)
- [ ] Configure email notifications (add Resend API key)
- [ ] Set up monitoring/alerts
- [ ] Configure backups

### Content Management

- [ ] Login to admin panel
- [ ] Delete sample/test data
- [ ] Add your real countries
- [ ] Add your real visa programs
- [ ] Add your real blog posts (via Prisma Studio for now)
- [ ] Update FAQs (via Prisma Studio for now)
- [ ] Update About/Education/Work pages (via Prisma Studio for now)

---

## Troubleshooting

### Deployment Failed?
- Check Railway logs (web service → Deployments → View Logs)
- Verify all environment variables are set
- Check that PostgreSQL service is running

### Admin Login Not Working?
- Verify `NEXTAUTH_URL` matches your Railway domain
- Verify `NEXTAUTH_SECRET` is set
- Check that admin user was created: `railway run npm run db:studio`

### Database Not Seeded?
- Manually run: `railway run npm run db:seed`
- Check Railway logs for errors
- Verify DATABASE_URL is accessible

### Pages Show Errors?
- Check Railway logs for specific error messages
- Verify database connection
- Ensure all migrations ran successfully

---

## Quick Commands Reference

### Local Development
```bash
npm install                 # Install dependencies
npm run db:push            # Create database tables
npm run db:seed            # Seed data + create admin
npm run admin:create       # Create admin manually
npm run dev                # Start dev server
npm run db:studio          # Open Prisma Studio
```

### Railway Deployment
```bash
# Setup
railway login
railway link

# Database
railway run npm run db:push      # Create tables
railway run npm run db:seed      # Seed + admin
railway run npm run db:studio    # Open studio

# Admin
railway run npm run admin:create-prod   # Custom admin
```

---

## Success Criteria

Your deployment is successful when:

✅ Public website is accessible at your Railway URL
✅ All pages load without errors
✅ Forms can be submitted
✅ Admin login page is accessible
✅ Can login with admin credentials
✅ Admin password has been changed
✅ Can manage countries via admin panel
✅ Can manage visa programs via admin panel
✅ Can view and track applications
✅ Can view and track messages

---

## 🎉 You're Live!

Once all checkboxes are complete, your Elma Vize website is:
- ✅ Deployed to production
- ✅ Database configured and seeded
- ✅ Admin panel secured and functional
- ✅ Ready to manage content
- ✅ Ready to receive applications

**Congratulations!** 🚀

---

## Need Help?

- **Railway Setup**: See `RAILWAY-ADMIN-SETUP.md`
- **Admin Panel**: See `ADMIN-PANEL-GUIDE.md`
- **General Setup**: See `SETUP.md` or `README.md`
- **Railway Docs**: https://docs.railway.app/

---

**Last Updated:** January 23, 2026
**Admin Auto-Creation:** ✅ Enabled
