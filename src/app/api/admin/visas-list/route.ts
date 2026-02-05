import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const visaPrograms = await prisma.visaProgram.findMany({
      orderBy: { order: 'asc' },
      include: {
        country: true,
        _count: {
          select: { applications: true },
        },
      },
    });

    return NextResponse.json(visaPrograms);
  } catch (error) {
    console.error('Visas list error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
