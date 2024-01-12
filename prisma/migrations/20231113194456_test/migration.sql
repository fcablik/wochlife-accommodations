/*
  Warnings:

  - Added the required column `numberOfGuestsForDefaultPrice` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfGuestsForDefaultPrice` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reservation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL DEFAULT 'accepted',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT,
    "nightPrice" INTEGER NOT NULL,
    "additionalGuestNightPrice" INTEGER,
    "numberOfGuestsForDefaultPrice" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "numberOfGuests" INTEGER NOT NULL,
    "numberOfNights" INTEGER NOT NULL,
    "reservationNumber" TEXT NOT NULL,
    "reservationDateFrom" TEXT NOT NULL,
    "reservationDateTo" TEXT NOT NULL,
    "createdAtString" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Reservation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Reservation" ("additionalGuestNightPrice", "createdAt", "createdAtString", "email", "id", "message", "name", "nightPrice", "numberOfGuests", "numberOfNights", "reservationDateFrom", "reservationDateTo", "reservationNumber", "roomId", "status", "totalPrice", "updatedAt") SELECT "additionalGuestNightPrice", "createdAt", "createdAtString", "email", "id", "message", "name", "nightPrice", "numberOfGuests", "numberOfNights", "reservationDateFrom", "reservationDateTo", "reservationNumber", "roomId", "status", "totalPrice", "updatedAt" FROM "Reservation";
DROP TABLE "Reservation";
ALTER TABLE "new_Reservation" RENAME TO "Reservation";
CREATE UNIQUE INDEX "Reservation_id_key" ON "Reservation"("id");
CREATE UNIQUE INDEX "Reservation_reservationNumber_key" ON "Reservation"("reservationNumber");
CREATE INDEX "Reservation_roomId_updatedAt_idx" ON "Reservation"("roomId", "updatedAt");
CREATE TABLE "new_Room" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "seo" TEXT,
    "visibility" BOOLEAN NOT NULL DEFAULT false,
    "price" INTEGER NOT NULL,
    "additionalNightPrice" INTEGER NOT NULL,
    "numberOfGuestsForDefaultPrice" INTEGER NOT NULL,
    "maxGuests" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Room" ("additionalNightPrice", "createdAt", "description", "id", "maxGuests", "price", "seo", "title", "updatedAt", "url", "visibility") SELECT "additionalNightPrice", "createdAt", "description", "id", "maxGuests", "price", "seo", "title", "updatedAt", "url", "visibility" FROM "Room";
DROP TABLE "Room";
ALTER TABLE "new_Room" RENAME TO "Room";
CREATE UNIQUE INDEX "Room_url_key" ON "Room"("url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
