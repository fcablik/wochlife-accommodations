/*
  Warnings:

  - Added the required column `dateFrom` to the `RoomMultiPackage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateTo` to the `RoomMultiPackage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RoomMultiPackage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "dateFrom" TEXT NOT NULL,
    "dateTo" TEXT NOT NULL
);
INSERT INTO "new_RoomMultiPackage" ("id", "name", "price", "status") SELECT "id", "name", "price", "status" FROM "RoomMultiPackage";
DROP TABLE "RoomMultiPackage";
ALTER TABLE "new_RoomMultiPackage" RENAME TO "RoomMultiPackage";
CREATE UNIQUE INDEX "RoomMultiPackage_id_key" ON "RoomMultiPackage"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
