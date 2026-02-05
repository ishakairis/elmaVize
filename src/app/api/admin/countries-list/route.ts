import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const countries = await prisma.country.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { visaPrograms: true, applications: true },
        },
      },
    });

    return NextResponse.json(countries);
  } catch (error) {
    console.error('Countries list error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
