"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

// TODO: add validation to check if user already exists
// TODO: remove revalidate path

const prisma = new PrismaClient();

/**
 * Adds new user object to database
 *
 * @param username - GitHub username
 * @param email - Email
 * @param avatar - Avatar
 * @returns Created user object
 */
export default async function addUser(
  username: string,
  email: string,
  avatar: string,
) {
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        avatar,
      },
    });
    console.log("Sucessfully created user", username);
    revalidatePath("/");

    return user;
  } catch (e) {
    console.error(e);
  }
}
