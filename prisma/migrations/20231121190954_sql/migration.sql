/*
  Warnings:

  - Made the column `hashed_pass` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "hashed_pass" SET NOT NULL;
