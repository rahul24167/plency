"use server";
import { prisma } from "@/event-creator/src/lib/prisma";

export async function getExperiments() {
    try {
        const experiments = await prisma.experiment.findMany();
        return experiments;
    } catch (error) {
        console.error("Error fetching experiments:", error);
        throw new Error("Failed to fetch experiments");
    }
}
