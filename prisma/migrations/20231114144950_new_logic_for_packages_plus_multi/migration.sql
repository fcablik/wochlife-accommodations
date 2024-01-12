/*
  Warnings:

  - You are about to drop the `RoomPackage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RoomToRoomPackage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RoomPackage";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_RoomToRoomPackage";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "RoomPackageItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "RoomMultiPackage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RoomToRoomPackageItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_RoomToRoomPackageItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RoomToRoomPackageItem_B_fkey" FOREIGN KEY ("B") REFERENCES "RoomPackageItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_RoomMultiPackageToRoomPackageItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_RoomMultiPackageToRoomPackageItem_A_fkey" FOREIGN KEY ("A") REFERENCES "RoomMultiPackage" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RoomMultiPackageToRoomPackageItem_B_fkey" FOREIGN KEY ("B") REFERENCES "RoomPackageItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "RoomPackageItem_id_key" ON "RoomPackageItem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "RoomMultiPackage_id_key" ON "RoomMultiPackage"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_RoomToRoomPackageItem_AB_unique" ON "_RoomToRoomPackageItem"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomToRoomPackageItem_B_index" ON "_RoomToRoomPackageItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RoomMultiPackageToRoomPackageItem_AB_unique" ON "_RoomMultiPackageToRoomPackageItem"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomMultiPackageToRoomPackageItem_B_index" ON "_RoomMultiPackageToRoomPackageItem"("B");
