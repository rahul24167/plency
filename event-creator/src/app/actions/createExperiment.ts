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
  medias: string[]
): Promise<CreateExperimentResult> {
  try {
    if (!experimentInfo || !medias || medias.length === 0) {
      return { success: false, error: "Missing fields" };
    }

    const experiment = await prisma.experiment.create({
      data: {
        ...experimentInfo,
        images: {
          create: medias.map((media) => ({ url: media })),
        },
      },
    });

    return { success: true, experiment };
  } catch (err) {
    console.error("Create experiment error:", err);
    return { success: false, error: "Server error" };
  }
}
