/*
  Warnings:

  - You are about to drop the `RoomsGalleryFolder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoomsGalleryFolderImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RoomsGalleryFolder";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RoomsGalleryFolderImage";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "RoomsGallery" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "RoomsGalleryImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "altText" TEXT,
    "contentType" TEXT NOT NULL,
    "blob" BLOB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "roomsGalleryId" TEXT NOT NULL,
    CONSTRAINT "RoomsGalleryImage_roomsGalleryId_fkey" FOREIGN KEY ("roomsGalleryId") REFERENCES "RoomsGallery" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "RoomsGallery_id_key" ON "RoomsGallery"("id");

-- CreateIndex
CREATE INDEX "RoomsGalleryImage_roomsGalleryId_idx" ON "RoomsGalleryImage"("roomsGalleryId");
