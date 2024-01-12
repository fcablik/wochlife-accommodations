/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Room_url_key" ON "Room"("url");
