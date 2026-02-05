# 🎯 Post-Deployment Setup

## Once Railway deployment succeeds, run these commands:

### Step 1: Install Railway CLI (if not already installed)

```bash
npm install -g @railway/cli
```

### Step 2: Login to Railway

```bash
railway login
```

### Step 3: Link Your Project

```bash
railway link
```

Select your `elmaVize` project from the list.

### Step 4: Initialize Database Schema

```bash
railway run npm run db:push
```

This creates all your database tables.

### Step 5: Seed Database with Initial Data

```bash
railway run npm run db:seed
```

This adds sample countries, visa programs, and FAQs.

---

## ✅ You're Done!

Your website is now live and fully functional!

### Get Your URL:

1. Go to Railway Dashboard
2. Click on your web service
3. Go to "Settings" → "Domains"
4. Click "Generate Domain" (if not already done)
5. Your site will be at: `https://your-app.up.railway.app`

---

## 🔄 Future Updates

From now on, just:

```bash
git add .
git commit -m "Your changes"
git push
```

Railway will automatically redeploy in ~2-3 minutes! 🚀





