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
