"use server";
import { prisma } from "@/event-creator/src/lib/prisma";
export async function deleteExperiments(experimentIds: string[]) {
    try {
        const deletedExperiments = await prisma.experiment.deleteMany({
            where: {
                id: {
                    in: experimentIds
                }
            }
        });
        return deletedExperiments;
    } catch (error) {
        console.error("Error deleting experiments:", error);
        throw new Error("Failed to delete experiments");
    }
}
export async function deleteExperimentById(experimentId: string) {
    try {
        const deletedExperiment = await prisma.experiment.delete({
            where: { id: experimentId }
        });
        return deletedExperiment;
    } catch (error) {
        console.error("Error deleting experiment:", error);
        throw new Error("Failed to delete experiment");
    }
}
export async function deleteExperimentMediaById(mediaId: string) {
    try {
        const deletedMedia = await prisma.experimentImage.delete({
            where: { id: mediaId }
        });
        return deletedMedia;
    } catch (error) {
        console.error("Error deleting experiment media:", error);
        throw new Error("Failed to delete experiment media");
    }
}