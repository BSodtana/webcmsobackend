-- AlterTable
ALTER TABLE `projects` ADD COLUMN `projectEngName` VARCHAR(500) NULL,
    ADD COLUMN `projectEngNickName` VARCHAR(500) NULL,
    ADD COLUMN `projectNickName` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `usercredentials` ALTER COLUMN `updatedDateTime` DROP DEFAULT;
