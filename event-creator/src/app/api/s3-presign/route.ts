import { NextRequest, NextResponse } from 'next/server';
import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json({ error: 'Missing filename' }, { status: 400 });
  }

  try {
    const presignedPost = await createPresignedPost(s3, {
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET!,
      Key: filename,
      Conditions: [
        ['content-length-range', 0, 209715200], // Max size: 200MB
      ],
      Expires: 60, // In seconds
    });

    return NextResponse.json(presignedPost);
  } catch (err) {
    console.error('S3 presign error:', err);
    return NextResponse.json({ error: 'Presign failed' }, { status: 500 });
  }
}
