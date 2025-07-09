"use server";
import { prisma } from "@/event-creator/src/lib/prisma";
import { Project } from "@prisma/client";

export async function getProjectById(id: string): Promise<Project | null> {
  return prisma.project.findUnique({
    where: { id },
    include: {
      images: true
    },
  });
}
export async function getImagesByProjectId(id: string) {
  return prisma.projectMedia.findMany({
    where: { projectId: id },
  });
}