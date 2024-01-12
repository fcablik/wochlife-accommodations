-- CreateTable
CREATE TABLE "RoomFacility" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RoomToRoomFacility" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_RoomToRoomFacility_A_fkey" FOREIGN KEY ("A") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RoomToRoomFacility_B_fkey" FOREIGN KEY ("B") REFERENCES "RoomFacility" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "RoomFacility_id_key" ON "RoomFacility"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_RoomToRoomFacility_AB_unique" ON "_RoomToRoomFacility"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomToRoomFacility_B_index" ON "_RoomToRoomFacility"("B");
