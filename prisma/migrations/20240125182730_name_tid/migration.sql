/*
  Warnings:

  - You are about to drop the column `name` on the `Translation` table. All the data in the column will be lost.
  - Added the required column `tid` to the `Translation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Translation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tid" TEXT NOT NULL,
    "en" TEXT NOT NULL,
    "cs" TEXT NOT NULL
);
INSERT INTO "new_Translation" ("cs", "en", "id") SELECT "cs", "en", "id" FROM "Translation";
DROP TABLE "Translation";
ALTER TABLE "new_Translation" RENAME TO "Translation";
CREATE UNIQUE INDEX "Translation_id_key" ON "Translation"("id");
CREATE UNIQUE INDEX "Translation_tid_key" ON "Translation"("tid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
