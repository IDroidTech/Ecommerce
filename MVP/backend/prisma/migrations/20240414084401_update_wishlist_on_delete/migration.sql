-- DropForeignKey
ALTER TABLE "wishlist" DROP CONSTRAINT "wishlist_user_id_fkey";

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
