/*
  Warnings:

  - You are about to drop the `userinfections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_vaccine` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `usercredentials` ALTER COLUMN `updatedDateTime` DROP DEFAULT;

-- DropTable
DROP TABLE `userinfections`;

-- DropTable
DROP TABLE `users_vaccine`;

-- CreateTable
CREATE TABLE `ProjectConsiderationStatus` (
    `project_id` VARCHAR(191) NOT NULL,
    `statusVP` ENUM('QUEUE', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'QUEUE',
    `statusFinance` ENUM('QUEUE', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'QUEUE',
    `statusSec` ENUM('QUEUE', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'QUEUE',
    `statusPresent` ENUM('QUEUE', 'REJECTED', 'PASS_IN_PRINCIPLE', 'PASS') NOT NULL DEFAULT 'QUEUE',
    `updatedDTM` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `projectConsiderationType` ENUM('EARLY_BIRD', 'NORMAL') NOT NULL DEFAULT 'NORMAL',
    `dateApprovalDoc` DATETIME(3) NULL,
    `dateOtherDoc` DATETIME(3) NULL,
    `dateActionPlan` DATETIME(3) NULL,
    `dateReceipt` DATETIME(3) NULL,
    `dateFinalize` DATETIME(3) NULL,
    `projectType` ENUM('OLD', 'NEW') NOT NULL DEFAULT 'OLD',

    UNIQUE INDEX `ProjectConsiderationStatus_project_id_key`(`project_id`),
    PRIMARY KEY (`project_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `ProjectConsiderationStatus`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
