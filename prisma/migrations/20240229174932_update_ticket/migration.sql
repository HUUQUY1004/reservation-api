/*
  Warnings:

  - You are about to drop the column `departure_location` on the `Tickets` table. All the data in the column will be lost.
  - You are about to drop the column `departure_time` on the `Tickets` table. All the data in the column will be lost.
  - You are about to drop the column `destination` on the `Tickets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tickets" DROP COLUMN "departure_location",
DROP COLUMN "departure_time",
DROP COLUMN "destination";

-- CreateTable
CREATE TABLE "CT_Ticket" (
    "id" SERIAL NOT NULL,
    "departure_time" TIMESTAMP(3) NOT NULL,
    "departure_location" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "ticketId" INTEGER NOT NULL,

    CONSTRAINT "CT_Ticket_pkey" PRIMARY KEY ("id")
);
