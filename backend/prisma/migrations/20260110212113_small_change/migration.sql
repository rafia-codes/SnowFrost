/*
  Warnings:

  - You are about to drop the column `status` on the `Application` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Application" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "postingId" INTEGER NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'APPLIED',
    "resumeurl" TEXT,
    CONSTRAINT "Application_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Application_postingId_fkey" FOREIGN KEY ("postingId") REFERENCES "Posting" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Application" ("id", "postingId", "resumeurl", "studentId") SELECT "id", "postingId", "resumeurl", "studentId" FROM "Application";
DROP TABLE "Application";
ALTER TABLE "new_Application" RENAME TO "Application";
CREATE UNIQUE INDEX "Application_studentId_postingId_key" ON "Application"("studentId", "postingId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
