/*
  Warnings:

  - You are about to alter the column `orgType` on the `organizations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10)` to `Enum(EnumId(0))`.
  - The primary key for the `projectconsiderationstatus` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `project_id` on the `projectconsiderationstatus` table. All the data in the column will be lost.
  - The primary key for the `projectdata` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `act` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `cmso_mission_type` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `cmso_proj_type` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `cmu_med_grad` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `cmu_med_org` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `cmu_proj_type` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `date_event_end` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `date_event_start` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `date_prepare_end` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `date_prepare_start` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `date_summation_end` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `date_summation_start` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `fund_extracir` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `fund_fac` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `fund_name` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `fund_other` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `fund_sport` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `goal_qualitative` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `indicator_aims` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `indicator_participant` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `indicator_satisfactory` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `other_org` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `output` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `participant_fac_staff` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `participant_outside` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `participant_prof` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `participant_student` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `participant_student_staff` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `place_in_cmu` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `place_outside_cmu` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `plan` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `prof` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `prof_aff` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `stageCheck` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `stageDo` on the `projectdata` table. All the data in the column will be lost.
  - The primary key for the `projectparticipantrecruit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `recruitID` on the `projectparticipantrecruit` table. All the data in the column will be lost.
  - The primary key for the `projectparticipants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `participantPositionID` on the `projectparticipants` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `projectparticipants` table. All the data in the column will be lost.
  - The primary key for the `projects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `projectDescription` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `projectDetail` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `projectEngName` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `projectEngNickName` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `projectName` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `projectNickName` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `projects` table. All the data in the column will be lost.
  - The primary key for the `projectstaffrecruit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `recruitID` on the `projectstaffrecruit` table. All the data in the column will be lost.
  - The primary key for the `projectstaffrecruitposition` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `positionID` on the `projectstaffrecruitposition` table. All the data in the column will be lost.
  - The primary key for the `projectstaffs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `projectstaffs` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `projectstaffs` table. All the data in the column will be lost.
  - The primary key for the `useraffiliation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `student_id` on the `useraffiliation` table. All the data in the column will be lost.
  - The primary key for the `usercodeverification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `student_id` on the `usercodeverification` table. All the data in the column will be lost.
  - The primary key for the `usercredentials` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `password` on the `usercredentials` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `usercredentials` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `current_year` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `first_name_en` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_name_en` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `line_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `medical_condition` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `nick_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `special_need` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `title_en` on the `users` table. All the data in the column will be lost.
  - The primary key for the `userslogout` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `activity_characteristics_choices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project_21st_skill_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project_21st_skill_set` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project_year_allow` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[participantRecruitID]` on the table `projectparticipantrecruit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[participantApplicationID]` on the table `projectparticipants` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectID]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[staffRecruitID]` on the table `projectstaffrecruit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[staffPositionID]` on the table `projectstaffrecruitposition` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[staffApplicationID]` on the table `projectstaffs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentID]` on the table `usercredentials` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[killedTokenAutoID]` on the table `userslogout` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectID` to the `projectdata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participantRecruitID` to the `projectparticipantrecruit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participantApplicationID` to the `projectparticipants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentID` to the `projectparticipants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectID` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staffRecruitID` to the `projectstaffrecruit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staffPositionID` to the `projectstaffrecruitposition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staffApplicationID` to the `projectstaffs` table without a default value. This is not possible if the table is not empty.
  - Made the column `createdDateTime` on table `projectstaffs` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `studentID` to the `usercodeverification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentID` to the `usercredentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uuid` to the `usercredentials` table without a default value. This is not possible if the table is not empty.
  - Made the column `emailVerified` on table `usercredentials` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `killedTokenAutoID` to the `userslogout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `projectconsiderationstatus` DROP FOREIGN KEY `ProjectConsiderationStatus_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `projectdata` DROP FOREIGN KEY `projectData_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `projectparticipantrecruit` DROP FOREIGN KEY `projectParticipantRecruit_projectID_fkey`;

-- DropForeignKey
ALTER TABLE `projectparticipants` DROP FOREIGN KEY `projectParticipants_recruitID_fkey`;

-- DropForeignKey
ALTER TABLE `projectparticipants` DROP FOREIGN KEY `projectParticipants_student_id_fkey`;

-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `projects_orgID_fkey`;

-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `projects_student_id_fkey`;

-- DropForeignKey
ALTER TABLE `projectstaffrecruit` DROP FOREIGN KEY `projectStaffRecruit_projectID_fkey`;

-- DropForeignKey
ALTER TABLE `projectstaffrecruitposition` DROP FOREIGN KEY `projectStaffRecruitPosition_recruitID_fkey`;

-- DropForeignKey
ALTER TABLE `projectstaffs` DROP FOREIGN KEY `projectStaffs_positionID_fkey`;

-- DropForeignKey
ALTER TABLE `projectstaffs` DROP FOREIGN KEY `projectStaffs_student_id_fkey`;

-- DropForeignKey
ALTER TABLE `useraffiliation` DROP FOREIGN KEY `userAffiliation_affiliatedOrg_fkey`;

-- DropForeignKey
ALTER TABLE `useraffiliation` DROP FOREIGN KEY `userAffiliation_student_id_fkey`;

-- DropForeignKey
ALTER TABLE `usercredentials` DROP FOREIGN KEY `userCredentials_student_id_fkey`;

-- DropIndex
DROP INDEX `projects_project_id_key` ON `projects`;

-- DropIndex
DROP INDEX `recruitID` ON `projectstaffs`;

-- DropIndex
DROP INDEX `student_id` ON `users`;

-- DropIndex
DROP INDEX `users_student_id_key` ON `users`;

-- AlterTable
ALTER TABLE `organizations` MODIFY `orgName` TEXT NOT NULL,
    MODIFY `orgType` ENUM('ROOT', 'CLUB', 'DIVISION', 'OTHER') NOT NULL DEFAULT 'DIVISION',
    ALTER COLUMN `parentOrg` DROP DEFAULT;

-- AlterTable
ALTER TABLE `projectconsiderationstatus` DROP PRIMARY KEY,
    DROP COLUMN `project_id`,
    ADD COLUMN `projectID` VARCHAR(50) NOT NULL DEFAULT '',
    ADD PRIMARY KEY (`projectID`);

-- AlterTable
ALTER TABLE `projectdata` DROP PRIMARY KEY,
    DROP COLUMN `act`,
    DROP COLUMN `cmso_mission_type`,
    DROP COLUMN `cmso_proj_type`,
    DROP COLUMN `cmu_med_grad`,
    DROP COLUMN `cmu_med_org`,
    DROP COLUMN `cmu_proj_type`,
    DROP COLUMN `date_event_end`,
    DROP COLUMN `date_event_start`,
    DROP COLUMN `date_prepare_end`,
    DROP COLUMN `date_prepare_start`,
    DROP COLUMN `date_summation_end`,
    DROP COLUMN `date_summation_start`,
    DROP COLUMN `fund_extracir`,
    DROP COLUMN `fund_fac`,
    DROP COLUMN `fund_name`,
    DROP COLUMN `fund_other`,
    DROP COLUMN `fund_sport`,
    DROP COLUMN `goal_qualitative`,
    DROP COLUMN `indicator_aims`,
    DROP COLUMN `indicator_participant`,
    DROP COLUMN `indicator_satisfactory`,
    DROP COLUMN `other_org`,
    DROP COLUMN `output`,
    DROP COLUMN `participant_fac_staff`,
    DROP COLUMN `participant_outside`,
    DROP COLUMN `participant_prof`,
    DROP COLUMN `participant_student`,
    DROP COLUMN `participant_student_staff`,
    DROP COLUMN `place_in_cmu`,
    DROP COLUMN `place_outside_cmu`,
    DROP COLUMN `plan`,
    DROP COLUMN `prof`,
    DROP COLUMN `prof_aff`,
    DROP COLUMN `project_id`,
    DROP COLUMN `stageCheck`,
    DROP COLUMN `stageDo`,
    ADD COLUMN `cmsoMissionType` VARCHAR(10) NULL,
    ADD COLUMN `cmsoProjectType` VARCHAR(10) NULL,
    ADD COLUMN `cmuMedGradType` VARCHAR(10) NULL,
    ADD COLUMN `cmuMedOrgType` VARCHAR(10) NULL,
    ADD COLUMN `cmuProjectType` VARCHAR(10) NULL,
    ADD COLUMN `dateEventEnd` DATE NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `dateEventStart` DATE NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `datePrepareEnd` DATE NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `datePrepareStart` DATE NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `dateSummationEnd` DATE NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `dateSummationStart` DATE NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `goalQualitative` MEDIUMTEXT NULL DEFAULT '',
    ADD COLUMN `indicatorAims` MEDIUMTEXT NULL DEFAULT '',
    ADD COLUMN `indicatorParticipantQuantitative` MEDIUMTEXT NULL DEFAULT '',
    ADD COLUMN `indicatorSatisfactory` MEDIUMTEXT NULL DEFAULT '',
    ADD COLUMN `numberFacultyStaffParticipant` INTEGER NULL DEFAULT 0,
    ADD COLUMN `numberOutsideParticipant` INTEGER NULL DEFAULT 0,
    ADD COLUMN `numberProfessorParticipant` INTEGER NULL DEFAULT 0,
    ADD COLUMN `numberStudentParticipant` INTEGER NULL DEFAULT 0,
    ADD COLUMN `numberStudentStaff` INTEGER NULL DEFAULT 0,
    ADD COLUMN `otherOrgName` MEDIUMTEXT NULL DEFAULT '',
    ADD COLUMN `outcome` MEDIUMTEXT NULL DEFAULT '',
    ADD COLUMN `placeInCMU` MEDIUMTEXT NOT NULL DEFAULT '',
    ADD COLUMN `placeOutsideCMU` MEDIUMTEXT NULL DEFAULT '',
    ADD COLUMN `professorAffiliation` VARCHAR(100) NULL DEFAULT '',
    ADD COLUMN `professorFullName` VARCHAR(100) NULL DEFAULT '',
    ADD COLUMN `projectID` VARCHAR(50) NOT NULL,
    ADD PRIMARY KEY (`projectID`);

-- AlterTable
ALTER TABLE `projectparticipantrecruit` DROP PRIMARY KEY,
    DROP COLUMN `recruitID`,
    ADD COLUMN `participantRecruitID` VARCHAR(50) NOT NULL,
    ADD COLUMN `yearAllowed` VARCHAR(191) NOT NULL DEFAULT '1,2,3,4,5,6',
    MODIFY `projectID` VARCHAR(50) NOT NULL,
    MODIFY `isAllowed` INTEGER NOT NULL DEFAULT 0,
    ADD PRIMARY KEY (`participantRecruitID`);

-- AlterTable
ALTER TABLE `projectparticipants` DROP PRIMARY KEY,
    DROP COLUMN `participantPositionID`,
    DROP COLUMN `student_id`,
    ADD COLUMN `participantApplicationID` VARCHAR(50) NOT NULL,
    ADD COLUMN `studentID` VARCHAR(10) NOT NULL,
    MODIFY `recruitID` VARCHAR(50) NOT NULL,
    ADD PRIMARY KEY (`participantApplicationID`);

-- AlterTable
ALTER TABLE `projects` DROP PRIMARY KEY,
    DROP COLUMN `projectDescription`,
    DROP COLUMN `projectDetail`,
    DROP COLUMN `projectEngName`,
    DROP COLUMN `projectEngNickName`,
    DROP COLUMN `projectName`,
    DROP COLUMN `projectNickName`,
    DROP COLUMN `project_id`,
    DROP COLUMN `student_id`,
    ADD COLUMN `projectFullDetail` MEDIUMTEXT NULL,
    ADD COLUMN `projectID` VARCHAR(50) NOT NULL,
    ADD COLUMN `projectNameEN` TEXT NULL,
    ADD COLUMN `projectNameTH` TEXT NULL,
    ADD COLUMN `projectNickNameEN` VARCHAR(500) NULL,
    ADD COLUMN `projectNickNameTH` VARCHAR(500) NULL,
    ADD COLUMN `projectShortDescriptionTH` TEXT NULL,
    ADD COLUMN `studentID` VARCHAR(10) NULL,
    ADD PRIMARY KEY (`projectID`);

-- AlterTable
ALTER TABLE `projectstaffrecruit` DROP PRIMARY KEY,
    DROP COLUMN `recruitID`,
    ADD COLUMN `staffRecruitID` VARCHAR(50) NOT NULL,
    ADD COLUMN `yearAllowed` VARCHAR(191) NOT NULL DEFAULT '1,2,3,4,5,6',
    MODIFY `projectID` VARCHAR(50) NOT NULL,
    MODIFY `isAllowed` INTEGER NOT NULL DEFAULT 0,
    ADD PRIMARY KEY (`staffRecruitID`);

-- AlterTable
ALTER TABLE `projectstaffrecruitposition` DROP PRIMARY KEY,
    DROP COLUMN `positionID`,
    ADD COLUMN `staffPositionID` VARCHAR(50) NOT NULL,
    MODIFY `recruitID` VARCHAR(50) NULL,
    MODIFY `positionName` VARCHAR(100) NOT NULL DEFAULT 'ตำแหน่งหน้าที่',
    MODIFY `maxNumber` INTEGER NOT NULL DEFAULT 1,
    MODIFY `isAllowed` INTEGER NOT NULL DEFAULT 0,
    ADD PRIMARY KEY (`staffPositionID`);

-- AlterTable
ALTER TABLE `projectstaffs` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `student_id`,
    ADD COLUMN `staffApplicationID` VARCHAR(50) NOT NULL,
    ADD COLUMN `studentID` VARCHAR(10) NOT NULL DEFAULT '',
    MODIFY `recruitID` VARCHAR(50) NOT NULL DEFAULT '',
    MODIFY `createdDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `positionID` VARCHAR(50) NOT NULL,
    ADD PRIMARY KEY (`staffApplicationID`);

-- AlterTable
ALTER TABLE `useraffiliation` DROP PRIMARY KEY,
    DROP COLUMN `student_id`,
    ADD COLUMN `studentID` VARCHAR(10) NOT NULL DEFAULT '',
    MODIFY `affiliationType` ENUM('PRESIDENT', 'VICE_PRESIDENT', 'SECRETARY', 'MEMBER') NOT NULL DEFAULT 'MEMBER',
    MODIFY `affiliationID` INTEGER NOT NULL,
    ADD PRIMARY KEY (`affiliatedOrg`, `affiliationID`);

-- AlterTable
ALTER TABLE `usercodeverification` DROP PRIMARY KEY,
    DROP COLUMN `student_id`,
    ADD COLUMN `studentID` VARCHAR(15) NOT NULL,
    ADD PRIMARY KEY (`studentID`);

-- AlterTable
ALTER TABLE `usercredentials` DROP PRIMARY KEY,
    DROP COLUMN `password`,
    DROP COLUMN `student_id`,
    ADD COLUMN `hashPassword` VARCHAR(500) NULL,
    ADD COLUMN `studentID` VARCHAR(10) NOT NULL,
    ADD COLUMN `uuid` VARCHAR(50) NOT NULL,
    MODIFY `emailVerified` INTEGER NOT NULL DEFAULT 0,
    ADD PRIMARY KEY (`uuid`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `category`,
    DROP COLUMN `current_year`,
    DROP COLUMN `first_name`,
    DROP COLUMN `first_name_en`,
    DROP COLUMN `last_name`,
    DROP COLUMN `last_name_en`,
    DROP COLUMN `line_id`,
    DROP COLUMN `medical_condition`,
    DROP COLUMN `nick_name`,
    DROP COLUMN `phone_number`,
    DROP COLUMN `special_need`,
    DROP COLUMN `student_id`,
    DROP COLUMN `title`,
    DROP COLUMN `title_en`,
    ADD COLUMN `admissionCategory` VARCHAR(5) NULL,
    ADD COLUMN `currentYear` INTEGER NULL,
    ADD COLUMN `firstNameEN` TEXT NULL,
    ADD COLUMN `firstNameTH` TEXT NULL,
    ADD COLUMN `lastNameEN` TEXT NULL,
    ADD COLUMN `lastNameTH` TEXT NULL,
    ADD COLUMN `lineID` VARCHAR(100) NULL,
    ADD COLUMN `medicalCondition` TEXT NULL,
    ADD COLUMN `nickNameTH` TEXT NULL,
    ADD COLUMN `phoneNumber` VARCHAR(11) NULL,
    ADD COLUMN `specialNeed` TEXT NULL,
    ADD COLUMN `studentID` VARCHAR(10) NOT NULL DEFAULT '',
    ADD COLUMN `titleEN` TEXT NULL,
    ADD COLUMN `titleTH` TEXT NULL,
    MODIFY `facebook` VARCHAR(100) NULL,
    MODIFY `instagram` VARCHAR(100) NULL,
    MODIFY `allergy` TEXT NULL,
    ADD PRIMARY KEY (`studentID`);

-- AlterTable
ALTER TABLE `userslogout` DROP PRIMARY KEY,
    ADD COLUMN `killedTokenAutoID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`killedTokenAutoID`);

-- DropTable
DROP TABLE `activity_characteristics_choices`;

-- DropTable
DROP TABLE `project_21st_skill_items`;

-- DropTable
DROP TABLE `project_21st_skill_set`;

-- DropTable
DROP TABLE `project_year_allow`;

-- CreateTable
CREATE TABLE `categorycmsomission` (
    `cmsoMissionType` VARCHAR(10) NOT NULL DEFAULT '5-4-1',
    `cmsoMissionTypeName` TEXT NULL DEFAULT 'เป็นพื้นที่ให้นักศึกษามีอิสระในการจัดโปรเจคตามที่ตนเองต้องการ',

    PRIMARY KEY (`cmsoMissionType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categorycmsoproject` (
    `cmsoProjectType` VARCHAR(10) NOT NULL DEFAULT '5-1-1',
    `cmsoProjectTypeName` TEXT NULL DEFAULT 'ประเภทโครงงานกิจกรรมสัมมนาองค์กร',

    PRIMARY KEY (`cmsoProjectType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categorycmumedgrad` (
    `cmuMedGradType` VARCHAR(10) NOT NULL DEFAULT '5-3-1',
    `cmuMedGradTypeName` TEXT NULL DEFAULT 'มีคุณธรรม จริยธรรม ปฏิบัติตนตามจรรยาบรรณแห่งวิชาชีพ',

    PRIMARY KEY (`cmuMedGradType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categorycmumedorg` (
    `cmuMedOrgType` VARCHAR(10) NOT NULL DEFAULT '5-5-1',
    `cmuMedOrgTypeName` TEXT NULL DEFAULT 'Customer focus มุ่งเน้นผู้รับบริการ',

    PRIMARY KEY (`cmuMedOrgType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categorycmuproject` (
    `cmuProjectType` VARCHAR(10) NOT NULL DEFAULT '5-2-1',
    `cmuProjectTypeName` TEXT NULL DEFAULT 'โครงงานด้านอาหารและสุขภาพ',

    PRIMARY KEY (`cmuProjectType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projectcostexpandedlist` (
    `projectID` VARCHAR(50) NOT NULL DEFAULT '',
    `costType` ENUM('MEDINCOME', 'EXTRACIRR', 'SPORTS', 'OTHER') NOT NULL DEFAULT 'MEDINCOME',
    `costOtherTypeText` TEXT NULL,
    `costDescription` TEXT NULL,
    `costAmount` TEXT NULL,
    `costEach` TEXT NULL,
    `costTotal` TEXT NULL,

    INDEX `projectID`(`projectID`),
    PRIMARY KEY (`projectID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projectdoactlists` (
    `projectID` VARCHAR(50) NOT NULL DEFAULT '',
    `doActDescriptionText` TEXT NULL,
    `doActDateText` TEXT NULL,
    `doActResponsibleFullName` TEXT NULL,

    INDEX `projectID`(`projectID`),
    PRIMARY KEY (`projectID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projectdochecklists` (
    `projectID` VARCHAR(50) NOT NULL DEFAULT '',
    `doCheckDescriptionText` TEXT NULL,
    `doCheckDateText` TEXT NULL,
    `doCheckResponsibleFullName` TEXT NULL,

    INDEX `projectID`(`projectID`),
    PRIMARY KEY (`projectID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projectdodolists` (
    `projectID` VARCHAR(50) NOT NULL DEFAULT '',
    `doDoDescriptionText` TEXT NULL,
    `doDoDateText` TEXT NULL,
    `doDoResponsibleFullName` TEXT NULL,

    INDEX `projectID`(`projectID`),
    PRIMARY KEY (`projectID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projectdoplanlists` (
    `projectID` VARCHAR(50) NOT NULL DEFAULT '',
    `doPlanDescriptionText` TEXT NULL,
    `doPlanDateText` TEXT NULL,
    `doPlanResponsibleFullName` TEXT NULL,

    INDEX `projectID`(`projectID`),
    PRIMARY KEY (`projectID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `parentOrg` ON `organizations`(`parentOrg`);

-- CreateIndex
CREATE INDEX `projectID` ON `projectconsiderationstatus`(`projectID`);

-- CreateIndex
CREATE INDEX `cmsoMissionType` ON `projectdata`(`cmsoMissionType`);

-- CreateIndex
CREATE INDEX `cmsoProjectType` ON `projectdata`(`cmsoProjectType`);

-- CreateIndex
CREATE INDEX `cmuMedGradType` ON `projectdata`(`cmuMedGradType`);

-- CreateIndex
CREATE INDEX `cmuMedOrgType` ON `projectdata`(`cmuMedOrgType`);

-- CreateIndex
CREATE INDEX `cmuProjectType` ON `projectdata`(`cmuProjectType`);

-- CreateIndex
CREATE INDEX `projectID` ON `projectdata`(`projectID`);

-- CreateIndex
CREATE UNIQUE INDEX `participantRecruitID` ON `projectparticipantrecruit`(`participantRecruitID`);

-- CreateIndex
CREATE UNIQUE INDEX `participantApplicationID` ON `projectparticipants`(`participantApplicationID`);

-- CreateIndex
CREATE INDEX `studentID` ON `projectparticipants`(`studentID`);

-- CreateIndex
CREATE UNIQUE INDEX `projects_project_id_key` ON `projects`(`projectID`);

-- CreateIndex
CREATE INDEX `student_id` ON `projects`(`studentID`);

-- CreateIndex
CREATE UNIQUE INDEX `staffRecruitID` ON `projectstaffrecruit`(`staffRecruitID`);

-- CreateIndex
CREATE UNIQUE INDEX `staffPositionID` ON `projectstaffrecruitposition`(`staffPositionID`);

-- CreateIndex
CREATE UNIQUE INDEX `staffApplicationID` ON `projectstaffs`(`staffApplicationID`);

-- CreateIndex
CREATE INDEX `recruit-positionID` ON `projectstaffs`(`recruitID`, `positionID`);

-- CreateIndex
CREATE INDEX `studentID` ON `projectstaffs`(`studentID`);

-- CreateIndex
CREATE INDEX `studentID` ON `useraffiliation`(`studentID`);

-- CreateIndex
CREATE INDEX `studentID` ON `usercodeverification`(`studentID`);

-- CreateIndex
CREATE UNIQUE INDEX `studentID` ON `usercredentials`(`studentID`);

-- CreateIndex
CREATE INDEX `studentID` ON `users`(`studentID`);

-- CreateIndex
CREATE UNIQUE INDEX `killedTokenAutoID` ON `userslogout`(`killedTokenAutoID`);

-- CreateIndex
CREATE INDEX `uuid` ON `userslogout`(`uuid`);

-- AddForeignKey
ALTER TABLE `organizations` ADD CONSTRAINT `FK_organizations_organizations` FOREIGN KEY (`parentOrg`) REFERENCES `organizations`(`orgID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projectconsiderationstatus` ADD CONSTRAINT `FK_projectconsiderationstatus_projects` FOREIGN KEY (`projectID`) REFERENCES `projects`(`projectID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectcostexpandedlist` ADD CONSTRAINT `FK_projectcostexpandedlist_projectdata` FOREIGN KEY (`projectID`) REFERENCES `projectdata`(`projectID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projectdata` ADD CONSTRAINT `FK_projectdata_categorycmsomission` FOREIGN KEY (`cmsoMissionType`) REFERENCES `categorycmsomission`(`cmsoMissionType`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectdata` ADD CONSTRAINT `FK_projectdata_categorycmsoproject` FOREIGN KEY (`cmsoProjectType`) REFERENCES `categorycmsoproject`(`cmsoProjectType`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectdata` ADD CONSTRAINT `FK_projectdata_categorycmumedgrad` FOREIGN KEY (`cmuMedGradType`) REFERENCES `categorycmumedgrad`(`cmuMedGradType`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectdata` ADD CONSTRAINT `FK_projectdata_categorycmumedorg` FOREIGN KEY (`cmuMedOrgType`) REFERENCES `categorycmumedorg`(`cmuMedOrgType`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectdata` ADD CONSTRAINT `FK_projectdata_categorycmuproject` FOREIGN KEY (`cmuProjectType`) REFERENCES `categorycmuproject`(`cmuProjectType`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectdata` ADD CONSTRAINT `FK_projectdata_projects` FOREIGN KEY (`projectID`) REFERENCES `projects`(`projectID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectdoactlists` ADD CONSTRAINT `FK_projectdoactlists_projectdata` FOREIGN KEY (`projectID`) REFERENCES `projectdata`(`projectID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectdochecklists` ADD CONSTRAINT `FK_projectdochecklists_projectdata` FOREIGN KEY (`projectID`) REFERENCES `projectdata`(`projectID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectdodolists` ADD CONSTRAINT `FK_projectdodolists_projectdata` FOREIGN KEY (`projectID`) REFERENCES `projectdata`(`projectID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectdoplanlists` ADD CONSTRAINT `FK_projectplanlists_projectdata` FOREIGN KEY (`projectID`) REFERENCES `projectdata`(`projectID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectparticipantrecruit` ADD CONSTRAINT `projects-participantrtecruit-projectID` FOREIGN KEY (`projectID`) REFERENCES `projects`(`projectID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectparticipants` ADD CONSTRAINT `participantRecruit-participants-recruitID` FOREIGN KEY (`recruitID`) REFERENCES `projectparticipantrecruit`(`participantRecruitID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectparticipants` ADD CONSTRAINT `users-projectparticipants-studentID` FOREIGN KEY (`studentID`) REFERENCES `users`(`studentID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `organizations-projects-orgID` FOREIGN KEY (`orgID`) REFERENCES `organizations`(`orgID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `users-projects-studentID` FOREIGN KEY (`studentID`) REFERENCES `users`(`studentID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectstaffrecruit` ADD CONSTRAINT `projects-staffrecruit-projectID` FOREIGN KEY (`projectID`) REFERENCES `projects`(`projectID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectstaffrecruitposition` ADD CONSTRAINT `projecttaffrecruit-staffposition-recruitID` FOREIGN KEY (`recruitID`) REFERENCES `projectstaffrecruit`(`staffRecruitID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectstaffs` ADD CONSTRAINT `projectstaffrecruit-staff-recruitID` FOREIGN KEY (`recruitID`) REFERENCES `projectstaffrecruit`(`staffRecruitID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projectstaffs` ADD CONSTRAINT `projectstaffrecruitposition-staff-positionID` FOREIGN KEY (`positionID`) REFERENCES `projectstaffrecruitposition`(`staffPositionID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projectstaffs` ADD CONSTRAINT `users-staff-studentID` FOREIGN KEY (`studentID`) REFERENCES `users`(`studentID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `useraffiliation` ADD CONSTRAINT `organizations-useraffiliation-affiliatedOrg` FOREIGN KEY (`affiliatedOrg`) REFERENCES `organizations`(`orgID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `useraffiliation` ADD CONSTRAINT `users-userafiliation-studentID` FOREIGN KEY (`studentID`) REFERENCES `users`(`studentID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usercodeverification` ADD CONSTRAINT `usercredentials-usercodeverification-studentID` FOREIGN KEY (`studentID`) REFERENCES `usercredentials`(`studentID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usercredentials` ADD CONSTRAINT `FK_usercredentials_users` FOREIGN KEY (`studentID`) REFERENCES `users`(`studentID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userslogout` ADD CONSTRAINT `usercredentials-userlogout-uuid` FOREIGN KEY (`uuid`) REFERENCES `usercredentials`(`uuid`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- RedefineIndex
CREATE INDEX `projectstaffrecruitposition-staff-positionID` ON `projectstaffs`(`positionID`);
-- DROP INDEX `projectStaffs_positionID_fkey` ON `projectstaffs`;
