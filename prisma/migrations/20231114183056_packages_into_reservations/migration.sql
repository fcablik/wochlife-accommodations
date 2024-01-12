-- CreateTable
CREATE TABLE "_ReservationToRoomPackageItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ReservationToRoomPackageItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Reservation" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ReservationToRoomPackageItem_B_fkey" FOREIGN KEY ("B") REFERENCES "RoomPackageItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ReservationToRoomMultiPackage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ReservationToRoomMultiPackage_A_fkey" FOREIGN KEY ("A") REFERENCES "Reservation" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ReservationToRoomMultiPackage_B_fkey" FOREIGN KEY ("B") REFERENCES "RoomMultiPackage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ReservationToRoomPackageItem_AB_unique" ON "_ReservationToRoomPackageItem"("A", "B");

-- CreateIndex
CREATE INDEX "_ReservationToRoomPackageItem_B_index" ON "_ReservationToRoomPackageItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ReservationToRoomMultiPackage_AB_unique" ON "_ReservationToRoomMultiPackage"("A", "B");

-- CreateIndex
CREATE INDEX "_ReservationToRoomMultiPackage_B_index" ON "_ReservationToRoomMultiPackage"("B");
