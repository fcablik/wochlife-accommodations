/*
  Warnings:

  - You are about to drop the `WeekDays` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "WeekDays";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "WeekDay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayInAWeek" TEXT NOT NULL,
    "divisionAssignmentId" TEXT,
    CONSTRAINT "WeekDay_divisionAssignmentId_fkey" FOREIGN KEY ("divisionAssignmentId") REFERENCES "WeekDivision" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "WeekDay_id_key" ON "WeekDay"("id");
