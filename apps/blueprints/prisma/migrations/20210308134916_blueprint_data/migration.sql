-- AlterTable
ALTER TABLE "blueprint" ADD COLUMN     "data" JSONB;

-- AlterTable
ALTER TABLE "blueprint_book" ALTER COLUMN "child_tree" SET DATA TYPE JSONB;
