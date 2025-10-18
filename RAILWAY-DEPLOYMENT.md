# 🚂 Railway Deployment Guide

This guide will help you deploy the Elma Vize website to Railway.app with automatic deployments.

## ✨ What You'll Get

- ✅ Automatic deployments on every Git push
- ✅ Free PostgreSQL database included
- ✅ Custom domain support
- ✅ SSL/HTTPS automatic
- ✅ Environment variables management
- ✅ $5 free credits for 30 days trial

---

## 📋 Prerequisites

1. **GitHub Account** - [Sign up](https://github.com/signup) if you don't have one
2. **Railway Account** - [Sign up](https://railway.app) (can use GitHub to sign in)
3. **Git installed** on your computer

---

## 🚀 Step-by-Step Deployment

### **Step 1: Push Your Code to GitHub**

1. **Check if you have a Git repository:**

```bash
git status
```

2. **If not initialized, create a new repository:**

```bash
git init
git add .
git commit -m "Initial commit - Ready for Railway deployment"
```

3. **Create a new repository on GitHub:**
   - Go to [github.com/new](https://github.com/new)
   - Name it: `elma-vize` (or any name you prefer)
   - Make it **Public** or **Private** (your choice)
   - **DO NOT** initialize with README (your project already has files)
   - Click "Create repository"

4. **Push your code to GitHub:**

```bash
git remote add origin https://github.com/YOUR-USERNAME/elma-vize.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

---

### **Step 2: Deploy to Railway**

1. **Go to Railway:**
   - Visit [railway.app](https://railway.app)
   - Click "Login" and sign in with GitHub
   - Authorize Railway to access your GitHub account

2. **Create a New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `elma-vize` repository
   - Click on the repository to deploy

3. **Railway will automatically:**
   - ✅ Detect that it's a Next.js project
   - ✅ Install dependencies
   - ✅ Build your application
   - ⚠️ First deployment will fail (we need to add database first)

---

### **Step 3: Add PostgreSQL Database**

1. **In your Railway project dashboard:**
   - Click "New" (top right)
   - Select "Database"
   - Choose "Add PostgreSQL"
   - Railway will create and provision the database

2. **Connect Database to Your App:**
   - Click on your PostgreSQL service
   - Go to "Variables" tab
   - You'll see `DATABASE_URL` - this is automatically available to your app
   - Railway automatically connects services in the same project

---

### **Step 4: Configure Environment Variables**

1. **Click on your web service (elma-vize)**

2. **Go to "Variables" tab**

3. **Add these variables** (click "New Variable"):

**Required:**
```
DATABASE_URL
```
*(This should already be there from PostgreSQL connection)*

**Optional (for email notifications):**
```
RESEND_API_KEY=your-resend-api-key-here
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=admin@yourdomain.com
```

**Optional (for authentication - future use):**
```
NEXTAUTH_URL=https://your-app.railway.app
NEXTAUTH_SECRET=your-secret-here
```

To generate `NEXTAUTH_SECRET`, run:
```bash
openssl rand -base64 32
```

4. **Click "Deploy"** or wait for automatic redeployment

---

### **Step 5: Initialize Database**

After deployment succeeds, you need to set up the database schema:

1. **Install Railway CLI:**

```bash
npm install -g @railway/cli
```

2. **Login to Railway:**

```bash
railway login
```

3. **Link your project:**

```bash
railway link
```
Select your project from the list.

4. **Push database schema:**

```bash
railway run npm run db:push
```

5. **Seed the database (optional but recommended):**

```bash
railway run npm run db:seed
```

---

### **Step 6: Access Your Live Website**

1. **Get your URL:**
   - In Railway dashboard, click on your web service
   - Go to "Settings" tab
   - Scroll to "Domains"
   - You'll see a URL like: `your-app.up.railway.app`
   - Click "Generate Domain" if not already generated

2. **Open your website:**
   - Click on the generated URL
   - Your website is now LIVE! 🎉

---

## 🔄 Automatic Deployments

From now on, every time you push code to GitHub:

```bash
git add .
git commit -m "Update: description of changes"
git push
```

Railway will automatically:
1. ✅ Pull the latest code
2. ✅ Install dependencies
3. ✅ Build your application
4. ✅ Deploy to production
5. ✅ Your users see the changes in ~2-3 minutes

---

## 🌐 Custom Domain (Optional)

1. **In Railway Dashboard:**
   - Click on your web service
   - Go to "Settings" → "Domains"
   - Click "Custom Domain"
   - Enter your domain: `www.yourdomain.com`

2. **Update DNS Settings:**
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Add a CNAME record:
     - Name: `www` or `@`
     - Value: `your-app.up.railway.app`
   - Wait for DNS propagation (5-30 minutes)

3. **SSL Certificate:**
   - Railway automatically generates SSL certificates
   - Your site will be available at `https://yourdomain.com`

---

## 📊 Monitoring and Management

### **View Logs:**
1. Click on your web service
2. Go to "Deployments" tab
3. Click on a deployment to view logs
4. Real-time logs show all activity

### **View Database:**

**Option 1: Using Prisma Studio (Locally)**
```bash
railway run npm run db:studio
```
Opens at `http://localhost:5555`

**Option 2: Railway Database UI**
1. Click on PostgreSQL service
2. Go to "Data" tab
3. View tables and data directly

### **Check Resource Usage:**
1. Go to "Usage" tab in your project
2. Monitor:
   - CPU usage
   - Memory usage
   - Network bandwidth
   - Current costs

---

## 💰 Cost Management

### **Set Usage Limits:**

1. **Project Settings:**
   - Click "Settings" in your project
   - Scroll to "Usage Limits"
   - Set a monthly limit (e.g., $10)
   - Railway will stop services if limit is reached

2. **Typical Costs:**
   - Small app: **$5-8/month**
   - Includes database
   - Unlimited deployments

### **Free Trial:**
- First 30 days: **$5 free credits**
- After trial: **$5/month** included in Hobby plan
- Charges only apply if you exceed limits

---

## 🛠️ Troubleshooting

### **Build Fails**

**Check build logs:**
1. Go to "Deployments" tab
2. Click on failed deployment
3. Read error messages

**Common issues:**
- Missing environment variables → Add in Variables tab
- Database not connected → Ensure PostgreSQL service is added
- TypeScript errors → Fix locally first, then push

### **Database Connection Issues**

**Error: "Can't reach database server"**

Solution:
```bash
# Pull environment variables locally
railway run npm run db:push
```

**Reset database:**
```bash
railway run npx prisma migrate reset
```

### **App Not Loading**

1. Check deployment status (should show "Success")
2. Check logs for runtime errors
3. Ensure domain is generated
4. Wait 2-3 minutes after deployment

### **Environment Variables Not Working**

1. Check spelling in Variables tab
2. Redeploy after adding variables
3. Use Railway CLI to verify:
```bash
railway variables
```

---

## 🔐 Security Best Practices

- ✅ Never commit `.env` files (already in `.gitignore`)
- ✅ Use Railway's environment variables for secrets
- ✅ Generate strong `NEXTAUTH_SECRET`
- ✅ Keep dependencies updated
- ✅ Monitor usage regularly

---

## 📱 Useful Commands

```bash
# Login to Railway
railway login

# Link project
railway link

# View environment variables
railway variables

# Run commands with Railway environment
railway run <command>

# Open project in browser
railway open

# View logs
railway logs

# Push database schema
railway run npm run db:push

# Open Prisma Studio
railway run npm run db:studio

# Seed database
railway run npm run db:seed
```

---

## 🎯 Quick Reference

| Task | Command |
|------|---------|
| Deploy | `git push` |
| Update Database | `railway run npm run db:push` |
| View Data | `railway run npm run db:studio` |
| Check Logs | Railway Dashboard → Deployments |
| Add Variables | Railway Dashboard → Variables |
| Check Costs | Railway Dashboard → Usage |

---

## 📞 Support & Resources

- **Railway Documentation:** [docs.railway.app](https://docs.railway.app)
- **Railway Discord:** [discord.gg/railway](https://discord.gg/railway)
- **Railway Status:** [status.railway.app](https://status.railway.app)
- **Pricing:** [railway.app/pricing](https://railway.app/pricing)

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Railway project created
- [ ] PostgreSQL database added
- [ ] Environment variables configured
- [ ] Database schema pushed (`railway run npm run db:push`)
- [ ] Database seeded (`railway run npm run db:seed`)
- [ ] Domain generated/custom domain configured
- [ ] Website accessible and working
- [ ] Usage limits set (optional but recommended)

---

## 🎉 You're Done!

Your website is now live and will automatically deploy every time you push to GitHub!

Share your Railway URL with users and they'll always see the latest version! 🚀

---

## Next Steps

1. **Test your live site:** Visit your Railway URL
2. **Share with users:** Send them the link
3. **Make changes:** Push to GitHub and watch automatic deployment
4. **Monitor usage:** Check Railway dashboard regularly
5. **Add custom domain:** (Optional) Configure your own domain

Happy deploying! 🎊

