import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch statistics
    const [
      countriesCount,
      visasCount,
      blogPostsCount,
      faqsCount,
      applicationsCount,
      messagesCount,
    ] = await Promise.all([
      prisma.country.count(),
      prisma.visaProgram.count(),
      prisma.blogPost.count(),
      prisma.fAQ.count(),
      prisma.application.count(),
      prisma.contactMessage.count(),
    ]);

    // Get recent applications and messages
    const recentApplications = await prisma.application.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { country: true },
    });

    const recentMessages = await prisma.contactMessage.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      stats: {
        countriesCount,
        visasCount,
        blogPostsCount,
        faqsCount,
        applicationsCount,
        messagesCount,
      },
      recentApplications,
      recentMessages,
      userName: session.user.name || 'Admin',
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
