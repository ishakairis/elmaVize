import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { value } = body;

    if (!value) {
      return NextResponse.json({ error: 'Value is required' }, { status: 400 });
    }

    // Update the setting
    const updatedSetting = await prisma.siteSettings.update({
      where: { id },
      data: { value },
    });

    return NextResponse.json(updatedSetting);
  } catch (error) {
    console.error('Error updating setting:', error);
    return NextResponse.json(
      { error: 'Failed to update setting' },
      { status: 500 }
    );
  }
}
