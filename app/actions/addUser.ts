"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

// TODO: add validation to check if user already exists
// TODO: remove revalidate path

const prisma = new PrismaClient();

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
      select: {
        id: true,
      },
    });
    console.log("Sucessfully created user", username);
    revalidatePath("/");

    return user;
  } catch (e) {
    console.error(e);
  }
}
