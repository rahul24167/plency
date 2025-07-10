"use server"
import { prisma } from "@/src/lib/prisma";

export async function subscribeToNewsletter(email: string) {
  const subscriber = await prisma.newsLetterSubscriber.create({
    data: {
      email,
    },
  });
  return subscriber;
}
