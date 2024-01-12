/*
  Warnings:

  - Added the required column `index` to the `SeasonalRoomPrice` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SeasonalRoomPrice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "index" INTEGER NOT NULL,
    "seasonId" TEXT NOT NULL,
    "nightPrice" INTEGER NOT NULL,
    "roomId" TEXT NOT NULL,
    CONSTRAINT "SeasonalRoomPrice_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "SeasonList" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SeasonalRoomPrice_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SeasonalRoomPrice" ("id", "nightPrice", "roomId", "seasonId") SELECT "id", "nightPrice", "roomId", "seasonId" FROM "SeasonalRoomPrice";
DROP TABLE "SeasonalRoomPrice";
ALTER TABLE "new_SeasonalRoomPrice" RENAME TO "SeasonalRoomPrice";
CREATE UNIQUE INDEX "SeasonalRoomPrice_id_key" ON "SeasonalRoomPrice"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
