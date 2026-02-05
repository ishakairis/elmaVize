# 🚀 Deployment Workflow: Local → Railway

This guide shows how to properly develop locally with SQLite and deploy to Railway with PostgreSQL.

---

## 🎯 **The Challenge:**

- **Local:** Uses SQLite (fast, simple, no setup)
- **Railway:** Uses PostgreSQL (cloud database)
- **Prisma:** Schema needs to match the database type

---

## ✅ **Solution: Simple Workflow**

### **Step 1: Develop Locally (SQLite)**

1. **Ensure schema is SQLite:**
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

2. **Ensure .env.local has:**
   ```env
   DATABASE_URL="file:./dev.db"
   ```

3. **Run dev server:**
   ```bash
   npm run dev
   ```

4. **Test at http://localhost:3000**
   - Make changes
   - Test everything
   - Verify it works

---

### **Step 2: Prepare for Deployment**

When ready to deploy, change schema to PostgreSQL:

**Edit `prisma/schema.prisma`:**
```prisma
datasource db {
  provider = "postgresql"  // Changed from sqlite
  url      = env("DATABASE_URL")
}
```

---

### **Step 3: Deploy to Railway**

```bash
# 1. Commit the PostgreSQL schema
git add prisma/schema.prisma
git commit -m "Update: ready for deployment"

# 2. Push to GitHub
git push

# 3. Railway auto-deploys with PostgreSQL!
```

---

### **Step 4: Switch Back to SQLite for Next Development**

After deploying, switch back to SQLite for local development:

**Edit `prisma/schema.prisma`:**
```prisma
datasource db {
  provider = "sqlite"  // Back to SQLite for local dev
  url      = env("DATABASE_URL")
}
```

```bash
# Regenerate Prisma client
npx prisma generate

# Continue development
npm run dev
```

---

## 🤖 **Automated Script (Coming Soon)**

For easier management, I can create scripts:
- `npm run dev:local` - Auto-switch to SQLite
- `npm run deploy:railway` - Auto-switch to PostgreSQL and push

---

## 📊 **Quick Reference:**

| Action | Database | Schema Provider | Commit? |
|--------|----------|-----------------|---------|
| Local Development | SQLite | `sqlite` | No |
| Before Deploying | - | Change to `postgresql` | Yes |
| After Deploying | SQLite | Change back to `sqlite` | Optional |

---

## ⚠️ **Important Notes:**

1. **DON'T commit with SQLite provider** if you want to deploy
2. **Railway needs PostgreSQL provider** in the schema
3. **Always test locally first** before deploying
4. **Database data is separate** - local changes don't affect production

---

## 💡 **Pro Tip:**

Create two branches:
- `main` - With PostgreSQL (for Railway)
- `development` - With SQLite (for local work)

Then merge development → main when ready to deploy!

---

## 🎯 **Simple Checklist:**

**Before Every Deployment:**

- [ ] Tested locally with SQLite
- [ ] Everything works perfectly
- [ ] Changed schema provider to `postgresql`
- [ ] Committed changes
- [ ] Pushed to GitHub
- [ ] Verified Railway deployment succeeded
- [ ] (Optional) Changed schema back to `sqlite` for next dev session

---

## 🔄 **Current Status:**

- ✅ **Local:** SQLite configured
- ✅ **Local Server:** Running on http://localhost:3000
- ⏳ **Railway:** Still using previous deployment
- 📝 **Next Deploy:** Will need to switch to PostgreSQL first

---

## 🎉 **You're All Set!**

Now you can:
1. ✅ Develop and test locally
2. ✅ See changes immediately
3. ✅ Only deploy when ready
4. ✅ Keep production stable

Happy coding! 🚀




