-- AlterTable
ALTER TABLE `projects` ADD COLUMN `academicYear` INTEGER NOT NULL DEFAULT 202301;

-- AlterTable
ALTER TABLE `usercredentials` ALTER COLUMN `updatedDateTime` DROP DEFAULT;
