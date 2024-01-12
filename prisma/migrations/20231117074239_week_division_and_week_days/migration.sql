-- CreateTable
CREATE TABLE "WeekDivision" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "WeekDays" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayInAWeek" TEXT NOT NULL,
    "divisionAssignmentId" TEXT NOT NULL,
    CONSTRAINT "WeekDays_divisionAssignmentId_fkey" FOREIGN KEY ("divisionAssignmentId") REFERENCES "WeekDivision" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "WeekDivision_id_key" ON "WeekDivision"("id");

-- CreateIndex
CREATE UNIQUE INDEX "WeekDays_id_key" ON "WeekDays"("id");
