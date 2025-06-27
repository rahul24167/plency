import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/event-creator/src/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, clientName, heroUrl, images, positions } = body;

    if (!name || !clientName || !heroUrl || !images || !positions) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        title: name,
        description: clientName,
        hero_url: heroUrl,
        created_at: new Date(),
        project_images: {
          create: images.map((url: string, index: number) => ({
            url,
            width: positions[index].width,
            height: positions[index].height,
            position_x: positions[index].x,
            position_y: positions[index].y,
            z_index: positions[index].z,
            created_at: new Date(),
          })),
        },
      },
    });

    return NextResponse.json({ success: true, project });
  } catch (err) {
    console.error('Create project error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
