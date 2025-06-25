// import { NextRequest, NextResponse } from "next/server";
// import AWS from "aws-sdk";
// import prisma from "@/../prisma"; // Assuming you export a prisma client

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   region: process.env.AWS_REGION
// });

// export async function POST(req: NextRequest) {
//   const data = await req.formData();
//   const file = data.get('file') as File;
//   const eventId = data.get('eventId') as string;
//   const positionX = Number(data.get('positionX'));
//   const positionY = Number(data.get('positionY'));
//   const width = Number(data.get('width'));
//   const height = Number(data.get('height'));
//   const zIndex = Number(data.get('zIndex'));

//   const buffer = Buffer.from(await file.arrayBuffer());

//   const uploadResult = await s3.upload({
//     Bucket: process.env.AWS_S3_BUCKET_NAME!,
//     Key: `events/${Date.now()}_${file.name}`,
//     Body: buffer,
//     ContentType: file.type,
//     ACL: 'public-read'
//   }).promise();

//   const image = await prisma.eventImage.create({
//     data: {
//       eventId,
//       url: uploadResult.Location,
//       positionX,
//       positionY,
//       width,
//       height,
//       zIndex
//     }
//   });

//   return NextResponse.json(image);
// }
