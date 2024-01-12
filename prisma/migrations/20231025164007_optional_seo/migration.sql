-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Room" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "seo" TEXT,
    "visibility" BOOLEAN NOT NULL DEFAULT false,
    "price" INTEGER NOT NULL,
    "additionalNightPrice" INTEGER NOT NULL,
    "maxGuests" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Room" ("additionalNightPrice", "createdAt", "description", "id", "maxGuests", "price", "seo", "title", "updatedAt", "url", "visibility") SELECT "additionalNightPrice", "createdAt", "description", "id", "maxGuests", "price", "seo", "title", "updatedAt", "url", "visibility" FROM "Room";
DROP TABLE "Room";
ALTER TABLE "new_Room" RENAME TO "Room";
CREATE UNIQUE INDEX "Room_url_key" ON "Room"("url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
