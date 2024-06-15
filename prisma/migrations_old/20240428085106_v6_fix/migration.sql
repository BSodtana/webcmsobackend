-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `projects_project_id_fkey`;

-- AlterTable
ALTER TABLE `usercredentials` ALTER COLUMN `updatedDateTime` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `ProjectConsiderationStatus` ADD CONSTRAINT `ProjectConsiderationStatus_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
