/*
  Warnings:

  - Added the required column `cloneUrl` to the `Repo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Repo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Repo" ADD COLUMN     "cloneUrl" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;
