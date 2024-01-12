-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RoomMultiPackage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "dateFrom" TEXT NOT NULL,
    "dateTo" TEXT NOT NULL,
    "visibility" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_RoomMultiPackage" ("dateFrom", "dateTo", "id", "name", "price", "status", "visibility") SELECT "dateFrom", "dateTo", "id", "name", "price", "status", "visibility" FROM "RoomMultiPackage";
DROP TABLE "RoomMultiPackage";
ALTER TABLE "new_RoomMultiPackage" RENAME TO "RoomMultiPackage";
CREATE UNIQUE INDEX "RoomMultiPackage_id_key" ON "RoomMultiPackage"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
