"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function addIId(userId: number, installationId: string) {
  try {
    const updatedUser = prisma.user.update({
      where: { id: userId },
      data: { installationId: installationId },
    });

    return updatedUser;
  } catch (e) {
    console.error(e);
  }
}
