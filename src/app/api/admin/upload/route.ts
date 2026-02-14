import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { v2 as cloudinary } from 'cloudinary';
import { cloudinaryConfig } from '@/lib/cloudinary-config';

// Configure Cloudinary
cloudinary.config({
  cloud_name: cloudinaryConfig.cloudName,
  api_key: cloudinaryConfig.apiKey,
  api_secret: cloudinaryConfig.apiSecret,
});

/**
 * POST /api/admin/upload
 * Generate a signature for secure Cloudinary uploads
 * 
 * This endpoint is used when CLOUDINARY_API_SECRET is configured
 * for signed uploads (more secure than unsigned uploads)
 */
export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if Cloudinary is configured
    if (!cloudinaryConfig.cloudName || !cloudinaryConfig.apiSecret) {
      return NextResponse.json(
        { error: 'Cloudinary is not configured. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and CLOUDINARY_API_SECRET environment variables.' },
        { status: 500 }
      );
    }

    // Parse the JSON body
    const body = await request.json();
    
    console.log('Signature request body:', JSON.stringify(body));
    
    // Extract the parameters to sign from the request
    const paramsToSign = body.paramsToSign || body;
    
    console.log('Parameters to sign:', paramsToSign);
    
    // Generate signature using Cloudinary's utility
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      cloudinaryConfig.apiSecret
    );
    
    console.log('Generated signature:', signature);

    // Return JSON response with signature (required by next-cloudinary)
    return NextResponse.json({ signature });
  } catch (error) {
    console.error('Error generating upload signature:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload signature' },
      { status: 500 }
    );
  }
}
