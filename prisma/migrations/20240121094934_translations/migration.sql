-- CreateTable
CREATE TABLE "Translation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "en" TEXT NOT NULL,
    "cs" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Translation_id_key" ON "Translation"("id");
