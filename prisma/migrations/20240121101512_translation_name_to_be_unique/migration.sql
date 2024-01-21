/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Translation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Translation_name_key" ON "Translation"("name");
