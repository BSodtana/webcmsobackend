/*
  Warnings:

  - You are about to drop the column `owner_org` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `owner_student` on the `projectdata` table. All the data in the column will be lost.
  - You are about to drop the column `project_name` on the `projectdata` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `projectdata` DROP FOREIGN KEY `projectData_owner_org_fkey`;

-- AlterTable
ALTER TABLE `projectdata` DROP COLUMN `owner_org`,
    DROP COLUMN `owner_student`,
    DROP COLUMN `project_name`,
    MODIFY `place_in_cmu` MEDIUMTEXT NOT NULL DEFAULT '',
    MODIFY `place_outside_cmu` MEDIUMTEXT NULL DEFAULT '',
    MODIFY `date_prepare_start` DATE NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `date_prepare_end` DATE NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `date_event_start` DATE NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `date_event_end` DATE NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `date_summation_start` DATE NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `date_summation_end` DATE NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `prof` VARCHAR(100) NULL DEFAULT '',
    MODIFY `prof_aff` VARCHAR(100) NULL DEFAULT '',
    MODIFY `other_org` MEDIUMTEXT NULL DEFAULT '',
    MODIFY `cmso_proj_type` VARCHAR(10) NULL DEFAULT '',
    MODIFY `cmu_proj_type` VARCHAR(10) NULL DEFAULT '',
    MODIFY `cmu_med_grad` VARCHAR(10) NULL DEFAULT '',
    MODIFY `cmso_mission_type` VARCHAR(10) NULL DEFAULT '',
    MODIFY `cmu_med_org` VARCHAR(10) NULL DEFAULT '',
    MODIFY `background` VARCHAR(3000) NULL DEFAULT '',
    MODIFY `aims` MEDIUMTEXT NULL DEFAULT '',
    MODIFY `participant_student` INTEGER NULL DEFAULT 0,
    MODIFY `participant_prof` INTEGER NULL DEFAULT 0,
    MODIFY `participant_student_staff` INTEGER NULL DEFAULT 0,
    MODIFY `participant_fac_staff` INTEGER NULL DEFAULT 0,
    MODIFY `participant_outside` INTEGER NULL DEFAULT 0,
    MODIFY `goal_qualitative` MEDIUMTEXT NULL DEFAULT '',
    MODIFY `indicator_participant` MEDIUMTEXT NULL DEFAULT '',
    MODIFY `indicator_satisfactory` MEDIUMTEXT NULL DEFAULT '',
    MODIFY `indicator_aims` MEDIUMTEXT NULL DEFAULT '',
    MODIFY `output` MEDIUMTEXT NULL DEFAULT '',
    MODIFY `plan` MEDIUMTEXT NULL DEFAULT '',
    MODIFY `stageDo` MEDIUMTEXT NULL DEFAULT '',
    MODIFY `stageCheck` MEDIUMTEXT NULL DEFAULT '',
    MODIFY `act` MEDIUMTEXT NULL DEFAULT '',
    MODIFY `fund_fac` MEDIUMTEXT NULL DEFAULT '',
    MODIFY `fund_extracir` MEDIUMTEXT NULL DEFAULT '',
    MODIFY `fund_sport` MEDIUMTEXT NULL DEFAULT '',
    MODIFY `fund_other` MEDIUMTEXT NULL DEFAULT '',
    MODIFY `fund_name` VARCHAR(200) NULL DEFAULT '';

-- AlterTable
ALTER TABLE `projects` MODIFY `academicYear` INTEGER NOT NULL DEFAULT 202401;

-- AlterTable
ALTER TABLE `usercredentials` ALTER COLUMN `updatedDateTime` DROP DEFAULT;
