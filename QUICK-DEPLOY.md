# 🚀 Quick Deploy to Railway (5 Minutes)

Fast track guide to get your website live ASAP!

## Step 1: Push to GitHub (2 min)

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Ready for Railway"

# Create repo on GitHub.com, then:
git remote add origin https://github.com/YOUR-USERNAME/elma-vize.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy on Railway (2 min)

1. Go to [railway.app](https://railway.app) → Login with GitHub
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your `elma-vize` repository
5. Click **"New"** → **"Database"** → **"PostgreSQL"**
6. Wait for deployment (2-3 minutes)

## Step 3: Setup Database (1 min)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and link
railway login
railway link

# Push database schema
railway run npm run db:push

# Seed database (optional)
railway run npm run db:seed
```

## Step 4: Get Your URL

1. Click on your web service in Railway
2. Go to **"Settings"** → **"Domains"**
3. Click **"Generate Domain"**
4. Open the URL → **Your site is LIVE!** 🎉

---

## Future Updates

Just push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push
```

Railway deploys automatically in ~2 minutes! ✨

---

**Need detailed instructions?** See [RAILWAY-DEPLOYMENT.md](./RAILWAY-DEPLOYMENT.md)

