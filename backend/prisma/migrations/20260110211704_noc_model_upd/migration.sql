/*
  Warnings:

  - Made the column `companyName` on table `NOC` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ctc` on table `NOC` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `NOC` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NOC" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "isGranted" TEXT NOT NULL DEFAULT 'PENDING',
    "companyName" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "ctc" TEXT NOT NULL,
    "offerLetterUrl" TEXT,
    CONSTRAINT "NOC_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_NOC" ("companyName", "ctc", "id", "isGranted", "offerLetterUrl", "role", "studentId", "type") SELECT "companyName", "ctc", "id", "isGranted", "offerLetterUrl", "role", "studentId", "type" FROM "NOC";
DROP TABLE "NOC";
ALTER TABLE "new_NOC" RENAME TO "NOC";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
