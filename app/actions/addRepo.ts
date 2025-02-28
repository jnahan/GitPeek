"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Repo {
  name: string;
  gitHubUrl: string;
  cloneable: boolean;
  cloneUrl: string;
  userId: number;
  username: string;
}

export default async function addRepo(newRepo: Repo) {
  try {
    // Check if project with same name already exists
    const existingRepo = await prisma.repo.findUnique({
      where: {
        userId_name: {
          userId: newRepo.userId,
          name: newRepo.name,
        },
      },
    });
    if (existingRepo) {
      console.log("Repo with same name already exists", existingRepo);
      return { repo: {}, success: false };
    }

    // If new repo, create repo
    const repo = await prisma.repo.create({
      data: newRepo,
    });
    console.log("Sucessfully created repo", repo);

    return { repo: repo, success: true };
  } catch (e) {
    console.error(e);
  }
}
