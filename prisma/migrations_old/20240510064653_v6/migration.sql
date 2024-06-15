-- AlterTable
ALTER TABLE `usercredentials` ALTER COLUMN `updatedDateTime` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `projectStaffRecruit` ADD CONSTRAINT `projectStaffRecruit_projectID_fkey` FOREIGN KEY (`projectID`) REFERENCES `projects`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectStaffRecruitPosition` ADD CONSTRAINT `projectStaffRecruitPosition_recruitID_fkey` FOREIGN KEY (`recruitID`) REFERENCES `projectStaffRecruit`(`recruitID`) ON DELETE RESTRICT ON UPDATE CASCADE;
