import { NextRequest, NextResponse } from "next/server";
import AWS from "aws-sdk";
import prisma from "@/event-creator/src/lib/prisma";


const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  region: process.env.AWS_REGION
});

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get('file') as File;
  const eventId = data.get('eventId') as string;
  const positionX = Number(data.get('positionX'));
  const positionY = Number(data.get('positionY'));
  const width = Number(data.get('width'));
  const height = Number(data.get('height'));
  const zIndex = Number(data.get('zIndex'));

  const buffer = Buffer.from(await file.arrayBuffer());

  const uploadResult = await s3.upload({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: `events/${Date.now()}_${file.name}`,
    Body: buffer,
    ContentType: file.type,
    ACL: 'public-read'
  }).promise();

  const image = await prisma.eventImage.create({
    data: {
      eventId,
      url: uploadResult.Location,
      positionX,
      positionY,
      width,
      height,
      zIndex
    }
  });

  return NextResponse.json(image);
}




// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   region: process.env.AWS_REGION
// });

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("file") as File;
//     const projectId = formData.get("projectId") as string;
//     const positionX = Number(formData.get("positionX"));
//     const positionY = Number(formData.get("positionY"));
//     const width = Number(formData.get("width"));
//     const height = Number(formData.get("height"));
//     const zIndex = Number(formData.get("zIndex"));

//     if (!file || !projectId) {
//       return NextResponse.json({ error: "Missing file or projectId" }, { status: 400 });
//     }

//     const buffer = Buffer.from(await file.arrayBuffer());

//     // Upload to S3
//     const uploadResult = await s3.upload({
//       Bucket: process.env.AWS_S3_BUCKET_NAME!,
//       Key: `projects/${Date.now()}_${file.name}`,
//       Body: buffer,
//       ContentType: file.type,
//       ACL: 'public-read'
//     }).promise();

//     // Save in DB
//     const image = await prisma.projectImage.create({
//       data: {
//         projectId,
//         url: uploadResult.Location,
//         positionX,
//         positionY,
//         width,
//         height,
//         zIndex
//       }
//     });

//     return NextResponse.json(image);
//   } catch (err: any) {
//     console.error(err);
//     return NextResponse.json({ error: "Upload failed" }, { status: 500 });
//   }
// }