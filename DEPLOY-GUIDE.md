# 🚀 How to Deploy to Railway Without Breaking Local Setup

## 🎯 The Problem

- **Local:** Needs SQLite (`provider = "sqlite"`)
- **Railway:** Needs PostgreSQL (`provider = "postgresql"`)
- **Challenge:** Same `schema.prisma` file for both!

---

## ✅ Solution: Automated Deployment Script

### **Method 1: Use the Deploy Script (Easiest!)**

Just double-click: **`deploy-to-railway.bat`**

**What it does:**
1. ✅ Temporarily changes schema to PostgreSQL
2. ✅ Commits your changes
3. ✅ Pushes to GitHub (triggers Railway deploy)
4. ✅ Immediately switches schema back to SQLite
5. ✅ Your local dev environment stays working!

**Result:** Railway gets PostgreSQL, local stays on SQLite! 🎉

---

### **Method 2: Manual Steps**

If you prefer doing it manually:

**Step 1: Make your changes locally**
```bash
# Work on your code
# Test at http://localhost:3000
npm run dev
```

**Step 2: When ready to deploy**
```bash
# Stop dev server (Ctrl + C)

# Change schema provider to postgresql
# Edit prisma/schema.prisma
# Line 10: provider = "postgresql"
```

**Step 3: Commit and push**
```bash
git add .
git commit -m "Your changes"
git push
```

**Step 4: Immediately restore local setup**
```bash
# Change schema back to sqlite
# Edit prisma/schema.prisma
# Line 10: provider = "sqlite"

# DON'T commit this change!
# Just leave it for local development
```

**Step 5: Continue local development**
```bash
npm run dev
```

---

## 📊 Workflow Diagram

```
Local Development (SQLite)
    ↓
Make changes
    ↓
Test locally ✓
    ↓
Ready to deploy?
    ↓
Change to PostgreSQL
    ↓
Commit & Push → GitHub
    ↓
Railway Auto-Deploys ✓
    ↓
Change back to SQLite (local)
    ↓
Continue local development
```

---

## 🎯 Quick Reference

| Action | Database | Commit? |
|--------|----------|---------|
| **Local Development** | SQLite | No |
| **Before Deploy** | PostgreSQL | Yes |
| **After Deploy** | SQLite | No |

---

## 💡 Pro Tips

1. **Never commit SQLite schema after deployment** - Keep it local only
2. **Always test locally first** before deploying
3. **Use the deploy script** - It automates everything!
4. **Railway doesn't see your local changes** - Only what's pushed to GitHub

---

## ⚠️ Important Notes

### **The schema file tracks two things:**

1. **Committed version (GitHub/Railway):** PostgreSQL
2. **Local uncommitted version:** SQLite

**This is perfectly fine!** Git will show `schema.prisma` as modified, but you just ignore it for local development.

### **When you run `git status`:**

You might see:
```
modified: prisma/schema.prisma
```

**This is expected!** The local SQLite version is different from the committed PostgreSQL version.

### **Before deploying again:**

Just use the deploy script or manually change to PostgreSQL, commit, push, then change back.

---

## 🎉 Example Workflow

**Day 1: Add new feature**
```bash
# Local: Working with SQLite
npm run dev
# Make changes to components, pages, etc.
# Test everything works
```

**Day 1 Evening: Deploy**
```bash
# Double-click deploy-to-railway.bat
# Enter commit message
# Done! Railway deploys, local stays on SQLite
```

**Day 2: Continue development**
```bash
# Still on SQLite locally
npm run dev
# Make more changes
# Test locally
```

**Day 2 Evening: Deploy again**
```bash
# Double-click deploy-to-railway.bat again
# That's it!
```

---

## 🆘 Troubleshooting

### **"Schema is showing as modified in Git"**
✅ This is normal! Your local uses SQLite, committed version uses PostgreSQL.

### **"Deploy script didn't work"**
Run these manually:
```powershell
# Change to PostgreSQL
(Get-Content prisma\schema.prisma) -replace 'provider = "sqlite"', 'provider = "postgresql"' | Set-Content prisma\schema.prisma

# Deploy
git add .
git commit -m "Your message"
git push

# Change back to SQLite
(Get-Content prisma\schema.prisma) -replace 'provider = "postgresql"', 'provider = "sqlite"' | Set-Content prisma\schema.prisma
```

### **"Local site broke after deployment"**
Make sure schema is back to SQLite:
```bash
# Edit prisma/schema.prisma
# Line 10: provider = "sqlite"
npx prisma generate
npm run dev
```

---

## ✅ Checklist Before Each Deployment

- [ ] All changes tested locally
- [ ] Both languages (TR/EN) work
- [ ] No console errors
- [ ] Ready to deploy
- [ ] Run `deploy-to-railway.bat` or manual steps
- [ ] Schema automatically restored to SQLite for local dev

---

## 🎊 You're All Set!

You now have:
- ✅ Fast local development (SQLite)
- ✅ Easy deployment (automated script)
- ✅ Production-ready Railway (PostgreSQL)
- ✅ No conflicts between environments

Happy coding! 🚀




