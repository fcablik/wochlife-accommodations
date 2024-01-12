/*
  Warnings:

  - You are about to drop the column `additionalNightPrice` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Room` table. All the data in the column will be lost.
  - Added the required column `additionalNightPrice1` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price1` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Room" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "seo" TEXT,
    "visibility" BOOLEAN NOT NULL DEFAULT false,
    "price1" INTEGER NOT NULL,
    "additionalNightPrice1" INTEGER NOT NULL,
    "price2" INTEGER,
    "additionalNightPrice2" INTEGER,
    "price3" INTEGER,
    "additionalNightPrice3" INTEGER,
    "numberOfGuestsForDefaultPrice" INTEGER NOT NULL,
    "maxGuests" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Room" ("createdAt", "description", "id", "maxGuests", "numberOfGuestsForDefaultPrice", "seo", "title", "updatedAt", "url", "visibility") SELECT "createdAt", "description", "id", "maxGuests", "numberOfGuestsForDefaultPrice", "seo", "title", "updatedAt", "url", "visibility" FROM "Room";
DROP TABLE "Room";
ALTER TABLE "new_Room" RENAME TO "Room";
CREATE UNIQUE INDEX "Room_url_key" ON "Room"("url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
