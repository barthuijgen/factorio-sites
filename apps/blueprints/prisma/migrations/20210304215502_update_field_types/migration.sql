/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[blueprint_hash]` on the table `blueprint_book`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[factorioprints_id]` on the table `blueprint_page`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[session_token]` on the table `session`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE "blueprint" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "blueprint_book" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "blueprint_page" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "session" ALTER COLUMN "last_used" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "password_reset_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "last_password_change" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "last_login_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "user_favorites" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "blueprint_book.blueprint_hash_unique" ON "blueprint_book"("blueprint_hash");

-- CreateIndex
CREATE UNIQUE INDEX "blueprint_page.factorioprints_id_unique" ON "blueprint_page"("factorioprints_id");

-- CreateIndex
CREATE UNIQUE INDEX "session.session_token_unique" ON "session"("session_token");
