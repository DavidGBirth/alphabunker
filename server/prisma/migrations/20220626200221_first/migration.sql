-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birthdate" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "agencyNumber" INTEGER NOT NULL,
    "agencyVerificationCode" INTEGER NOT NULL,
    "accountNumber" INTEGER NOT NULL,
    "accountVerificationCode" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "balance" REAL NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
