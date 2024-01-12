/*
  Warnings:

  - Added the required column `additionalNightPrice` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxGuests` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Room" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "visibility" BOOLEAN NOT NULL DEFAULT false,
    "price" INTEGER NOT NULL,
    "additionalNightPrice" INTEGER NOT NULL,
    "maxGuests" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Room" ("createdAt", "description", "id", "price", "title", "updatedAt", "url", "visibility") SELECT "createdAt", "description", "id", "price", "title", "updatedAt", "url", "visibility" FROM "Room";
DROP TABLE "Room";
ALTER TABLE "new_Room" RENAME TO "Room";
CREATE UNIQUE INDEX "Room_url_key" ON "Room"("url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
