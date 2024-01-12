/*
  Warnings:

  - You are about to drop the column `status` on the `RoomMultiPackage` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RoomMultiPackage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "dateFrom" TEXT NOT NULL,
    "dateTo" TEXT NOT NULL,
    "visibility" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_RoomMultiPackage" ("dateFrom", "dateTo", "id", "name", "price", "visibility") SELECT "dateFrom", "dateTo", "id", "name", "price", "visibility" FROM "RoomMultiPackage";
DROP TABLE "RoomMultiPackage";
ALTER TABLE "new_RoomMultiPackage" RENAME TO "RoomMultiPackage";
CREATE UNIQUE INDEX "RoomMultiPackage_id_key" ON "RoomMultiPackage"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
