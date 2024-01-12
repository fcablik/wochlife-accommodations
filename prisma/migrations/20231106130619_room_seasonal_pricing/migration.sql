-- CreateTable
CREATE TABLE "RoomSeasonalPricing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "RoomSeasonalPricing_id_key" ON "RoomSeasonalPricing"("id");
