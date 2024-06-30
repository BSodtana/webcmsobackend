/*
  Warnings:

  - You are about to drop the column `createdDateTime` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `registerFrom` on the `projectstaffrecruitposition` table. All the data in the column will be lost.
  - You are about to drop the column `registerUntil` on the `projectstaffrecruitposition` table. All the data in the column will be lost.
  - The primary key for the `useraffiliation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `usercredentials` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `killedTokenAutoID` on the `userslogout` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `userslogout` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `usercredentials` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `autoID` to the `userslogout` table without a default value. This is not possible if the table is not empty.
  - Made the column `token` on table `userslogout` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `organizations` DROP FOREIGN KEY `organizations-parentOrg`;

-- DropForeignKey
ALTER TABLE `usercodeverification` DROP FOREIGN KEY `usercredentials-usercodeverification-studentID`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `usercredentials-user-studentID`;

-- DropForeignKey
ALTER TABLE `userslogout` DROP FOREIGN KEY `usercredentials-userlogout-uuid`;

-- DropIndex
DROP INDEX `studentID` ON `usercredentials`;

-- DropIndex
DROP INDEX `killedTokenAutoID` ON `userslogout`;

-- AlterTable
ALTER TABLE `organizations` ADD COLUMN `orgDesc` TEXT NULL,
    ADD COLUMN `orgImageID` VARCHAR(50) NULL,
    ALTER COLUMN `orgID` DROP DEFAULT,
    MODIFY `orgType` ENUM('ROOT', 'CLUB', 'DIVISION', 'OTHER') NOT NULL DEFAULT 'DIVISION',
    ALTER COLUMN `parentOrg` DROP DEFAULT;

-- AlterTable
ALTER TABLE `projectdata` DROP COLUMN `createdDateTime`,
    ADD COLUMN `updatedDateTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `professorFullName` VARCHAR(150) NULL DEFAULT '',
    MODIFY `professorAffiliation` VARCHAR(150) NULL DEFAULT '';

-- AlterTable
ALTER TABLE `projectparticipantrecruit` ADD COLUMN `password` VARCHAR(50) NULL,
    ADD COLUMN `recruitDescription` TEXT NULL,
    ADD COLUMN `recruitName` VARCHAR(250) NULL DEFAULT 'New Recruitment',
    MODIFY `maxNumber` INTEGER NOT NULL DEFAULT 1,
    MODIFY `yearAllowed` VARCHAR(191) NOT NULL DEFAULT '0,1,2,3,4,5,6,99';

-- AlterTable
ALTER TABLE `projects` MODIFY `academicYear` VARCHAR(50) NOT NULL DEFAULT '202401';

-- AlterTable
ALTER TABLE `projectstaffrecruit` ADD COLUMN `password` VARCHAR(50) NULL,
    ADD COLUMN `recruitDescription` TEXT NULL,
    ADD COLUMN `recruitName` VARCHAR(250) NULL DEFAULT 'New Recruitment',
    MODIFY `registerFrom` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `registerUntil` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `yearAllowed` VARCHAR(191) NOT NULL DEFAULT '0,1,2,3,4,5,6,99';

-- AlterTable
ALTER TABLE `projectstaffrecruitposition` DROP COLUMN `registerFrom`,
    DROP COLUMN `registerUntil`;

-- AlterTable
ALTER TABLE `useraffiliation` DROP PRIMARY KEY,
    MODIFY `affiliationID` VARCHAR(50) NOT NULL DEFAULT '',
    ADD PRIMARY KEY (`affiliatedOrg`, `affiliationID`);

-- AlterTable
ALTER TABLE `usercredentials` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`studentID`);

-- AlterTable
ALTER TABLE `userslogout` DROP COLUMN `killedTokenAutoID`,
    DROP COLUMN `uuid`,
    ADD COLUMN `autoID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `studentID` VARCHAR(50) NOT NULL DEFAULT '0',
    MODIFY `token` VARCHAR(1000) NOT NULL DEFAULT '0',
    ADD PRIMARY KEY (`autoID`);

-- CreateTable
CREATE TABLE `cmsoprojectannouncement` (
    `announcementID` VARCHAR(50) NOT NULL,
    `studentID` VARCHAR(10) NOT NULL,
    `projectID` VARCHAR(50) NULL,
    `announcementTitle` VARCHAR(250) NULL DEFAULT 'New Announcement',
    `announcementBody` MEDIUMTEXT NULL,
    `announcementCTALink` TEXT NULL,
    `updatedDateTime` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `projectID`(`projectID`),
    INDEX `studentID`(`studentID`),
    PRIMARY KEY (`announcementID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `uploadedfiledraft` (
    `fileID` VARCHAR(50) NOT NULL DEFAULT '',
    `studentID` VARCHAR(10) NOT NULL,
    `path` TEXT NOT NULL,
    `updatedDatetime` DATETIME(0) NULL,

    INDEX `studentID`(`studentID`),
    PRIMARY KEY (`fileID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE FULLTEXT INDEX `projectNameTH` ON `projects`(`projectNameTH`);

-- CreateIndex
CREATE FULLTEXT INDEX `projectNameEN` ON `projects`(`projectNameEN`);

-- CreateIndex
CREATE FULLTEXT INDEX `projectNickNameEN` ON `projects`(`projectNickNameEN`);

-- CreateIndex
CREATE FULLTEXT INDEX `projectNickNameTH` ON `projects`(`projectNickNameTH`);

-- CreateIndex
CREATE UNIQUE INDEX `uuid` ON `usercredentials`(`uuid`);

-- CreateIndex
CREATE INDEX `studentID` ON `userslogout`(`studentID`);

-- AddForeignKey
ALTER TABLE `organizations` ADD CONSTRAINT `FK_organizations_organizations` FOREIGN KEY (`parentOrg`) REFERENCES `organizations`(`orgID`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usercodeverification` ADD CONSTRAINT `usercredentials-usercodeverification-studentID` FOREIGN KEY (`studentID`) REFERENCES `users`(`studentID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usercredentials` ADD CONSTRAINT `FK_usercredentials_users` FOREIGN KEY (`studentID`) REFERENCES `users`(`studentID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userslogout` ADD CONSTRAINT `FK_userslogout_usercredentials` FOREIGN KEY (`studentID`) REFERENCES `usercredentials`(`studentID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cmsoprojectannouncement` ADD CONSTRAINT `FK_cmsoprojectannouncement_projects` FOREIGN KEY (`projectID`) REFERENCES `projects`(`projectID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cmsoprojectannouncement` ADD CONSTRAINT `FK_cmsoprojectannouncement_users` FOREIGN KEY (`studentID`) REFERENCES `users`(`studentID`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `uploadedfiledraft` ADD CONSTRAINT `FK_uploadedfile_draft_users` FOREIGN KEY (`studentID`) REFERENCES `users`(`studentID`) ON DELETE NO ACTION ON UPDATE CASCADE;
