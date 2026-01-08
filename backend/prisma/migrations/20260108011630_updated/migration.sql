/*
  Warnings:

  - You are about to drop the `PC` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `yr` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId,postingId]` on the table `Application` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companyName]` on the table `Recruiter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `branch` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PC_userId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PC";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PCOORDINATOR" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "department" TEXT NOT NULL,
    "college" TEXT NOT NULL,
    CONSTRAINT "PCOORDINATOR_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "year" INTEGER,
    "passOutyr" INTEGER,
    "cgpa" REAL,
    "backlogs" INTEGER,
    "skills" TEXT,
    "resumeUrl" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "employability" TEXT,
    CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("backlogs", "cgpa", "employability", "id", "isVerified", "passOutyr", "skills", "userId") SELECT "backlogs", "cgpa", "employability", "id", "isVerified", "passOutyr", "skills", "userId" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "PCOORDINATOR_userId_key" ON "PCOORDINATOR"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Application_studentId_postingId_key" ON "Application"("studentId", "postingId");

-- CreateIndex
CREATE UNIQUE INDEX "Recruiter_companyName_key" ON "Recruiter"("companyName");
