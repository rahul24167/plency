import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";

const decoded = Buffer.from(process.env.GCP_KEY_B64!, 'base64').toString('utf-8');
const credentials = JSON.parse(decoded);
const storage =
  process.env.NODE_ENV === "production"
    ? new Storage()
    : new Storage({
        credentials,
      });

const bucket = storage.bucket(process.env.GCS_BUCKET_NAME!);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const originalFilename = searchParams.get("filename");
  const contentType = searchParams.get("contentType");

  if (!originalFilename || !contentType) {
    return NextResponse.json(
      { error: "Missing filename or contentType" },
      { status: 400 }
    );
  }

  const isImage = contentType.startsWith("image/");
  const isVideo = contentType.startsWith("video/");
  const folder = isImage ? "images" : isVideo ? "raw" : "others";

  const uniqueFilename = `${folder}/${uuidv4()}`;

  const file = bucket.file(uniqueFilename);

  const [uploadUrl] = await file.getSignedUrl({
    version: "v4",
    action: "write",
    expires: Date.now() + 15 * 60 * 1000,
    contentType,
  });
  const publicUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${uniqueFilename}`;

  return NextResponse.json({ uploadUrl, publicUrl });
}
// import { NextRequest, NextResponse } from 'next/server';
// import { S3Client } from '@aws-sdk/client-s3';
// import { createPresignedPost } from '@aws-sdk/s3-presigned-post';

// const s3 = new S3Client({
//   region: process.env.NEXT_PUBLIC_AWS_REGION!,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   },
// });

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const filename = searchParams.get('filename');

//   if (!filename) {
//     return NextResponse.json({ error: 'Missing filename' }, { status: 400 });
//   }

//   try {
//     const presignedPost = await createPresignedPost(s3, {
//       Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET!,
//       Key: filename,
//       Conditions: [
//         ['content-length-range', 0, 209715200], // Max size: 200MB
//       ],
//       Expires: 60, // In seconds
//     });

//     return NextResponse.json(presignedPost);
//   } catch (err) {
//     console.error('S3 presign error:', err);
//     return NextResponse.json({ error: 'Presign failed' }, { status: 500 });
//   }
// }