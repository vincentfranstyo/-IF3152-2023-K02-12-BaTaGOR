-- CreateTable
CREATE TABLE "archives" (
    "history_id" SERIAL NOT NULL,
    "booking_id" INTEGER NOT NULL,
    "field_id" INTEGER NOT NULL,

    CONSTRAINT "archives_pkey" PRIMARY KEY ("history_id","booking_id","field_id")
);

-- CreateTable
CREATE TABLE "booking" (
    "booking_id" SERIAL NOT NULL,
    "duration_minute" INTEGER NOT NULL,
    "start_time" TIME(6) NOT NULL,
    "booking_date" DATE NOT NULL,
    "total_price" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "field_id" INTEGER NOT NULL,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("booking_id")
);

-- CreateTable
CREATE TABLE "customer" (
    "user_id" SERIAL NOT NULL,
    "domicile" TEXT,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "field" (
    "field_id" SERIAL NOT NULL,
    "field_name" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "postal_code" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "rate_per_hour" INTEGER NOT NULL,
    "operational_status" TEXT NOT NULL,
    "owner_id" INTEGER,

    CONSTRAINT "field_pkey" PRIMARY KEY ("field_id")
);

-- CreateTable
CREATE TABLE "manage_booking" (
    "booking_id" INTEGER NOT NULL,
    "staff_id" INTEGER NOT NULL,

    CONSTRAINT "manage_booking_pkey" PRIMARY KEY ("booking_id","staff_id")
);

-- CreateTable
CREATE TABLE "owner" (
    "user_id" SERIAL NOT NULL,

    CONSTRAINT "owner_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "staff" (
    "user_id" INTEGER NOT NULL,
    "field-id" INTEGER NOT NULL,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("user_id","field-id")
);

-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone_num" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashed_pass" TEXT,
    "access_level" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "booking_booking_id_key" ON "booking"("booking_id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_user_id_key" ON "customer"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "field_field_id_key" ON "field"("field_id");

-- CreateIndex
CREATE UNIQUE INDEX "owner_user_id_key" ON "owner"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "staff_user_id_key" ON "staff"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_user_id_key" ON "user"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "archives" ADD CONSTRAINT "archives_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "booking"("booking_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "archives" ADD CONSTRAINT "archives_field_id_fkey" FOREIGN KEY ("field_id") REFERENCES "field"("field_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_field_id_fkey" FOREIGN KEY ("field_id") REFERENCES "field"("field_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field" ADD CONSTRAINT "field_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "owner"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manage_booking" ADD CONSTRAINT "manage_booking_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "booking"("booking_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manage_booking" ADD CONSTRAINT "manage_booking_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staff"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "owner" ADD CONSTRAINT "owner_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_field-id_fkey" FOREIGN KEY ("field-id") REFERENCES "field"("field_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
