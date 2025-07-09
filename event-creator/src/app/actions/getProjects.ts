"use server";
import { prisma } from "@/event-creator/src/lib/prisma";
const getProjects = async () => {
  try {
    const projects = await prisma.project.findMany();
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
}

export default getProjects;