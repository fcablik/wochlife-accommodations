-- CreateTable
CREATE TABLE "SeasonList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dateFrom" TEXT NOT NULL,
    "dateTo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SeasonalRoomPrice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nightPrice" INTEGER NOT NULL,
    "additionalNightPrice" INTEGER NOT NULL,
    "roomId" TEXT NOT NULL,
    CONSTRAINT "SeasonalRoomPrice_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_RoomToSeasonList" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_RoomToSeasonList_A_fkey" FOREIGN KEY ("A") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RoomToSeasonList_B_fkey" FOREIGN KEY ("B") REFERENCES "SeasonList" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "SeasonList_id_key" ON "SeasonList"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SeasonalRoomPrice_id_key" ON "SeasonalRoomPrice"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_RoomToSeasonList_AB_unique" ON "_RoomToSeasonList"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomToSeasonList_B_index" ON "_RoomToSeasonList"("B");
