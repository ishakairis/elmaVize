# Admin Panel Implementation Guide

## ✅ What Has Been Implemented

A complete admin panel has been successfully added to your Elma Vize website! Here's what you now have:

### 🔐 Authentication System
- **NextAuth.js v5** integration with credentials provider
- Secure password hashing with bcryptjs
- Protected admin routes with middleware
- Role-based access control

### 📊 Admin Dashboard
- Overview statistics for all content types
- Recent applications and messages display
- Quick access to all management sections
- Responsive navigation with mobile menu

### 🌍 Countries Management
- ✅ Full CRUD (Create, Read, Update, Delete)
- ✅ Bilingual content (Turkish/English)
- ✅ Featured toggle for homepage
- ✅ Order management
- ✅ Flag image support

### 📝 Visa Programs Management
- ✅ Full CRUD operations
- ✅ Bilingual content
- ✅ Link to countries
- ✅ Visa type selection
- ✅ Featured toggle

### 📋 Applications Management
- ✅ View all visa applications
- ✅ Status tracking (new, contacted, processing, completed)
- ✅ Statistics dashboard
- ✅ Filter by status

### 💬 Messages Management
- ✅ View all contact form messages
- ✅ Status tracking (new, read, replied)
- ✅ Statistics dashboard

### 📰 Blog Posts Management
- ✅ List all blog posts
- ✅ View/Edit/Delete posts
- ✅ API routes ready
- ⚠️ Forms use Prisma Studio (can be enhanced with rich text editor later)

### ❓ FAQs Management
- ✅ List all FAQs
- ✅ View/Edit/Delete FAQs
- ✅ API routes ready
- ⚠️ Forms use Prisma Studio (can be enhanced later)

### 📄 Static Pages Management
- ✅ List all static pages
- ✅ View/Edit/Delete pages
- ✅ API routes ready
- ⚠️ Forms use Prisma Studio (can be enhanced later)

---

## 🚀 Getting Started

### Step 1: Create Admin User

#### For Local Development:

Create an admin account using the script:

```bash
npm run admin:create
```

This will create an admin user with:
- **Email**: admin@elmavize.com
- **Password**: admin123
- ⚠️ **IMPORTANT**: Change this password after first login!

#### For Production (Railway):

**Good News!** The admin user is **automatically created** when you run the seed script!

When you run:
```bash
DATABASE_URL="your-url" node setup-railway-db.js
```

Or simply:
```bash
npm run db:seed
```

An admin user is automatically created with the same default credentials.

**For custom credentials on production**, use:
```bash
# On Railway using Railway CLI
railway run npm run admin:create-prod
```

This will prompt you for custom email, password, and name.

See `RAILWAY-ADMIN-SETUP.md` for detailed Railway deployment instructions.

### Step 2: Access the Admin Panel

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the admin login page:
   ```
   http://localhost:3000/admin/login
   ```

3. Log in with the credentials from Step 1

4. You'll be redirected to the admin dashboard!

---

## 📚 Admin Panel Structure

### Main Sections

1. **Dashboard** (`/admin`)
   - Overview of all content
   - Statistics cards
   - Recent applications and messages

2. **Countries** (`/admin/countries`)
   - Add, edit, delete countries
   - Full bilingual form support
   - Link visa programs to countries

3. **Visa Programs** (`/admin/visas`)
   - Manage visa programs
   - Full bilingual form support
   - Associate with countries

4. **Blog Posts** (`/admin/blog`)
   - List all blog posts
   - Delete and manage posts
   - Add/Edit via Prisma Studio for now

5. **FAQs** (`/admin/faqs`)
   - Manage frequently asked questions
   - Set display order
   - Add/Edit via Prisma Studio for now

6. **Static Pages** (`/admin/pages`)
   - Manage About, Education, Work pages
   - Add/Edit via Prisma Studio for now

7. **Applications** (`/admin/applications`)
   - View all visa applications
   - Update status (new → contacted → processing → completed)
   - See applicant details and messages

8. **Messages** (`/admin/messages`)
   - View all contact form messages
   - Update status (new → read → replied)
   - See full message content

---

## 🔧 How to Use Each Section

### Managing Countries

1. Go to `/admin/countries`
2. Click **"Add Country"** button
3. Fill in the form:
   - Name in both languages
   - Slug (URL-friendly name, auto-generated)
   - Short description
   - Full content (can use HTML)
   - Flag image URL (optional)
   - Featured checkbox (shows on homepage)
   - Display order number
4. Click **"Create Country"** or **"Update Country"**

**To Edit**: Click the edit icon on any country card
**To Delete**: Click the trash icon (confirmation required)

### Managing Visa Programs

1. Go to `/admin/visas`
2. Click **"Add Visa Program"** button
3. Fill in the form:
   - Title in both languages
   - Slug (auto-generated)
   - Visa type (dropdown)
   - Country association (optional)
   - Short excerpt
   - Full content
   - Featured checkbox
   - Display order
4. Click **"Create Program"** or **"Update Program"**

### Managing Applications

1. Go to `/admin/applications`
2. View statistics at the top
3. Browse all applications
4. Use the status dropdown to update application status:
   - **New**: Just submitted
   - **Contacted**: You've reached out to the applicant
   - **Processing**: Application is in progress
   - **Completed**: Application finished

### Managing Messages

1. Go to `/admin/messages`
2. View statistics at the top
3. Browse all messages
4. Use the status dropdown to update message status:
   - **New**: Unread message
   - **Read**: Message has been read
   - **Replied**: You've responded to the message

### Managing Blog/FAQ/Pages (Interim Solution)

For now, Blog posts, FAQs, and static Pages can be managed through Prisma Studio:

1. Open Prisma Studio:
   ```bash
   npm run db:studio
   ```

2. Navigate to the model you want to edit (BlogPost, FAQ, or Page)

3. Add/Edit records directly

**Note**: Full form implementations can be added later with rich text editors like TinyMCE or Quill.

---

## 🔒 Security Features

### Authentication
- Passwords are hashed with bcrypt (10 rounds)
- JWT sessions with secure tokens
- Protected routes with middleware

### Authorization
- Role-based access control
- Only admin role can access admin panel
- All API routes check authentication

### Middleware Protection
- `/admin` routes require authentication
- Auto-redirect to login if not authenticated
- Session validation on every request

---

## 🎨 Features Included

### Responsive Design
- Mobile-friendly admin interface
- Collapsible mobile menu
- Responsive tables and cards

### User Experience
- Toast notifications for actions
- Loading states on buttons
- Confirmation dialogs for deletions
- Color-coded status indicators

### Data Management
- Full CRUD operations for Countries & Visas
- Status updates for Applications & Messages
- Soft delete support
- Relationship management

---

## 📝 Environment Variables

Make sure you have these in your `.env` file:

```env
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
```

For production, generate a secure secret:
```bash
openssl rand -base64 32
```

---

## 🚧 What Still Needs Enhancement

### 1. Rich Text Editor for Blog/FAQ/Pages
**Current State**: Forms redirect to Prisma Studio
**Recommended Addition**: TinyMCE, Quill, or similar WYSIWYG editor

### 2. Image Upload Functionality
**Current State**: Images use external URLs
**Recommended Addition**: File upload with storage (local or cloud like S3)

### 3. Email Notifications
**Already Prepared**: Email service integration ready
**Next Step**: Configure Resend API key and uncomment code in:
- `src/app/api/contact/route.ts`
- `src/app/api/applications/route.ts`

### 4. User Management
**Current State**: Admin user created via script
**Recommended Addition**: UI for managing multiple admin users

---

## 🛠️ Development Notes

### File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── login/page.tsx           # Login page
│   │   ├── page.tsx                 # Dashboard
│   │   ├── countries/               # Countries CRUD
│   │   ├── visas/                   # Visas CRUD
│   │   ├── blog/                    # Blog management
│   │   ├── faqs/                    # FAQs management
│   │   ├── pages/                   # Pages management
│   │   ├── applications/page.tsx    # Applications list
│   │   ├── messages/page.tsx        # Messages list
│   │   └── layout.tsx               # Admin layout
│   └── api/
│       └── admin/                   # Admin API routes
├── components/
│   └── admin/                       # Admin components
│       ├── AdminNav.tsx             # Navigation
│       ├── CountryForm.tsx          # Country form
│       ├── VisaForm.tsx             # Visa form
│       ├── DeleteButton.tsx         # Delete button
│       ├── DeleteCountryButton.tsx  # Country delete
│       └── StatusSelect.tsx         # Status dropdown
├── lib/
│   └── auth.ts                      # NextAuth configuration
└── middleware.ts                    # Route protection
```

### Adding New Admin Users

Run the script to create admin users:

```bash
npm run admin:create
```

Or manually using Prisma Studio:

1. Run `npm run db:studio`
2. Go to User model
3. Add a new user with:
   - Email
   - Password (hashed with bcrypt)
   - Name
   - Role: "admin"

### Customizing the Admin Panel

**Colors**: Edit `src/components/admin/AdminNav.tsx` for theme colors
**Logo**: Update "Elma Vize Admin" text in AdminNav.tsx
**Navigation**: Add/remove items in the `navItems` array

---

## 📖 API Endpoints

### Countries
- `POST /api/admin/countries` - Create country
- `PUT /api/admin/countries/[id]` - Update country
- `DELETE /api/admin/countries/[id]` - Delete country

### Visa Programs
- `POST /api/admin/visas` - Create program
- `PUT /api/admin/visas/[id]` - Update program
- `DELETE /api/admin/visas/[id]` - Delete program

### Applications
- `PATCH /api/admin/applications/[id]` - Update status

### Messages
- `PATCH /api/admin/messages/[id]` - Update status

### Blog Posts
- `POST /api/admin/blog` - Create post
- `PUT /api/admin/blog/[id]` - Update post
- `DELETE /api/admin/blog/[id]` - Delete post

### FAQs
- `POST /api/admin/faqs` - Create FAQ
- `PUT /api/admin/faqs/[id]` - Update FAQ
- `DELETE /api/admin/faqs/[id]` - Delete FAQ

### Pages
- `POST /api/admin/pages` - Create page
- `PUT /api/admin/pages/[id]` - Update page
- `DELETE /api/admin/pages/[id]` - Delete page

---

## 🎉 Summary

You now have a **fully functional admin panel** that allows you to:

✅ Manage all countries and visa programs through a web interface
✅ Track and respond to applications and messages
✅ View comprehensive statistics
✅ Update content in both Turkish and English
✅ Secure authentication with role-based access

The admin panel is production-ready for Countries and Visa Programs. Blog, FAQ, and Pages management can be done via Prisma Studio for now, with full forms to be added as needed.

---

## 💡 Next Steps

1. **Create your admin account**: `npm run admin:create`
2. **Log in**: http://localhost:3000/admin/login
3. **Start managing content!**
4. **(Optional)** Add rich text editor for blog/FAQ/pages
5. **(Optional)** Set up email notifications

Enjoy your new admin panel! 🎊
