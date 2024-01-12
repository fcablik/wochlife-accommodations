-- CreateTable
CREATE TABLE "RoomPackage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RoomToRoomPackage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_RoomToRoomPackage_A_fkey" FOREIGN KEY ("A") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RoomToRoomPackage_B_fkey" FOREIGN KEY ("B") REFERENCES "RoomPackage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "RoomPackage_id_key" ON "RoomPackage"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_RoomToRoomPackage_AB_unique" ON "_RoomToRoomPackage"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomToRoomPackage_B_index" ON "_RoomToRoomPackage"("B");
