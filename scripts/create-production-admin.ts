import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import * as readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function createProductionAdmin() {
  console.log('🔐 Production Admin User Creation\n');
  console.log('⚠️  This will create a new admin user with custom credentials.\n');

  try {
    // Get email
    const email = await question('Enter admin email: ');
    
    if (!email || !email.includes('@')) {
      console.error('❌ Invalid email address');
      process.exit(1);
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log(`\n❌ User with email "${email}" already exists.`);
      const overwrite = await question('Do you want to update their password? (yes/no): ');
      
      if (overwrite.toLowerCase() !== 'yes') {
        console.log('Operation cancelled.');
        process.exit(0);
      }
    }

    // Get password
    const password = await question('Enter password (min 8 characters): ');
    
    if (!password || password.length < 8) {
      console.error('❌ Password must be at least 8 characters');
      process.exit(1);
    }

    const confirmPassword = await question('Confirm password: ');
    
    if (password !== confirmPassword) {
      console.error('❌ Passwords do not match');
      process.exit(1);
    }

    // Get name
    const name = await question('Enter admin name: ');

    // Hash password
    console.log('\n🔄 Creating admin user...');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create or update user
    const admin = existingUser
      ? await prisma.user.update({
          where: { email },
          data: {
            password: hashedPassword,
            name: name || existingUser.name,
            role: 'admin',
          },
        })
      : await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            name: name || 'Admin',
            role: 'admin',
          },
        });

    console.log('\n✅ Admin user ' + (existingUser ? 'updated' : 'created') + ' successfully!');
    console.log(`📧 Email: ${admin.email}`);
    console.log(`👤 Name: ${admin.name}`);
    console.log(`🔑 Password: ********** (hidden for security)`);
    console.log('\n🔗 You can now login at: /admin/login');

  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

createProductionAdmin();
