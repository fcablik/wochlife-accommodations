/*
  Warnings:

  - You are about to drop the column `price` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `nightPrice` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Reservation` table without a default value. This is not possible if the table is not empty.

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
    "reservationDateFrom" DATETIME NOT NULL,
    "reservationDateTo" DATETIME NOT NULL,
    "roomId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Reservation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reservation" ("createdAt", "email", "id", "message", "name", "reservationDateFrom", "reservationDateTo", "roomId", "updatedAt") SELECT "createdAt", "email", "id", "message", "name", "reservationDateFrom", "reservationDateTo", "roomId", "updatedAt" FROM "Reservation";
DROP TABLE "Reservation";
ALTER TABLE "new_Reservation" RENAME TO "Reservation";
CREATE UNIQUE INDEX "Reservation_id_key" ON "Reservation"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
