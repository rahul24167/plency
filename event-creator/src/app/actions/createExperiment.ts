"use server";
import { prisma } from "@/event-creator/src/lib/prisma";
import { Experiment } from "@prisma/client";

interface ExperimentInfo {
  brand: string;
  brandDescription: string;
  question: string;
  answer: string;
}

type CreateExperimentResult =
  | { success: true; experiment: Experiment }
  | { success: false; error: string };

export async function createExperiment(
  experimentInfo: ExperimentInfo,
  images: string[]
): Promise<CreateExperimentResult> {
  try {
    if (!experimentInfo || !images || images.length === 0) {
      return { success: false, error: "Missing fields" };
    }

    const experiment = await prisma.experiment.create({
      data: {
        ...experimentInfo,
        images: {
          create: images.map((image) => ({ url: image })),
        },
      },
    });

    return { success: true, experiment };
  } catch (err) {
    console.error("Create experiment error:", err);
    return { success: false, error: "Server error" };
  }
}
