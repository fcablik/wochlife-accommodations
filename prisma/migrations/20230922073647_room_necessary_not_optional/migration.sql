/*
  Warnings:

  - Made the column `roomId` on table `Reservation` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reservation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "message" TEXT,
    "reservationDateFrom" DATETIME NOT NULL,
    "reservationDateTo" DATETIME NOT NULL,
    "roomId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Reservation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reservation" ("createdAt", "id", "message", "name", "reservationDateFrom", "reservationDateTo", "roomId", "updatedAt") SELECT "createdAt", "id", "message", "name", "reservationDateFrom", "reservationDateTo", "roomId", "updatedAt" FROM "Reservation";
DROP TABLE "Reservation";
ALTER TABLE "new_Reservation" RENAME TO "Reservation";
CREATE UNIQUE INDEX "Reservation_id_key" ON "Reservation"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
