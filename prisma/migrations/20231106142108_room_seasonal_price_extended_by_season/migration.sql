/*
  Warnings:

  - Added the required column `seasonId` to the `RoomSeasonalPricing` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RoomSeasonalPricing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    CONSTRAINT "RoomSeasonalPricing_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_RoomSeasonalPricing" ("id", "name") SELECT "id", "name" FROM "RoomSeasonalPricing";
DROP TABLE "RoomSeasonalPricing";
ALTER TABLE "new_RoomSeasonalPricing" RENAME TO "RoomSeasonalPricing";
CREATE UNIQUE INDEX "RoomSeasonalPricing_id_key" ON "RoomSeasonalPricing"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
