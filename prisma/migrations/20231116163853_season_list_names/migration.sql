/*
  Warnings:

  - Added the required column `name` to the `SeasonList` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SeasonList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "dateFrom" TEXT NOT NULL,
    "dateTo" TEXT NOT NULL
);
INSERT INTO "new_SeasonList" ("dateFrom", "dateTo", "id") SELECT "dateFrom", "dateTo", "id" FROM "SeasonList";
DROP TABLE "SeasonList";
ALTER TABLE "new_SeasonList" RENAME TO "SeasonList";
CREATE UNIQUE INDEX "SeasonList_id_key" ON "SeasonList"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
