/*
  Warnings:

  - You are about to drop the column `additionalNightPrice` on the `SeasonalRoomPrice` table. All the data in the column will be lost.
  - You are about to drop the column `seasonId` on the `SeasonalRoomPrice` table. All the data in the column will be lost.
  - You are about to drop the column `weekDivisionId` on the `SeasonalRoomPrice` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SeasonalRoomPrice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "roomId" TEXT NOT NULL,
    "nightPrice" INTEGER NOT NULL,
    CONSTRAINT "SeasonalRoomPrice_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SeasonalRoomPrice" ("id", "nightPrice", "roomId") SELECT "id", "nightPrice", "roomId" FROM "SeasonalRoomPrice";
DROP TABLE "SeasonalRoomPrice";
ALTER TABLE "new_SeasonalRoomPrice" RENAME TO "SeasonalRoomPrice";
CREATE UNIQUE INDEX "SeasonalRoomPrice_id_key" ON "SeasonalRoomPrice"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
