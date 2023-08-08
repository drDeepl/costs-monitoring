/*
  Warnings:

  - You are about to drop the `notes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "notes" DROP CONSTRAINT "notes_authorId_fkey";

-- DropTable
DROP TABLE "notes";

-- CreateTable
CREATE TABLE "costs" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "mount" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "costs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "role" VARCHAR(32) NOT NULL DEFAULT 'USER',

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "costs" ADD CONSTRAINT "costs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
