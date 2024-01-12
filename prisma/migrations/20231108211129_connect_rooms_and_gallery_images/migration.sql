-- CreateTable
CREATE TABLE "_RoomToRoomsGalleryImage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_RoomToRoomsGalleryImage_A_fkey" FOREIGN KEY ("A") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RoomToRoomsGalleryImage_B_fkey" FOREIGN KEY ("B") REFERENCES "RoomsGalleryImage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_RoomToRoomsGalleryImage_AB_unique" ON "_RoomToRoomsGalleryImage"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomToRoomsGalleryImage_B_index" ON "_RoomToRoomsGalleryImage"("B");
