-- CreateTable
CREATE TABLE "_RoomToRoomMultiPackage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_RoomToRoomMultiPackage_A_fkey" FOREIGN KEY ("A") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RoomToRoomMultiPackage_B_fkey" FOREIGN KEY ("B") REFERENCES "RoomMultiPackage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_RoomToRoomMultiPackage_AB_unique" ON "_RoomToRoomMultiPackage"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomToRoomMultiPackage_B_index" ON "_RoomToRoomMultiPackage"("B");
