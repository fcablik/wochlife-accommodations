/*
  Warnings:

  - You are about to drop the column `index` on the `SeasonalRoomPrice` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SeasonalRoomPrice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "seasonId" TEXT NOT NULL,
    "nightPrice" INTEGER NOT NULL,
    "roomId" TEXT NOT NULL,
    "weekDivisionId" TEXT,
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
