/*
  Warnings:

  - Made the column `orgID` on table `projects` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `projects` MODIFY `orgID` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `usercredentials` ALTER COLUMN `updatedDateTime` DROP DEFAULT;

-- AlterTable
ALTER TABLE `userslogout` MODIFY `token` VARCHAR(10000) NULL;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_orgID_fkey` FOREIGN KEY (`orgID`) REFERENCES `organizations`(`orgID`) ON DELETE RESTRICT ON UPDATE CASCADE;
