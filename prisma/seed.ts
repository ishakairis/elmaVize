import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create Admin User (if not exists)
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@elmavize.com' },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        email: 'admin@elmavize.com',
        password: hashedPassword,
        name: 'Admin',
        role: 'admin',
      },
    });
    console.log('✅ Created admin user');
    console.log('   Email: admin@elmavize.com');
    console.log('   Password: admin123');
    console.log('   ⚠️  IMPORTANT: Change this password after first login!');
  } else {
    console.log('ℹ️  Admin user already exists (skipping)');
  }

  // Seed Countries with ISO codes and featured images (using upsert)
  const countryData = [
    {
      slug: 'germany',
      nameTr: 'Almanya',
      nameEn: 'Germany',
      descriptionTr: 'Avrupa\'nın kalbinde çalışma ve yaşam fırsatları',
      descriptionEn: 'Work and living opportunities in the heart of Europe',
      contentTr: '<p>Almanya, güçlü ekonomisi ve yüksek yaşam standartlarıyla dikkat çeker.</p>',
      contentEn: '<p>Germany stands out with its strong economy and high living standards.</p>',
      iso2Code: 'DE',
      featuredImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80', // Berlin cityscape
      featured: true,
      order: 1,
    },
    {
      slug: 'canada',
      nameTr: 'Kanada',
      nameEn: 'Canada',
      descriptionTr: 'Çok kültürlü toplum ve yüksek yaşam kalitesi',
      descriptionEn: 'Multicultural society and high quality of life',
      contentTr: '<p>Kanada, göçmenlere açık politikaları ve güçlü ekonomisiyle bilinir.</p>',
      contentEn: '<p>Canada is known for its immigrant-friendly policies and strong economy.</p>',
      iso2Code: 'CA',
      featuredImage: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=1200&q=80', // Toronto skyline
      featured: true,
      order: 2,
    },
    {
      slug: 'uk',
      nameTr: 'İngiltere',
      nameEn: 'United Kingdom',
      descriptionTr: 'Kaliteli eğitim ve kariyer fırsatları',
      descriptionEn: 'Quality education and career opportunities',
      contentTr: '<p>İngiltere, dünya çapında tanınan üniversiteleri ve iş fırsatlarıyla öne çıkar.</p>',
      contentEn: '<p>The UK stands out with its world-renowned universities and business opportunities.</p>',
      iso2Code: 'GB',
      featuredImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80', // London
      featured: true,
      order: 3,
    },
    {
      slug: 'netherlands',
      nameTr: 'Hollanda',
      nameEn: 'Netherlands',
      descriptionTr: 'İnovasyon ve teknoloji merkezi',
      descriptionEn: 'Innovation and technology hub',
      contentTr: '<p>Hollanda, startup dostu ekosistemi ve yüksek İngilizce seviyesiyle dikkat çeker.</p>',
      contentEn: '<p>Netherlands stands out with its startup-friendly ecosystem and high English proficiency.</p>',
      iso2Code: 'NL',
      featuredImage: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1200&q=80', // Amsterdam
      featured: true,
      order: 4,
    },
  ];

  const countries = await Promise.all(
    countryData.map((data) =>
      prisma.country.upsert({
        where: { slug: data.slug },
        update: data,
        create: data,
      })
    )
  );

  console.log(`✅ Created/updated ${countries.length} countries`);

  // Seed Visa Programs (using upsert)
  const visaProgramData = [
    {
      slug: 'germany-eu-blue-card',
      titleTr: 'Almanya AB Mavi Kart',
      titleEn: 'Germany EU Blue Card',
      excerptTr: 'Yüksek nitelikli çalışanlar için özel vize programı',
      excerptEn: 'Special visa program for highly qualified workers',
      contentTr: '<h2>Almanya AB Mavi Kart</h2><p>Yüksek nitelikli çalışanlar için tasarlanmış özel bir çalışma vizesidir.</p>',
      contentEn: '<h2>Germany EU Blue Card</h2><p>A special work visa designed for highly qualified workers.</p>',
      visaType: 'WORK',
      countryId: countries[0].id,
      featured: true,
      order: 1,
    },
    {
      slug: 'canada-express-entry',
      titleTr: 'Kanada Express Entry',
      titleEn: 'Canada Express Entry',
      excerptTr: 'Kalifiye işçiler için hızlı göçmen vizesi',
      excerptEn: 'Fast-track immigration for skilled workers',
      contentTr: '<h2>Kanada Express Entry</h2><p>Kalifiye işçiler için en hızlı göçmen vizesi programıdır.</p>',
      contentEn: '<h2>Canada Express Entry</h2><p>The fastest immigration program for skilled workers.</p>',
      visaType: 'PERMANENT',
      countryId: countries[1].id,
      featured: true,
      order: 2,
    },
    {
      slug: 'uk-skilled-worker-visa',
      titleTr: 'İngiltere Kalifiye İşçi Vizesi',
      titleEn: 'UK Skilled Worker Visa',
      excerptTr: 'Nitelikli işler için çalışma vizesi',
      excerptEn: 'Work visa for skilled jobs',
      contentTr: '<h2>İngiltere Kalifiye İşçi Vizesi</h2><p>İngiltere\'de nitelikli bir işte çalışmak için gerekli vizedir.</p>',
      contentEn: '<h2>UK Skilled Worker Visa</h2><p>Required visa to work in a skilled job in the UK.</p>',
      visaType: 'WORK',
      countryId: countries[2].id,
      featured: true,
      order: 3,
    },
  ];

  const visaPrograms = await Promise.all(
    visaProgramData.map((data) =>
      prisma.visaProgram.upsert({
        where: { slug: data.slug },
        update: data,
        create: data,
      })
    )
  );

  console.log(`✅ Created/updated ${visaPrograms.length} visa programs`);

  // Seed Blog Posts (using upsert)
  const blogPostData = [
    {
      slug: 'vize-basvurusu-icin-gerekenler',
      titleTr: 'Vize Başvurusu İçin Gerekenler',
      titleEn: 'Requirements for Visa Application',
      excerptTr: 'Vize başvurusu yaparken dikkat etmeniz gereken önemli noktalar',
      excerptEn: 'Important points to consider when applying for a visa',
      contentTr: '<p>Vize başvurusu yaparken doğru belgeleri hazırlamak çok önemlidir...</p>',
      contentEn: '<p>Preparing the right documents when applying for a visa is very important...</p>',
      featuredImage: 'https://images.unsplash.com/photo-1523365280197-f1783db9fe62?w=1200&q=80', // Passport
      author: 'Elma Vize',
      category: 'Genel',
      published: true,
      publishedAt: new Date(),
    },
    {
      slug: 'yurtdisinda-egitim-rehberi',
      titleTr: 'Yurtdışında Eğitim Rehberi',
      titleEn: 'Guide to Studying Abroad',
      excerptTr: 'Yurtdışında eğitim almak isteyenler için kapsamlı rehber',
      excerptEn: 'Comprehensive guide for those who want to study abroad',
      contentTr: '<p>Yurtdışında eğitim almak hayatınızı değiştirebilecek bir deneyimdir...</p>',
      contentEn: '<p>Studying abroad is an experience that can change your life...</p>',
      featuredImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80', // University
      author: 'Elma Vize',
      category: 'Eğitim',
      published: true,
      publishedAt: new Date(),
    },
  ];

  const blogPosts = await Promise.all(
    blogPostData.map((data) =>
      prisma.blogPost.upsert({
        where: { slug: data.slug },
        update: data,
        create: data,
      })
    )
  );

  console.log(`✅ Created/updated ${blogPosts.length} blog posts`);

  // Seed FAQs - these don't have unique slug, so we'll skip seeding if any exist
  const existingFAQCount = await prisma.fAQ.count();
  
  if (existingFAQCount === 0) {
    const faqs = await Promise.all([
      prisma.fAQ.create({
        data: {
          questionTr: 'Vize başvurusu ne kadar sürer?',
          questionEn: 'How long does visa application take?',
          answerTr: '<p>Vize başvuru süreleri ülkeden ülkeye değişir. Genellikle 2-8 hafta arasında değişmektedir.</p>',
          answerEn: '<p>Visa application times vary from country to country. It usually takes 2-8 weeks.</p>',
          order: 1,
          published: true,
        },
      }),
      prisma.fAQ.create({
        data: {
          questionTr: 'Hangi belgeler gereklidir?',
          questionEn: 'What documents are required?',
          answerTr: '<p>Pasaport, fotoğraf, mali durum belgesi, sağlık sigortası ve başvuru formu temel belgelerdir.</p>',
          answerEn: '<p>Passport, photo, financial statement, health insurance and application form are the basic documents.</p>',
          order: 2,
          published: true,
        },
      }),
      prisma.fAQ.create({
        data: {
          questionTr: 'Danışmanlık ücreti ne kadardır?',
          questionEn: 'What is the consultancy fee?',
          answerTr: '<p>Danışmanlık ücretlerimiz başvuru türüne ve ülkeye göre değişmektedir. Detaylı bilgi için bizimle iletişime geçiniz.</p>',
          answerEn: '<p>Our consultancy fees vary depending on the application type and country. Please contact us for detailed information.</p>',
          order: 3,
          published: true,
        },
      }),
    ]);
    console.log(`✅ Created ${faqs.length} FAQs`);
  } else {
    console.log(`ℹ️  FAQs already exist (skipping)`);
  }

  // Seed Pages (using upsert)
  const pageData = [
    {
      slug: 'about',
      titleTr: 'Hakkımızda',
      titleEn: 'About Us',
      contentTr: '<h2>Elma Vize Danışmanlık</h2><p>Yılların getirdiği deneyim ve uzmanlıkla, yurtdışı vize, eğitim ve iş danışmanlığı hizmetleri sunuyoruz.</p>',
      contentEn: '<h2>Elma Visa Consultancy</h2><p>With years of experience and expertise, we provide visa, education and work consultancy services abroad.</p>',
    },
    {
      slug: 'education',
      titleTr: 'Yurtdışı Eğitim',
      titleEn: 'Study Abroad',
      contentTr: '<h2>Yurtdışı Eğitim Danışmanlığı</h2><p>Hayalinizdeki üniversiteye kabul almanız için size rehberlik ediyoruz.</p>',
      contentEn: '<h2>Study Abroad Consultancy</h2><p>We guide you to get admission to your dream university.</p>',
    },
    {
      slug: 'work',
      titleTr: 'Yurtdışı Çalışma',
      titleEn: 'Work Abroad',
      contentTr: '<h2>Yurtdışı İş Danışmanlığı</h2><p>Yurtdışında çalışma hayallerinizi gerçeğe dönüştürmenize yardımcı oluyoruz.</p>',
      contentEn: '<h2>Work Abroad Consultancy</h2><p>We help you make your overseas work dreams come true.</p>',
    },
  ];

  const pages = await Promise.all(
    pageData.map((data) =>
      prisma.page.upsert({
        where: { slug: data.slug },
        update: data,
        create: data,
      })
    )
  );

  console.log(`✅ Created/updated ${pages.length} pages`);

  // Seed Site Settings with stock images
  const siteSettings = [
    {
      key: 'site_logo',
      value: '/logos/logo.svg',
      label: 'Site Logo',
      description: 'Main logo displayed in header (SVG format)',
      category: 'branding',
      imageType: 'logo',
    },
    {
      key: 'hero_background',
      value: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80',
      label: 'Hero Background Image',
      description: 'Homepage hero section background (passport/travel theme)',
      category: 'hero',
      imageType: 'hero',
    },
    {
      key: 'about_team_photo',
      value: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
      label: 'Team Photo',
      description: 'About page team collaboration photo',
      category: 'about',
      imageType: 'photo',
    },
    {
      key: 'about_office_photo',
      value: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
      label: 'Office Photo',
      description: 'About page office workspace photo',
      category: 'about',
      imageType: 'photo',
    },
  ];

  for (const setting of siteSettings) {
    await prisma.siteSettings.upsert({
      where: { key: setting.key },
      update: setting,
      create: setting,
    });
  }

  console.log(`✅ Created/updated ${siteSettings.length} site settings with stock images`);
  console.log('   Stock images from Unsplash (free, high-quality)');
  console.log('   Customer can replace these via Admin Panel → Settings');

  console.log('✨ Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });









