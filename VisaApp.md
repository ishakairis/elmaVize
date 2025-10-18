# Website Development Task

We need to develop a **visa consultancy website** for **Elma Vize Danışmanlık** using **Next.js, React, and TypeScript**.  
The website should be professional, clean, and easy to maintain. The implementation should balance simplicity with scalability (not overcomplicated, not oversimplified).

---

## General Requirements
1. The site must be **bilingual (Turkish and English)**.  
   - Language switcher in the navbar or header.  
   - Default language: Turkish.  

2. The following information must be **configurable from a single config file** (not hard-coded):  
   - Company name  
   - Logo  
   - Instagram account link  
   - Phone number(s)  
   - Address  
   - Email  

3. The site should use **responsive design** for desktop and mobile.  
4. Pages should have **SEO-friendly structure** with meta tags configurable.  
5. Use **server-side rendering (SSR)** or **static site generation (SSG)** where appropriate.  
6. Styling: clean, modern, minimalistic design (TailwindCSS preferred).  

---

## Pages & Features
1. **Homepage (Anasayfa)**  
   - Hero section with company name, logo, contact info.  
   - Highlights of services.  
   - CTA buttons (Başvuru Yap, İletişim).  

2. **About Us (Hakkımızda)**  
   - Content editable from admin panel.  
   - Must mention TÜRSAB membership, years of operation, services provided.  

3. **Countries (Ülkeler)**  
   - A list/grid of countries with visa consultancy services.  
   - Each country should have a detail page (with description, requirements).  
   - Data should be dynamically manageable from the admin panel.  

4. **Application Form (Başvuru Yap)**  
   - A simple form with fields:  
     - Name & Surname  
     - Target Country  
     - Visa Type  
     - Phone  
     - Email  
   - Submissions stored in database (SQLite/Postgres/MySQL) and sent by email.  

5. **Advanced Forms (to be implemented later)**  
   - Similar to https://www.ayajourneys.com form structure (4 types of forms).  
   - Each form with multiple fields and steps.  

6. **USA School Trips (ABD Okul Gezilerimiz)**  
   - Section with images, descriptions, event details.  
   - Content editable from admin panel.  

7. **FAQ (S.S.S)**  
   - List of expandable questions/answers.  
   - Editable from admin panel.  

8. **Contact (İletişim)**  
   - Contact form (name, email, message).  
   - Map embed (configurable address).  
   - Contact info (from config file).  

9. **Overseas Education (Yurtdışı Eğitim)**  
   - Page describing educational consultancy services.  
   - Editable via admin panel.  

10. **Overseas Work (Yurtdışı Çalışma)**  
   - Page describing work consultancy services.  
   - Editable via admin panel.  

11. **News / Blog (Güncel Haberler)**  
   - Blog-style page listing articles.  
   - Each article should have a detail page.  
   - Fully manageable via admin panel.  

---

## Admin Panel Requirements
- Must be simple but effective (can be a separate Next.js route or integrated backend UI).  
- Features:  
  - Add/edit/delete pages (About Us, Education, Work, News, Countries, FAQ).  
  - Manage multilingual content (Turkish/English).  
  - Upload and manage images.  
- Authentication required (basic email/password login).  

---

## Technical Notes
- **Framework:** Next.js (with App Router or Pages Router, whichever is simpler to maintain).  
- **Language:** TypeScript.  
- **Styling:** TailwindCSS.  
- **Database:** SQLite for MVP (easily switchable to Postgres/MySQL later).  
- **Auth:** Basic email/password (JWT or NextAuth if needed).  
- **Deployment Target:** Vercel (Hobby plan is fine initially).  
- **Forms:** For now, store in DB + send email notification (use Nodemailer or an external service).  
- **Config File:** All company details (logo path, phone, Instagram, address, etc.) stored in a single JSON or TS config file.  

---

## Future-Proofing
- Ability to extend forms for complex visa applications.  
- Possible CRM or dashboard integration for client management.  
- Scaling storage to cloud (AWS S3, GCP, etc.) if file uploads become necessary.  

---

# Deliverables
- A fully functional bilingual website matching the structure above.  
- Admin panel for editing content dynamically.  
- Config-driven company info.  
- Deployment instructions for Vercel.  

#Instructions
- Develop this website as a senior software engineer and software architect. Keep it simple and never overcomplicate it.