/*
  Warnings:

  - Added the required column `numberOfNights` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomAdditionalNightPrice` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reservation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nightPrice" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT,
    "numberOfGuests" INTEGER NOT NULL,
    "numberOfNights" INTEGER NOT NULL,
    "roomAdditionalNightPrice" INTEGER NOT NULL,
    "reservationDateFrom" TEXT NOT NULL,
    "reservationDateTo" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Reservation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Reservation" ("createdAt", "email", "id", "message", "name", "nightPrice", "numberOfGuests", "reservationDateFrom", "reservationDateTo", "roomId", "totalPrice", "updatedAt") SELECT "createdAt", "email", "id", "message", "name", "nightPrice", "numberOfGuests", "reservationDateFrom", "reservationDateTo", "roomId", "totalPrice", "updatedAt" FROM "Reservation";
DROP TABLE "Reservation";
ALTER TABLE "new_Reservation" RENAME TO "Reservation";
CREATE UNIQUE INDEX "Reservation_id_key" ON "Reservation"("id");
CREATE INDEX "Reservation_roomId_updatedAt_idx" ON "Reservation"("roomId", "updatedAt");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
