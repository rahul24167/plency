import { NextRequest, NextResponse } from 'next/server';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  region: process.env.AWS_REGION!,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  signatureVersion: 'v4',
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json({ error: 'Missing filename' }, { status: 400 });
  }

  const key = `uploads/${Date.now()}-${filename}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET!,
    Fields: {
      key,
    },
    Expires: 60, // 1 minute
    Conditions: [
      ['content-length-range', 0, 10 * 1024 * 1024], // up to 10 MB
    ],
  };

  try {
    const presignedPost = await s3.createPresignedPost(params);
    return NextResponse.json(presignedPost);
  } catch (err) {
    console.error('S3 presign error:', err);
    return NextResponse.json({ error: 'S3 presign failed' }, { status: 500 });
  }
}
