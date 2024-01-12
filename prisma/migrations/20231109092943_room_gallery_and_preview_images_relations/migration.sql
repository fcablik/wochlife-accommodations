/*
  Warnings:

  - You are about to drop the `_RoomToRoomsGalleryImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_RoomToRoomsGalleryImage";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_galleryImages" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_galleryImages_A_fkey" FOREIGN KEY ("A") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_galleryImages_B_fkey" FOREIGN KEY ("B") REFERENCES "RoomsGalleryImage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_previewImages" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_previewImages_A_fkey" FOREIGN KEY ("A") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_previewImages_B_fkey" FOREIGN KEY ("B") REFERENCES "RoomsGalleryImage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_galleryImages_AB_unique" ON "_galleryImages"("A", "B");

-- CreateIndex
CREATE INDEX "_galleryImages_B_index" ON "_galleryImages"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_previewImages_AB_unique" ON "_previewImages"("A", "B");

-- CreateIndex
CREATE INDEX "_previewImages_B_index" ON "_previewImages"("B");
