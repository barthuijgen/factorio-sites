-- AddForeignKey
ALTER TABLE "blueprint_page" ADD FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
