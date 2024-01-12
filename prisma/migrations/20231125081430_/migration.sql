-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RoomPackageItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "visibility" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_RoomPackageItem" ("id", "name", "price", "status") SELECT "id", "name", "price", "status" FROM "RoomPackageItem";
DROP TABLE "RoomPackageItem";
ALTER TABLE "new_RoomPackageItem" RENAME TO "RoomPackageItem";
CREATE UNIQUE INDEX "RoomPackageItem_id_key" ON "RoomPackageItem"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
