-- CreateTable
CREATE TABLE "_RoomToRoomSeasonalPricing" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_RoomToRoomSeasonalPricing_A_fkey" FOREIGN KEY ("A") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RoomToRoomSeasonalPricing_B_fkey" FOREIGN KEY ("B") REFERENCES "RoomSeasonalPricing" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_RoomToRoomSeasonalPricing_AB_unique" ON "_RoomToRoomSeasonalPricing"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomToRoomSeasonalPricing_B_index" ON "_RoomToRoomSeasonalPricing"("B");
