"use server";
import { prisma } from "@/event-creator/src/lib/prisma";
import { Project, ProjectMedia } from "@prisma/client";

interface FullProject extends Project {
  images: ProjectMedia[];
}


export const updateProject = async (projectId: string, data: Partial<FullProject>) => {
 try {
    const { title, client, service, description, challenge, heroImage, images } = data;

    // Step 1: Update project fields
    await prisma.project.update({
      where: { id: projectId },
      data: {
        title,
        client,
        service,
        description,
        challenge,
        heroImage,
      },
    });

    // Step 2: Fetch existing media IDs
    const existingMedia = await prisma.projectMedia.findMany({
      where: { projectId },
      select: { id: true },
    });
    const existingIds = new Set(existingMedia.map((m) => m.id));

    // Step 3: Separate new vs existing images
    const toUpdate = (images ?? []).filter((m) => existingIds.has(m.id));
    const toCreate = (images ?? []).filter((m) => !existingIds.has(m.id));

    // Step 4: Update existing images
    for (const media of toUpdate) {
      await prisma.projectMedia.update({
        where: { id: media.id },
        data: {
          url: media.url,
          type: media.type,
          width: media.width,
          height: media.height,
          positionX: media.positionX,
          positionY: media.positionY,
          zIndex: media.zIndex,
        },
      });
    }

    // Step 5: Create new media
    if (toCreate.length > 0) {
      await prisma.projectMedia.createMany({
        data: toCreate.map((m) => ({
          id: m.id,
          url: m.url,
          type: m.type,
          width: m.width,
          height: m.height,
          positionX: m.positionX,
          positionY: m.positionY,
          zIndex: m.zIndex,
          projectId,
        })),
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, error: "Failed to update project" };
  }
};
