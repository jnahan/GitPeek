"use server";

import { PrismaClient } from "@prisma/client";
import { Repo } from "../types/repo";

export default async function getRepos(userId: number): Promise<Repo[]> {
  const prisma = new PrismaClient();
  const repos = await prisma.repo.findMany({
    where: {
      userId,
    },
  });
  return repos;
}
