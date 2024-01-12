/*
  Warnings:

  - Added the required column `updatedAt` to the `RoomMultiPackage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `RoomPackageItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RoomMultiPackage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "dateFrom" TEXT NOT NULL,
    "dateTo" TEXT NOT NULL,
    "visibility" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_RoomMultiPackage" ("dateFrom", "dateTo", "id", "name", "price", "visibility") SELECT "dateFrom", "dateTo", "id", "name", "price", "visibility" FROM "RoomMultiPackage";
DROP TABLE "RoomMultiPackage";
ALTER TABLE "new_RoomMultiPackage" RENAME TO "RoomMultiPackage";
CREATE UNIQUE INDEX "RoomMultiPackage_id_key" ON "RoomMultiPackage"("id");
CREATE TABLE "new_RoomPackageItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "visibility" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_RoomPackageItem" ("id", "name", "price", "visibility") SELECT "id", "name", "price", "visibility" FROM "RoomPackageItem";
DROP TABLE "RoomPackageItem";
ALTER TABLE "new_RoomPackageItem" RENAME TO "RoomPackageItem";
CREATE UNIQUE INDEX "RoomPackageItem_id_key" ON "RoomPackageItem"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
