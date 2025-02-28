"use server";

import { PrismaClient } from "@prisma/client";

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
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
        username,
      },
    });
    if (existingUser) {
      console.log("User already exists", existingUser);
    }

    // If new user, create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        avatar,
      },
    });
    console.log("Sucessfully created user", user);

    return user;
  } catch (e) {
    console.error(e);
  }
}
