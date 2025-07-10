"use server";
import { prisma } from "@/src/lib/prisma";

export const getExperiments = async () => {
  const experiments = await prisma.experiment.findMany({
    include: {
      images: {
        select: {
          url: true,
        },
      },
    },
  });

  return experiments;
};

export const getExperimentById = async (id: string) => {
  const experiment = await prisma.experiment.findUnique({
    where: { id },
    include: {
      images: {
        select: {
          url: true,
        },
      },
    },
  });

  return experiment;
};