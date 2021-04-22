-- CreateTable
CREATE TABLE "comment" (
    "id" UUID NOT NULL,
    "blueprint_page_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "body" TEXT NOT NULL,
    "reply_comment_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comment" ADD FOREIGN KEY ("blueprint_page_id") REFERENCES "blueprint_page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD FOREIGN KEY ("reply_comment_id") REFERENCES "comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
