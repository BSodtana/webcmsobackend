/*
  Warnings:

  - Made the column `project_name` on table `projectdata` required. This step will fail if there are existing NULL values in that column.
  - Made the column `place_in_cmu` on table `projectdata` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `projectdata` MODIFY `project_name` VARCHAR(500) NOT NULL,
    MODIFY `place_in_cmu` MEDIUMTEXT NOT NULL;

-- AlterTable
ALTER TABLE `projects` ADD COLUMN `isShown` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `usercredentials` ALTER COLUMN `updatedDateTime` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `userAffiliation` ADD CONSTRAINT `userAffiliation_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `users`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
