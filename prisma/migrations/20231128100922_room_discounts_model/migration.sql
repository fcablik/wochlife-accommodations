-- CreateTable
CREATE TABLE "RoomDiscount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "dateFrom" TEXT NOT NULL,
    "dateTo" TEXT NOT NULL,
    "visibility" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_RoomToRoomDiscount" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_RoomToRoomDiscount_A_fkey" FOREIGN KEY ("A") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RoomToRoomDiscount_B_fkey" FOREIGN KEY ("B") REFERENCES "RoomDiscount" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "RoomDiscount_id_key" ON "RoomDiscount"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_RoomToRoomDiscount_AB_unique" ON "_RoomToRoomDiscount"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomToRoomDiscount_B_index" ON "_RoomToRoomDiscount"("B");
