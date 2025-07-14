import { v4 as uuidv4 } from 'uuid';
import { NextRequest, NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage';
import path from 'path';

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: path.join(process.cwd(), 'google-key.json'),
});

const bucket = storage.bucket(process.env.GCS_BUCKET_NAME!);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const originalFilename = searchParams.get('filename');
  const contentType = searchParams.get('contentType');

  if (!originalFilename || !contentType) {
    return NextResponse.json({ error: 'Missing filename or contentType' }, { status: 400 });
  }
  const uniqueFilename = `${uuidv4()}_${originalFilename}`;


  const file = bucket.file(uniqueFilename);

  const [uploadUrl] = await file.getSignedUrl({
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000,
    contentType,
  });

  const publicUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${uniqueFilename}`;

  return NextResponse.json({ uploadUrl, publicUrl });
}
