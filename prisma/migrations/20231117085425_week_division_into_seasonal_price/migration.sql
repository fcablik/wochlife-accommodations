/*
  Warnings:

  - Added the required column `weekDivisionId` to the `SeasonalRoomPrice` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SeasonalRoomPrice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nightPrice" INTEGER NOT NULL,
    "additionalNightPrice" INTEGER NOT NULL,
    "roomId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "weekDivisionId" TEXT NOT NULL,
    CONSTRAINT "SeasonalRoomPrice_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SeasonalRoomPrice_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "SeasonList" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SeasonalRoomPrice_weekDivisionId_fkey" FOREIGN KEY ("weekDivisionId") REFERENCES "WeekDivision" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SeasonalRoomPrice" ("additionalNightPrice", "id", "nightPrice", "roomId", "seasonId") SELECT "additionalNightPrice", "id", "nightPrice", "roomId", "seasonId" FROM "SeasonalRoomPrice";
DROP TABLE "SeasonalRoomPrice";
ALTER TABLE "new_SeasonalRoomPrice" RENAME TO "SeasonalRoomPrice";
CREATE UNIQUE INDEX "SeasonalRoomPrice_id_key" ON "SeasonalRoomPrice"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
