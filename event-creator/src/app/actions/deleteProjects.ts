"use server";
import { prisma } from "@/event-creator/src/lib/prisma";

export async function deleteProjects(projectIds: string[]) {
    try {
        const deletedProjects = await prisma.project.deleteMany({
            where: {
                id: {
                    in: projectIds
                }
            }
        });
        return deletedProjects;
    } catch (error) {
        console.error("Error deleting projects:", error);
        throw new Error("Failed to delete projects");
    }
}
export async function deleteProjectById(projectId: string) {
    try {
        const deletedProject = await prisma.project.delete({
            where: { id: projectId }
        });
        return deletedProject;
    } catch (error) {
        console.error("Error deleting project:", error);
        throw new Error("Failed to delete project");
    }
}
export async function deleteProjectMediaById(mediaId: string) {
    try {
        const deletedMedia = await prisma.projectMedia.delete({
            where: { id: mediaId }
        });
        return deletedMedia;
    } catch (error) {
        console.error("Error deleting project media:", error);
        throw new Error("Failed to delete project media");
    }
}