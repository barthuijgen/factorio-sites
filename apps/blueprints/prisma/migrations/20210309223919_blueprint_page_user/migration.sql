/*
  Warnings:

  - Made the column `user_id` on table `blueprint_page` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "blueprint_page" ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "blueprint_page" ADD FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
