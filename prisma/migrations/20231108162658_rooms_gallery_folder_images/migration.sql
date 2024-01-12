-- CreateTable
CREATE TABLE "RoomsGalleryFolderImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "altText" TEXT,
    "contentType" TEXT NOT NULL,
    "blob" BLOB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "roomsGalleryId" TEXT NOT NULL,
    CONSTRAINT "RoomsGalleryFolderImage_roomsGalleryId_fkey" FOREIGN KEY ("roomsGalleryId") REFERENCES "RoomsGalleryFolder" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "RoomsGalleryFolderImage_roomsGalleryId_idx" ON "RoomsGalleryFolderImage"("roomsGalleryId");
