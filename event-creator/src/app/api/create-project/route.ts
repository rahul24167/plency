import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/event-creator/src/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, clientName, service, description, heroUrl, images } = body;

    if (!title || !clientName || !service || !description || !heroUrl || !images ) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        title: title,
        client: clientName,
        service: service,
        description: description,
        heroImage: heroUrl,
        images: {
          create: images
        },
      },
    });

    return NextResponse.json({ success: true, project });
  } catch (err) {
    console.error("Create project error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
