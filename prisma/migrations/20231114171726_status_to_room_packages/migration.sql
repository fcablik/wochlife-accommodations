-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RoomMultiPackage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active'
);
INSERT INTO "new_RoomMultiPackage" ("id", "name", "price") SELECT "id", "name", "price" FROM "RoomMultiPackage";
DROP TABLE "RoomMultiPackage";
ALTER TABLE "new_RoomMultiPackage" RENAME TO "RoomMultiPackage";
CREATE UNIQUE INDEX "RoomMultiPackage_id_key" ON "RoomMultiPackage"("id");
CREATE TABLE "new_RoomPackageItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active'
);
INSERT INTO "new_RoomPackageItem" ("id", "name", "price") SELECT "id", "name", "price" FROM "RoomPackageItem";
DROP TABLE "RoomPackageItem";
ALTER TABLE "new_RoomPackageItem" RENAME TO "RoomPackageItem";
CREATE UNIQUE INDEX "RoomPackageItem_id_key" ON "RoomPackageItem"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
