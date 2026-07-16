-- CreateEnum
CREATE TYPE "states" AS ENUM ('PEND', 'DONE', 'CANCELLED');

-- CreateTable
CREATE TABLE "appointments" (
    "id" SERIAL NOT NULL,
    "client_name" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "appointment_state" "states" NOT NULL DEFAULT 'PEND',

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);
