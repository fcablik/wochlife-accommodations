/*
  Warnings:

  - You are about to drop the column `dateFrom` on the `RoomDiscount` table. All the data in the column will be lost.
  - You are about to drop the column `dateTo` on the `RoomDiscount` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `RoomDiscount` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `RoomDiscount` table. All the data in the column will be lost.
  - Added the required column `type` to the `RoomDiscount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `RoomDiscount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueType` to the `RoomDiscount` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RoomDiscount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "valueType" TEXT NOT NULL,
    "visibility" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_RoomDiscount" ("createdAt", "id", "updatedAt", "visibility") SELECT "createdAt", "id", "updatedAt", "visibility" FROM "RoomDiscount";
DROP TABLE "RoomDiscount";
ALTER TABLE "new_RoomDiscount" RENAME TO "RoomDiscount";
CREATE UNIQUE INDEX "RoomDiscount_id_key" ON "RoomDiscount"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
