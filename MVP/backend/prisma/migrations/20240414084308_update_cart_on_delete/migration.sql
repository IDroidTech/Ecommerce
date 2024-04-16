-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_user_id_fkey";

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
