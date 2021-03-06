/*
  Warnings:

  - Added the required column `image_hash` to the `blueprint_page` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blueprint_page" ADD COLUMN     "image_hash" VARCHAR(40) NOT NULL;
