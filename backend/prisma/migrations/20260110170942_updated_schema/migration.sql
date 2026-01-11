/*
  Warnings:

  - Added the required column `type` to the `NOC` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NOC" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "isGranted" TEXT NOT NULL DEFAULT 'PENDING',
    "companyName" TEXT,
    "role" TEXT,
    "ctc" TEXT,
    "offerLetterUrl" TEXT,
    CONSTRAINT "NOC_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_NOC" ("id", "isGranted", "studentId") SELECT "id", "isGranted", "studentId" FROM "NOC";
DROP TABLE "NOC";
ALTER TABLE "new_NOC" RENAME TO "NOC";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
