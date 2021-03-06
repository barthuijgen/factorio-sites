-- CreateEnum
CREATE TYPE "enum_user_role" AS ENUM ('user', 'moderator', 'admin');

-- CreateTable
CREATE TABLE "blueprint" (
    "id" UUID NOT NULL,
    "label" VARCHAR(255),
    "description" TEXT,
    "game_version" VARCHAR(255),
    "blueprint_hash" VARCHAR(40) NOT NULL,
    "image_hash" VARCHAR(40) NOT NULL,
    "image_version" INTEGER NOT NULL DEFAULT 1,
    "tags" VARCHAR(255)[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blueprint_book" (
    "id" UUID NOT NULL,
    "label" VARCHAR(255),
    "description" TEXT,
    "child_tree" JSON NOT NULL,
    "blueprint_hash" VARCHAR(40) NOT NULL,
    "is_modded" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blueprint_page" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "blueprint_id" UUID,
    "blueprint_book_id" UUID,
    "title" VARCHAR(255) NOT NULL,
    "description_markdown" TEXT,
    "tags" VARCHAR(255)[],
    "factorioprints_id" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "session_token" UUID NOT NULL,
    "useragent" VARCHAR(255) NOT NULL,
    "ip" VARCHAR(255) NOT NULL,
    "last_used" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255),
    "username" VARCHAR(255) NOT NULL,
    "role" "enum_user_role" DEFAULT E'user',
    "steam_id" VARCHAR(255),
    "password" VARCHAR(255),
    "password_reset_token" UUID,
    "password_reset_at" TIMESTAMP(3),
    "last_password_change" TIMESTAMP(3),
    "last_login_at" TIMESTAMP(3),
    "last_login_ip" VARCHAR(255) NOT NULL,
    "email_validated" BOOLEAN NOT NULL DEFAULT false,
    "email_validate_token" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_favorites" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" UUID NOT NULL,
    "blueprint_page_id" UUID NOT NULL,

    PRIMARY KEY ("user_id","blueprint_page_id")
);

-- CreateTable
CREATE TABLE "_blueprintToblueprint_book" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_blueprint_books" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "blueprint.blueprint_hash_unique" ON "blueprint"("blueprint_hash");

-- CreateIndex
CREATE UNIQUE INDEX "blueprint_book.blueprint_hash_unique" ON "blueprint_book"("blueprint_hash");

-- CreateIndex
CREATE UNIQUE INDEX "blueprint_page.blueprint_id_unique" ON "blueprint_page"("blueprint_id");

-- CreateIndex
CREATE UNIQUE INDEX "blueprint_page.blueprint_book_id_unique" ON "blueprint_page"("blueprint_book_id");

-- CreateIndex
CREATE UNIQUE INDEX "blueprint_page.factorioprints_id_unique" ON "blueprint_page"("factorioprints_id");

-- CreateIndex
CREATE UNIQUE INDEX "session.session_token_unique" ON "session"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "user.email_unique" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user.username_unique" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user.steam_id_unique" ON "user"("steam_id");

-- CreateIndex
CREATE UNIQUE INDEX "_blueprintToblueprint_book_AB_unique" ON "_blueprintToblueprint_book"("A", "B");

-- CreateIndex
CREATE INDEX "_blueprintToblueprint_book_B_index" ON "_blueprintToblueprint_book"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_blueprint_books_AB_unique" ON "_blueprint_books"("A", "B");

-- CreateIndex
CREATE INDEX "_blueprint_books_B_index" ON "_blueprint_books"("B");

-- AddForeignKey
ALTER TABLE "blueprint_page" ADD FOREIGN KEY ("blueprint_book_id") REFERENCES "blueprint_book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blueprint_page" ADD FOREIGN KEY ("blueprint_id") REFERENCES "blueprint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorites" ADD FOREIGN KEY ("blueprint_page_id") REFERENCES "blueprint_page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorites" ADD FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_blueprintToblueprint_book" ADD FOREIGN KEY ("A") REFERENCES "blueprint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_blueprintToblueprint_book" ADD FOREIGN KEY ("B") REFERENCES "blueprint_book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_blueprint_books" ADD FOREIGN KEY ("A") REFERENCES "blueprint_book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_blueprint_books" ADD FOREIGN KEY ("B") REFERENCES "blueprint_book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
