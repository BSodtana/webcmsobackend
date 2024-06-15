-- AlterTable
ALTER TABLE `projectparticipants` MODIFY `createdDateTime` DATETIME(3) NULL DEFAULT (current_timestamp());

-- AlterTable
ALTER TABLE `usercredentials` ALTER COLUMN `updatedDateTime` DROP DEFAULT;
