/*
  Warnings:

  - A unique constraint covering the columns `[dayInAWeek]` on the table `WeekDay` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WeekDay_dayInAWeek_key" ON "WeekDay"("dayInAWeek");
