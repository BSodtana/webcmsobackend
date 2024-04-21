/*
  Warnings:

  - You are about to drop the `projects_data` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_affiliation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_code_verification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_credential` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_infection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_logout` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `projects_data` DROP FOREIGN KEY `projects_data_project_id_fkey`;

-- DropTable
DROP TABLE `projects_data`;

-- DropTable
DROP TABLE `user_affiliation`;

-- DropTable
DROP TABLE `users_code_verification`;

-- DropTable
DROP TABLE `users_credential`;

-- DropTable
DROP TABLE `users_infection`;

-- DropTable
DROP TABLE `users_logout`;

-- CreateTable
CREATE TABLE `projectData` (
    `project_id` VARCHAR(50) NOT NULL,
    `project_name` VARCHAR(500) NULL,
    `place_in_cmu` MEDIUMTEXT NULL,
    `place_outside_cmu` MEDIUMTEXT NULL,
    `date_prepare_start` DATE NULL,
    `date_prepare_end` DATE NULL,
    `date_event_start` DATE NULL,
    `date_event_end` DATE NULL,
    `date_summation_start` DATE NULL,
    `date_summation_end` DATE NULL,
    `owner_org` VARCHAR(9) NOT NULL,
    `owner_student` INTEGER NOT NULL,
    `prof` VARCHAR(100) NULL,
    `prof_aff` VARCHAR(100) NULL,
    `other_org` MEDIUMTEXT NULL,
    `cmso_proj_type` VARCHAR(10) NULL,
    `cmu_proj_type` VARCHAR(10) NULL,
    `cmu_med_grad` VARCHAR(10) NULL,
    `cmso_mission_type` VARCHAR(10) NULL,
    `cmu_med_org` VARCHAR(10) NULL,
    `background` VARCHAR(3000) NULL,
    `aims` MEDIUMTEXT NULL,
    `participant_student` INTEGER NULL,
    `participant_prof` INTEGER NULL,
    `participant_student_staff` INTEGER NULL,
    `participant_fac_staff` INTEGER NULL,
    `participant_outside` INTEGER NULL,
    `goal_qualitative` MEDIUMTEXT NULL,
    `indicator_participant` MEDIUMTEXT NULL,
    `indicator_satisfactory` MEDIUMTEXT NULL,
    `indicator_aims` MEDIUMTEXT NULL,
    `output` MEDIUMTEXT NULL,
    `plan` MEDIUMTEXT NULL,
    `stageDo` MEDIUMTEXT NULL,
    `stageCheck` MEDIUMTEXT NULL,
    `act` MEDIUMTEXT NULL,
    `fund_fac` MEDIUMTEXT NULL,
    `fund_extracir` MEDIUMTEXT NULL,
    `fund_sport` MEDIUMTEXT NULL,
    `fund_other` MEDIUMTEXT NULL,
    `fund_name` VARCHAR(200) NULL,
    `createdDateTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`project_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userAffiliation` (
    `student_id` INTEGER NOT NULL,
    `affiliatedOrg` VARCHAR(50) NOT NULL,
    `affiliationType` VARCHAR(50) NULL,
    `createdDateTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `affiliationID` INTEGER NOT NULL AUTO_INCREMENT,

    INDEX `affiliatedOrg`(`affiliatedOrg`),
    INDEX `student_id`(`student_id`),
    PRIMARY KEY (`affiliationID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userCodeVerification` (
    `student_id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(10) NULL,
    `createdDateTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `referenceID` VARCHAR(10) NULL,

    PRIMARY KEY (`student_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userCredentials` (
    `student_id` INTEGER NOT NULL,
    `email` VARCHAR(100) NULL,
    `password` VARCHAR(500) NULL,
    `createdDateTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedDateTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `role` ENUM('ADMIN', 'PRES', 'VP', 'STAFF', 'USER') NOT NULL DEFAULT 'USER',
    `emailVerified` INTEGER NULL DEFAULT 0,

    UNIQUE INDEX `userCredentials_student_id_key`(`student_id`),
    PRIMARY KEY (`student_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userInfections` (
    `owner_uuid` VARCHAR(36) NOT NULL,
    `dose` INTEGER NOT NULL,
    `date` DATE NULL,
    `createdDateTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`owner_uuid`, `dose`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usersLogout` (
    `uuid` VARCHAR(191) NOT NULL,
    `token` VARCHAR(500) NULL,
    `killedDateTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `projectData` ADD CONSTRAINT `projectData_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectData` ADD CONSTRAINT `projectData_owner_org_fkey` FOREIGN KEY (`owner_org`) REFERENCES `organizations`(`orgID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userCredentials` ADD CONSTRAINT `userCredentials_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `users`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
