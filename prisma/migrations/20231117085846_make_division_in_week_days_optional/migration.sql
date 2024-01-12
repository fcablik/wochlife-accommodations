-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WeekDays" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dayInAWeek" TEXT NOT NULL,
    "divisionAssignmentId" TEXT,
    CONSTRAINT "WeekDays_divisionAssignmentId_fkey" FOREIGN KEY ("divisionAssignmentId") REFERENCES "WeekDivision" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WeekDays" ("dayInAWeek", "divisionAssignmentId", "id") SELECT "dayInAWeek", "divisionAssignmentId", "id" FROM "WeekDays";
DROP TABLE "WeekDays";
ALTER TABLE "new_WeekDays" RENAME TO "WeekDays";
CREATE UNIQUE INDEX "WeekDays_id_key" ON "WeekDays"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
