-- CreateTable
CREATE TABLE "RoomsGalleryFolder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "RoomsGalleryFolder_id_key" ON "RoomsGalleryFolder"("id");
