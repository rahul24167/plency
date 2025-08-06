"use server";
import {prisma} from "@/event-creator/src/lib/prisma";
import { Project,ProjectMedia } from "@prisma/client";

interface  ProjectWithMedia extends Project {
    images: ProjectMedia[];
}



export async function createProject(formData:ProjectWithMedia) {
    const { title, client, service, description, challenge, heroImage, images } = formData;

    if (!title || !client || !service || !description || !challenge || !heroImage || !images) {
        throw new Error("Missing fields");
    }

    try {
        const project = await prisma.project.create({
            data: {
                title: title,
                client: client,
                service: service,
                description: description,
                challenge: challenge,
                heroImage: heroImage,
                images: {
                    create: images.map((image) => ({
                        url: image.url,
                        positionX: image.positionX,
                        positionY: image.positionY,
                        width: image.width,
                        height: image.height,
                        zIndex: image.zIndex,
                    })),
                },
            },
        });
        return { success: true, project };
    } catch (err) {
        console.error("Create project error:", err);
        throw new Error("Server error");
    }
}