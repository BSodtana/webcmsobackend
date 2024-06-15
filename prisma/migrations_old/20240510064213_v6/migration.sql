-- AlterTable
ALTER TABLE `usercredentials` ALTER COLUMN `updatedDateTime` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `projectParticipantRecruit` ADD CONSTRAINT `projectParticipantRecruit_projectID_fkey` FOREIGN KEY (`projectID`) REFERENCES `projects`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
