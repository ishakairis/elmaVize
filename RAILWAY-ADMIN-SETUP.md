# 🚂 Railway Admin User Setup Guide

## 📌 Overview

Your admin user is **automatically created** when you run the database seed script. The seed script (`prisma/seed.ts`) now includes admin user creation.

---

## ✅ Method 1: Automatic (Recommended)

When you run the Railway database setup, an admin user is automatically created:

### Using setup-railway-db.js:

```bash
DATABASE_URL="your-railway-postgres-url" node setup-railway-db.js
```

This script will:
1. ✅ Create all database tables
2. ✅ Seed sample data (countries, visas, blog, FAQs)
3. ✅ **Create admin user automatically**

**Default Admin Credentials:**
- Email: `admin@elmavize.com`
- Password: `admin123`
- ⚠️ **CHANGE THIS PASSWORD AFTER FIRST LOGIN!**

---

## 🔧 Method 2: Using Railway CLI

If you already have a Railway deployment and need to create an admin user:

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

### Step 2: Login to Railway
```bash
railway login
```

### Step 3: Link to Your Project
```bash
railway link
```
(Select your elmaVize project)

### Step 4: Create Admin User
```bash
railway run npm run admin:create
```

This will create an admin user with:
- Email: `admin@elmavize.com`
- Password: `admin123`

---

## 🌐 Method 3: Using Railway Web Console

You can also run the admin creation script directly from Railway's web interface:

1. Go to [railway.app](https://railway.app)
2. Open your **elmaVize** project
3. Click on your **web service**
4. Go to **"Deploy"** tab
5. Click **"Settings"** → **"Custom Start Command"**
6. Temporarily change the start command to:
   ```
   npm run admin:create && npm start
   ```
7. Wait for deployment to complete
8. **Change the start command back** to just `npm start`

---

## 🔐 Changing Admin Password

### Method A: Through Admin Panel (Easiest)
Once logged in, you can change your password through the admin interface (when user management is added).

### Method B: Using Railway CLI
```bash
# Connect to Railway
railway link

# Open Prisma Studio
railway run npm run db:studio
```

Then:
1. Navigate to the **User** model
2. Find your admin user
3. Generate a new password hash using bcrypt
4. Update the password field

### Method C: Create a New Admin Script

Create `scripts/change-admin-password.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function changePassword() {
  const email = 'admin@elmavize.com';
  const newPassword = 'your-new-secure-password';

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });

  console.log('✅ Password updated successfully!');
  await prisma.$disconnect();
}

changePassword();
```

Then run on Railway:
```bash
railway run tsx scripts/change-admin-password.ts
```

---

## 🎯 Accessing Admin Panel on Railway

Once your Railway deployment is live:

1. **Find your Railway URL:**
   - Go to Railway Dashboard
   - Click on your web service
   - Go to **Settings** → **Domains**
   - Copy your domain (e.g., `your-app.up.railway.app`)

2. **Access Admin Login:**
   ```
   https://your-app.up.railway.app/admin/login
   ```

3. **Login with:**
   - Email: `admin@elmavize.com`
   - Password: `admin123` (change this immediately!)

---

## 🔒 Security Best Practices

### 1. Change Default Password Immediately
The default password `admin123` is known. Change it as soon as you log in for the first time.

### 2. Use Strong Passwords
Your new password should:
- Be at least 12 characters long
- Include uppercase and lowercase letters
- Include numbers and symbols
- Not be a dictionary word

### 3. Set Strong NEXTAUTH_SECRET
In Railway environment variables, make sure you set a strong `NEXTAUTH_SECRET`:

```bash
# Generate a strong secret
openssl rand -base64 32
```

Then add it to Railway:
1. Go to your web service
2. Click **Variables** tab
3. Add new variable:
   - Key: `NEXTAUTH_SECRET`
   - Value: (paste the generated secret)

---

## 🐛 Troubleshooting

### Admin User Not Created?

**Check if admin exists:**
```bash
railway link
railway run npm run db:studio
```
Look in the User model to see if the admin exists.

**Manually create admin:**
```bash
railway run npm run admin:create
```

### Can't Login?

**Check environment variables:**
1. Go to Railway → Variables tab
2. Verify these are set:
   - `DATABASE_URL` (should be automatic from PostgreSQL service)
   - `NEXTAUTH_URL` (should be your Railway domain)
   - `NEXTAUTH_SECRET` (must be set manually)

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```
Add this to Railway environment variables.

### Forgot Admin Password?

Use Method B or C from "Changing Admin Password" section above.

---

## 📋 Quick Reference

### Default Credentials (Change After First Login!)
- **Email:** `admin@elmavize.com`
- **Password:** `admin123`
- **Admin Panel:** `https://your-domain.up.railway.app/admin/login`

### Key Railway Commands
```bash
# Link to project
railway link

# Run admin creation
railway run npm run admin:create

# Open database studio
railway run npm run db:studio

# Run seed (includes admin creation)
railway run npm run db:seed

# Push database schema
railway run npm run db:push
```

---

## ✅ Verification Checklist

After Railway deployment:

- [ ] Database tables created (`railway run npm run db:push`)
- [ ] Sample data seeded (`railway run npm run db:seed`)
- [ ] Admin user created (automatic with seed)
- [ ] Environment variables set (`NEXTAUTH_URL`, `NEXTAUTH_SECRET`)
- [ ] Can access admin login page
- [ ] Can login with default credentials
- [ ] Changed default password
- [ ] Admin panel fully functional

---

## 🎉 Summary

**Admin user creation is now automatic!** When you run the seed script (which is part of the Railway setup), an admin user is automatically created with:

- Email: `admin@elmavize.com`
- Password: `admin123`

Just remember to **change the password** after your first login!

If you need to create additional admin users or change passwords later, use the Railway CLI methods described above.

---

**Last Updated:** January 23, 2026  
**Status:** Automated ✅
