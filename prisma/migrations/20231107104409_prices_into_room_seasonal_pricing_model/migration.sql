/*
  Warnings:

  - Added the required column `additionalNightPrice` to the `RoomSeasonalPricing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nightPrice` to the `RoomSeasonalPricing` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RoomSeasonalPricing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nightPrice" INTEGER NOT NULL,
    "additionalNightPrice" INTEGER NOT NULL,
    "seasonId" TEXT NOT NULL,
    CONSTRAINT "RoomSeasonalPricing_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_RoomSeasonalPricing" ("id", "name", "seasonId") SELECT "id", "name", "seasonId" FROM "RoomSeasonalPricing";
DROP TABLE "RoomSeasonalPricing";
ALTER TABLE "new_RoomSeasonalPricing" RENAME TO "RoomSeasonalPricing";
CREATE UNIQUE INDEX "RoomSeasonalPricing_id_key" ON "RoomSeasonalPricing"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
