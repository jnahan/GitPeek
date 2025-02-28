/*
  Warnings:

  - You are about to drop the column `githubUrl` on the `Repo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,name]` on the table `Repo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gitHubUrl` to the `Repo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Repo" DROP COLUMN "githubUrl",
ADD COLUMN     "gitHubUrl" TEXT NOT NULL,
ALTER COLUMN "gitPeekUrl" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Repo_userId_name_key" ON "Repo"("userId", "name");
