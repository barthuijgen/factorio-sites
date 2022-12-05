-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_blueprint_page_id_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_favorites" DROP CONSTRAINT "user_favorites_blueprint_page_id_fkey";

-- DropForeignKey
ALTER TABLE "user_favorites" DROP CONSTRAINT "user_favorites_user_id_fkey";

-- CreateTable
CREATE TABLE "blueprint_string" (
    "id" UUID NOT NULL,
    "hash" VARCHAR(40) NOT NULL,
    "string" TEXT NOT NULL,

    CONSTRAINT "blueprint_string_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blueprint_string_hash_key" ON "blueprint_string"("hash");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorites" ADD CONSTRAINT "user_favorites_blueprint_page_id_fkey" FOREIGN KEY ("blueprint_page_id") REFERENCES "blueprint_page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorites" ADD CONSTRAINT "user_favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_blueprint_page_id_fkey" FOREIGN KEY ("blueprint_page_id") REFERENCES "blueprint_page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "blueprint.blueprint_hash_unique" RENAME TO "blueprint_blueprint_hash_key";

-- RenameIndex
ALTER INDEX "blueprint_book.blueprint_hash_unique" RENAME TO "blueprint_book_blueprint_hash_key";

-- RenameIndex
ALTER INDEX "blueprint_page.blueprint_book_id_unique" RENAME TO "blueprint_page_blueprint_book_id_key";

-- RenameIndex
ALTER INDEX "blueprint_page.blueprint_id_unique" RENAME TO "blueprint_page_blueprint_id_key";

-- RenameIndex
ALTER INDEX "blueprint_page.factorioprints_id_unique" RENAME TO "blueprint_page_factorioprints_id_key";

-- RenameIndex
ALTER INDEX "session.session_token_unique" RENAME TO "session_session_token_key";

-- RenameIndex
ALTER INDEX "user.email_unique" RENAME TO "user_email_key";

-- RenameIndex
ALTER INDEX "user.steam_id_unique" RENAME TO "user_steam_id_key";

-- RenameIndex
ALTER INDEX "user.username_unique" RENAME TO "user_username_key";
