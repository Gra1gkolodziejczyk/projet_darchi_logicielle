/*
  Warnings:

  - Added the required column `image` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "image" TEXT NOT NULL;
