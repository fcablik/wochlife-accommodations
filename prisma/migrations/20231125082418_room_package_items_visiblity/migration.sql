/*
  Warnings:

  - You are about to drop the column `status` on the `RoomPackageItem` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RoomPackageItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "visibility" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_RoomPackageItem" ("id", "name", "price", "visibility") SELECT "id", "name", "price", "visibility" FROM "RoomPackageItem";
DROP TABLE "RoomPackageItem";
ALTER TABLE "new_RoomPackageItem" RENAME TO "RoomPackageItem";
CREATE UNIQUE INDEX "RoomPackageItem_id_key" ON "RoomPackageItem"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
