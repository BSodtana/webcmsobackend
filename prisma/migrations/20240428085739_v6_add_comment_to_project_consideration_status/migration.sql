-- AlterTable
ALTER TABLE `projectconsiderationstatus` ADD COLUMN `comment` MEDIUMTEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `usercredentials` ALTER COLUMN `updatedDateTime` DROP DEFAULT;
