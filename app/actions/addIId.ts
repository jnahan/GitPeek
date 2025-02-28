"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Update user object to include installation id
 *
 * @param userId - Identifier for user
 * @param installationId - Installation id to be associated with user
 * @returns - Updated user with installation id
 */
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
