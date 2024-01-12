/*
  Warnings:

  - Made the column `weekDivisionId` on table `SeasonalRoomPrice` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SeasonalRoomPrice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "seasonId" TEXT NOT NULL,
    "nightPrice" INTEGER NOT NULL,
    "roomId" TEXT NOT NULL,
    "weekDivisionId" TEXT NOT NULL,
    CONSTRAINT "SeasonalRoomPrice_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "SeasonList" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SeasonalRoomPrice_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SeasonalRoomPrice_weekDivisionId_fkey" FOREIGN KEY ("weekDivisionId") REFERENCES "WeekDivision" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SeasonalRoomPrice" ("id", "nightPrice", "roomId", "seasonId", "weekDivisionId") SELECT "id", "nightPrice", "roomId", "seasonId", "weekDivisionId" FROM "SeasonalRoomPrice";
DROP TABLE "SeasonalRoomPrice";
ALTER TABLE "new_SeasonalRoomPrice" RENAME TO "SeasonalRoomPrice";
CREATE UNIQUE INDEX "SeasonalRoomPrice_id_key" ON "SeasonalRoomPrice"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
