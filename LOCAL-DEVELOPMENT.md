# 🖥️ Local Development Guide

This guide shows you how to develop and test locally before deploying to Railway.

---

## 🎯 **Recommended Workflow:**

```
1. Make changes locally
2. Test on localhost:3000
3. Verify everything works
4. Commit and push to GitHub
5. Railway auto-deploys
```

---

## 🚀 **Local Development Setup:**

### **Step 1: Create Local Environment File**

Create a file named `.env.local` in your project root:

```env
DATABASE_URL="file:./dev.db"
```

This tells your local app to use SQLite (the `dev.db` file in the `prisma` folder).

### **Step 2: Ensure Local Database Exists**

Your local SQLite database should already be set up, but if you need to recreate it:

```bash
# Push schema to local database
npm run db:push

# Seed with sample data
npm run db:seed
```

### **Step 3: Start Development Server**

```bash
npm run dev
```

Your site will be available at: **http://localhost:3000**

---

## 🔍 **Testing Your Changes Locally:**

### **Test Both Languages:**
- Turkish: http://localhost:3000/tr
- English: http://localhost:3000/en

### **Test All Pages:**
- Home: http://localhost:3000
- Countries: http://localhost:3000/tr/countries
- Visas: http://localhost:3000/tr/visas
- Blog: http://localhost:3000/tr/blog
- Contact: http://localhost:3000/tr/contact
- Application: http://localhost:3000/tr/application

### **Test Features:**
- ✅ Language toggle (Globe icon in header)
- ✅ Navigation menu (header & mobile)
- ✅ Footer links
- ✅ Forms (contact, application)
- ✅ All text is properly translated

---

## 📝 **Making Changes:**

### **Example Workflow:**

1. **Make your changes** (edit files)

2. **Check the dev server** - it auto-reloads!
   - Open http://localhost:3000
   - See your changes immediately

3. **Test thoroughly:**
   - Try both languages
   - Test on mobile view (resize browser)
   - Check all pages

4. **When everything works:**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```

5. **Railway auto-deploys** (~2-3 minutes)

---

## 🗄️ **Managing Local Database:**

### **View/Edit Data:**
```bash
npm run db:studio
```
Opens Prisma Studio at http://localhost:5555

### **Reset Database:**
```bash
# Clear all data and recreate tables
npm run db:push

# Add sample data again
npm run db:seed
```

### **Add New Data:**
- Use Prisma Studio (recommended)
- Or edit `prisma/seed.ts` and run `npm run db:seed`

---

## 🔄 **Two-Database Setup:**

You'll have TWO separate databases:

| Environment | Database | File/Location |
|-------------|----------|---------------|
| **Local (Development)** | SQLite | `prisma/dev.db` |
| **Railway (Production)** | PostgreSQL | Railway cloud |

**Benefits:**
- ✅ Fast local development
- ✅ No internet needed for local testing
- ✅ Can't accidentally break production
- ✅ Test freely without worrying

---

## 🚢 **Deploying to Railway:**

### **When Ready to Deploy:**

```bash
# 1. Make sure everything works locally
npm run dev
# Test at http://localhost:3000

# 2. Commit your changes
git add .
git commit -m "Your changes"

# 3. Push to GitHub
git push

# 4. Railway automatically:
#    ✅ Detects the push
#    ✅ Builds your app
#    ✅ Deploys to production
#    ✅ Uses PostgreSQL database
```

### **Monitor Deployment:**
1. Go to [railway.app](https://railway.app)
2. Click your project
3. Watch the deployment logs
4. When status shows "Success", test your live site

---

## 🐛 **Troubleshooting:**

### **Port Already in Use:**
```bash
# Kill the process using port 3000
# Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

### **Database Issues:**
```bash
# Regenerate Prisma client
npx prisma generate

# Reset database
npm run db:push
npm run db:seed
```

### **Changes Not Showing:**
- Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Clear browser cache
- Restart dev server (`Ctrl + C`, then `npm run dev`)

---

## 📊 **Environment Variables:**

| Variable | Local (.env.local) | Railway (Production) |
|----------|-------------------|----------------------|
| DATABASE_URL | `file:./dev.db` | PostgreSQL URL |
| RESEND_API_KEY | Optional (testing) | Required (emails) |
| NEXTAUTH_URL | `http://localhost:3000` | Your Railway URL |

---

## ✅ **Development Checklist:**

Before pushing to Railway:

- [ ] Changes work on localhost:3000
- [ ] Both languages (TR/EN) work correctly
- [ ] Tested on mobile view (resize browser)
- [ ] No console errors (press F12 → Console)
- [ ] Forms work properly
- [ ] All links work
- [ ] Images load correctly

---

## 🎯 **Quick Commands Reference:**

```bash
# Start development server
npm run dev

# View/edit database
npm run db:studio

# Update database schema
npm run db:push

# Add sample data
npm run db:seed

# Lint code
npm run lint

# Build for production (test)
npm run build

# Deploy to Railway
git add .
git commit -m "Your message"
git push
```

---

## 💡 **Pro Tips:**

1. **Always test locally first** - Save time and avoid broken deployments
2. **Use Prisma Studio** - Easiest way to manage database content
3. **Check both languages** - Switch between TR/EN frequently
4. **Test mobile view** - Many users will visit from phones
5. **Commit often** - Small, frequent commits are better than large ones
6. **Write clear commit messages** - Helps track what changed

---

## 🎉 **Happy Coding!**

Remember: Local development is YOUR playground. Break things, try new ideas, experiment freely. Production (Railway) is for working features only!




