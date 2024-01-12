/*
  Warnings:

  - Added the required column `dateFrom` to the `Season` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateTo` to the `Season` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Season" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "dateFrom" TEXT NOT NULL,
    "dateTo" TEXT NOT NULL
);
INSERT INTO "new_Season" ("id", "name") SELECT "id", "name" FROM "Season";
DROP TABLE "Season";
ALTER TABLE "new_Season" RENAME TO "Season";
CREATE UNIQUE INDEX "Season_id_key" ON "Season"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
