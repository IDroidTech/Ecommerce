-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "recommended" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "category_id" INTEGER NOT NULL,
    "brand_id" INTEGER NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_category" (
    "id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,
    "parent_category_id" INTEGER,

    CONSTRAINT "product_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_item" (
    "id" SERIAL NOT NULL,
    "SKU" TEXT NOT NULL,
    "qty_in_stock" INTEGER NOT NULL,
    "product_image" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "product_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "variation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variation_option" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "variation_id" INTEGER NOT NULL,

    CONSTRAINT "variation_option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_configuration" (
    "product_item_id" INTEGER NOT NULL,

    CONSTRAINT "product_configuration_pkey" PRIMARY KEY ("product_item_id")
);

-- CreateTable
CREATE TABLE "promotion" (
    "id" SERIAL NOT NULL,
    "promotion_name" TEXT NOT NULL,
    "promotion_description" TEXT NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promotion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_promotion" (
    "product_id" INTEGER NOT NULL,
    "promotion_id" INTEGER NOT NULL,

    CONSTRAINT "product_promotion_pkey" PRIMARY KEY ("product_id","promotion_id")
);

-- CreateTable
CREATE TABLE "brand" (
    "id" SERIAL NOT NULL,
    "brand_name" TEXT NOT NULL,

    CONSTRAINT "brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_address" (
    "user_id" INTEGER NOT NULL,
    "address_id" INTEGER NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_address_pkey" PRIMARY KEY ("user_id","address_id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" SERIAL NOT NULL,
    "address_line1" TEXT NOT NULL,
    "address_line2" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_review" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "orderd_product_id" INTEGER NOT NULL,
    "rating_value" DOUBLE PRECISION NOT NULL,
    "comment" TEXT NOT NULL,
    "review_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_payment_method" (
    "id" SERIAL NOT NULL,
    "provider" TEXT NOT NULL,
    "account_number" INTEGER NOT NULL,
    "expiry_date" TIMESTAMP(3) NOT NULL,
    "is_defualt" BOOLEAN NOT NULL,
    "user_id" INTEGER NOT NULL,
    "payment_type_id" INTEGER NOT NULL,

    CONSTRAINT "user_payment_method_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_type" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "payment_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart_item" (
    "id" SERIAL NOT NULL,
    "qty" INTEGER NOT NULL,
    "cart_id" INTEGER NOT NULL,
    "product_item_id" INTEGER NOT NULL,

    CONSTRAINT "cart_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wishlist" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wishlist_item" (
    "id" SERIAL NOT NULL,
    "wishlist_id" INTEGER NOT NULL,
    "product_item_id" INTEGER NOT NULL,

    CONSTRAINT "wishlist_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_line" (
    "id" SERIAL NOT NULL,
    "qty" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "product_item_id" INTEGER NOT NULL,

    CONSTRAINT "order_line_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_order" (
    "id" SERIAL NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_total" DOUBLE PRECISION NOT NULL,
    "user_id" INTEGER NOT NULL,
    "payment_method_id" INTEGER NOT NULL,
    "address_id" INTEGER NOT NULL,
    "shipping_method_id" INTEGER NOT NULL,
    "order_status_id" INTEGER NOT NULL,

    CONSTRAINT "shop_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipping_method" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "shipping_method_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_status" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "order_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_product_categoryTovariation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_product_configurationTovariation_option" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "product_item_SKU_key" ON "product_item"("SKU");

-- CreateIndex
CREATE UNIQUE INDEX "product_promotion_product_id_key" ON "product_promotion"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_review_user_id_orderd_product_id_key" ON "user_review"("user_id", "orderd_product_id");

-- CreateIndex
CREATE UNIQUE INDEX "cart_user_id_key" ON "cart"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "wishlist_user_id_key" ON "wishlist"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "_product_categoryTovariation_AB_unique" ON "_product_categoryTovariation"("A", "B");

-- CreateIndex
CREATE INDEX "_product_categoryTovariation_B_index" ON "_product_categoryTovariation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_product_configurationTovariation_option_AB_unique" ON "_product_configurationTovariation_option"("A", "B");

-- CreateIndex
CREATE INDEX "_product_configurationTovariation_option_B_index" ON "_product_configurationTovariation_option"("B");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "product_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_category" ADD CONSTRAINT "product_category_parent_category_id_fkey" FOREIGN KEY ("parent_category_id") REFERENCES "product_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_item" ADD CONSTRAINT "product_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variation_option" ADD CONSTRAINT "variation_option_variation_id_fkey" FOREIGN KEY ("variation_id") REFERENCES "variation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_configuration" ADD CONSTRAINT "product_configuration_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "product_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_promotion" ADD CONSTRAINT "product_promotion_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_promotion" ADD CONSTRAINT "product_promotion_promotion_id_fkey" FOREIGN KEY ("promotion_id") REFERENCES "promotion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_address" ADD CONSTRAINT "user_address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_address" ADD CONSTRAINT "user_address_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_review" ADD CONSTRAINT "user_review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_review" ADD CONSTRAINT "user_review_orderd_product_id_fkey" FOREIGN KEY ("orderd_product_id") REFERENCES "order_line"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_payment_method" ADD CONSTRAINT "user_payment_method_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_payment_method" ADD CONSTRAINT "user_payment_method_payment_type_id_fkey" FOREIGN KEY ("payment_type_id") REFERENCES "payment_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "product_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist_item" ADD CONSTRAINT "wishlist_item_wishlist_id_fkey" FOREIGN KEY ("wishlist_id") REFERENCES "wishlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist_item" ADD CONSTRAINT "wishlist_item_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "product_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_line" ADD CONSTRAINT "order_line_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "product_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_order" ADD CONSTRAINT "shop_order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_order" ADD CONSTRAINT "shop_order_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "user_payment_method"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_order" ADD CONSTRAINT "shop_order_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_order" ADD CONSTRAINT "shop_order_shipping_method_id_fkey" FOREIGN KEY ("shipping_method_id") REFERENCES "shipping_method"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_order" ADD CONSTRAINT "shop_order_order_status_id_fkey" FOREIGN KEY ("order_status_id") REFERENCES "order_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_product_categoryTovariation" ADD CONSTRAINT "_product_categoryTovariation_A_fkey" FOREIGN KEY ("A") REFERENCES "product_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_product_categoryTovariation" ADD CONSTRAINT "_product_categoryTovariation_B_fkey" FOREIGN KEY ("B") REFERENCES "variation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_product_configurationTovariation_option" ADD CONSTRAINT "_product_configurationTovariation_option_A_fkey" FOREIGN KEY ("A") REFERENCES "product_configuration"("product_item_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_product_configurationTovariation_option" ADD CONSTRAINT "_product_configurationTovariation_option_B_fkey" FOREIGN KEY ("B") REFERENCES "variation_option"("id") ON DELETE CASCADE ON UPDATE CASCADE;
