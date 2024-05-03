/*
  Warnings:

  - Made the column `affiliationType` on table `useraffiliation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `useraffiliation` MODIFY `affiliationType` ENUM('PRESIDENT', 'VICE_PRESIDENT', 'SECRETARY', 'MEMBER') NOT NULL;

-- AlterTable
ALTER TABLE `usercredentials` ALTER COLUMN `updatedDateTime` DROP DEFAULT;
