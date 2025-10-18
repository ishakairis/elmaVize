import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, countryId, visaType, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !countryId || !visaType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save to database
    const application = await prisma.application.create({
      data: {
        name,
        email,
        phone,
        countryId,
        visaType,
        message: message || '',
        status: 'new',
      },
    });

    // TODO: Send email notification
    // You can integrate Resend or SendGrid here
    // await sendApplicationNotification(application);

    return NextResponse.json(
      { success: true, id: application.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Application form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}





