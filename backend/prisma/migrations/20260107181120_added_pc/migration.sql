-- CreateTable
CREATE TABLE "PC" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "department" TEXT NOT NULL,
    "college" TEXT NOT NULL,
    CONSTRAINT "PC_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "PC_userId_key" ON "PC"("userId");
