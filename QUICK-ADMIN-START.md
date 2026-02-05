# 🚀 Quick Start: Admin Panel

## 3 Steps to Get Started

### Step 1: Create Admin User

#### Local Development:
```bash
npm run admin:create
```

#### Production (Railway):
Admin user is **automatically created** when you seed the database!

```bash
# Just run the seed script (admin is created automatically)
npm run db:seed
```

**You'll get:**
- Email: `admin@elmavize.com`
- Password: `admin123`
- ⚠️ Change this password after first login!

For custom production credentials:
```bash
railway run npm run admin:create-prod
```

### Step 2: Start Server
```bash
npm run dev
```

### Step 3: Login
Open your browser:
```
http://localhost:3000/admin/login
```

Use the credentials from Step 1!

---

## 🎯 What You Can Do Now

### ✅ Fully Functional:
- **Countries**: Add, edit, delete countries
- **Visa Programs**: Add, edit, delete programs
- **Applications**: View all, update status
- **Messages**: View all, update status
- **Dashboard**: See all statistics

### ⚠️ Use Prisma Studio:
- **Blog Posts**: `npm run db:studio` → BlogPost
- **FAQs**: `npm run db:studio` → FAQ
- **Static Pages**: `npm run db:studio` → Page

---

## 📍 Admin URLs

| Section | URL |
|---------|-----|
| Login | `/admin/login` |
| Dashboard | `/admin` |
| Countries | `/admin/countries` |
| Visa Programs | `/admin/visas` |
| Blog Posts | `/admin/blog` |
| FAQs | `/admin/faqs` |
| Pages | `/admin/pages` |
| Applications | `/admin/applications` |
| Messages | `/admin/messages` |

---

## 💡 Quick Tips

### Add a Country:
1. Go to `/admin/countries`
2. Click "Add Country"
3. Fill both Turkish and English fields
4. Check "Featured" to show on homepage
5. Save!

### Track Applications:
1. Go to `/admin/applications`
2. Find the application
3. Use dropdown to change status:
   - New → Contacted → Processing → Completed

### Manage Messages:
1. Go to `/admin/messages`
2. Find the message
3. Update status:
   - New → Read → Replied

---

## 📚 Need More Help?

- **Detailed Guide**: See `ADMIN-PANEL-GUIDE.md`
- **Complete Status**: See `CURRENT-STATUS.md`
- **Today's Work**: See `TODAYS-WORK-SUMMARY.md`

---

## 🎉 That's It!

Your admin panel is ready to use. Start by creating some countries and visa programs!

**Happy Managing! 🚀**
