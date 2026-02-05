/**
 * Railway Database Setup Script
 * 
 * This script will:
 * 1. Connect to your Railway PostgreSQL database
 * 2. Create all tables (push schema)
 * 3. Seed with sample data
 * 
 * Usage:
 * 1. Copy your DATABASE_URL from Railway dashboard (PostgreSQL service → Variables tab)
 * 2. Run: DATABASE_URL="your-url-here" node setup-railway-db.js
 */

const { execSync } = require('child_process');

console.log('🚀 Railway Database Setup\n');

// Check if DATABASE_URL is provided
if (!process.env.DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL environment variable is required!\n');
  console.log('Steps to fix:');
  console.log('1. Go to: https://railway.app');
  console.log('2. Open your elmaVize project');
  console.log('3. Click on PostgreSQL service');
  console.log('4. Go to Variables tab');
  console.log('5. Copy the DATABASE_URL value\n');
  console.log('Then run:');
  console.log('DATABASE_URL="your-url-here" node setup-railway-db.js');
  process.exit(1);
}

console.log('✓ DATABASE_URL found');
console.log('✓ Connected to Railway PostgreSQL\n');

try {
  // Push database schema
  console.log('📊 Creating database tables...');
  execSync('npm run db:push', { stdio: 'inherit' });
  console.log('✓ Tables created successfully!\n');

  // Seed database
  console.log('🌱 Seeding database with sample data...');
  execSync('npm run db:seed', { stdio: 'inherit' });
  console.log('✓ Database seeded successfully!\n');

  console.log('🎉 SUCCESS! Your Railway database is ready!');
  console.log('\n📋 Admin Credentials:');
  console.log('   Email: admin@elmavize.com');
  console.log('   Password: admin123');
  console.log('   ⚠️  IMPORTANT: Change this password after first login!\n');
  console.log('Next steps:');
  console.log('1. Go to your Railway dashboard');
  console.log('2. Find your web service URL (Settings → Domains)');
  console.log('3. Open the URL and add /admin/login to access admin panel');
  console.log('4. Login with the credentials above');
  console.log('5. Your website is LIVE! 🚀\n');

} catch (error) {
  console.error('\n❌ ERROR during setup:', error.message);
  console.log('\nTroubleshooting:');
  console.log('- Make sure DATABASE_URL is correct');
  console.log('- Check Railway dashboard for database status');
  console.log('- Ensure PostgreSQL service is running');
  process.exit(1);
}





