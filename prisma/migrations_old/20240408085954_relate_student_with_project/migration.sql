/*
  Warnings:

  - You are about to drop the `project_participants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project_recruit_participant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project_recruit_staff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project_staff_positions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project_staffs` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[project_id]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - Made the column `student_id` on table `projects` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `projects` MODIFY `student_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `project_participants`;

-- DropTable
DROP TABLE `project_recruit_participant`;

-- DropTable
DROP TABLE `project_recruit_staff`;

-- DropTable
DROP TABLE `project_staff_positions`;

-- DropTable
DROP TABLE `project_staffs`;

-- CreateTable
CREATE TABLE `projectParticipants` (
    `participantPositionID` VARCHAR(36) NOT NULL,
    `recruitID` VARCHAR(15) NOT NULL DEFAULT '',
    `student_id` INTEGER NOT NULL DEFAULT 0,
    `createdDateTime` DATETIME(3) NULL,

    INDEX `recruitID`(`recruitID`),
    INDEX `student_id`(`student_id`),
    PRIMARY KEY (`participantPositionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projectParticipantRecruit` (
    `recruitID` VARCHAR(15) NOT NULL DEFAULT (current_timestamp()),
    `projectID` VARCHAR(15) NOT NULL,
    `registerFrom` DATETIME(0) NOT NULL,
    `registerUntil` DATETIME(0) NOT NULL,
    `maxNumber` INTEGER NOT NULL DEFAULT 0,
    `createdDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isAllowed` BOOLEAN NOT NULL DEFAULT false,

    INDEX `projectID`(`projectID`),
    PRIMARY KEY (`recruitID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projectStaffRecruit` (
    `recruitID` VARCHAR(15) NOT NULL DEFAULT (current_timestamp()),
    `projectID` VARCHAR(15) NOT NULL,
    `registerFrom` DATETIME(0) NOT NULL,
    `registerUntil` DATETIME(0) NOT NULL,
    `createdDateTime` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedDateTime` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `isAllowed` BOOLEAN NOT NULL DEFAULT false,

    INDEX `projectID`(`projectID`),
    PRIMARY KEY (`recruitID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projectStaffRecruitPosition` (
    `positionID` VARCHAR(15) NOT NULL DEFAULT (current_timestamp()),
    `recruitID` VARCHAR(15) NOT NULL,
    `positionName` VARCHAR(15) NOT NULL,
    `maxNumber` INTEGER NOT NULL DEFAULT 0,
    `registerFrom` DATETIME(0) NOT NULL,
    `registerUntil` DATETIME(0) NOT NULL,
    `createdDateTime` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedDateTime` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `isAllowed` BOOLEAN NOT NULL DEFAULT false,

    INDEX `recruitID`(`recruitID`),
    PRIMARY KEY (`positionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projectStaffs` (
    `staffPositionID` VARCHAR(36) NOT NULL,
    `recruitID` VARCHAR(15) NOT NULL DEFAULT '',
    `student_id` INTEGER NOT NULL DEFAULT 0,
    `createdDateTime` DATETIME(3) NULL,

    INDEX `recruitID`(`recruitID`),
    INDEX `student_id`(`student_id`),
    PRIMARY KEY (`staffPositionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `projects_project_id_key` ON `projects`(`project_id`);

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `users`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
