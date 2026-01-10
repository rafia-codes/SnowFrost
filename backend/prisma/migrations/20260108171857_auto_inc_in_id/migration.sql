-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Application" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "postingId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'APPLIED',
    "resumeurl" TEXT,
    CONSTRAINT "Application_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Application_postingId_fkey" FOREIGN KEY ("postingId") REFERENCES "Posting" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Application" ("id", "postingId", "resumeurl", "status", "studentId") SELECT "id", "postingId", "resumeurl", "status", "studentId" FROM "Application";
DROP TABLE "Application";
ALTER TABLE "new_Application" RENAME TO "Application";
CREATE UNIQUE INDEX "Application_studentId_postingId_key" ON "Application"("studentId", "postingId");
CREATE TABLE "new_NOC" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "studentId" INTEGER NOT NULL,
    "isGranted" TEXT NOT NULL DEFAULT 'PENDING',
    CONSTRAINT "NOC_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_NOC" ("id", "isGranted", "studentId") SELECT "id", "isGranted", "studentId" FROM "NOC";
DROP TABLE "NOC";
ALTER TABLE "new_NOC" RENAME TO "NOC";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
