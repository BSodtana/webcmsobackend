/*
  Warnings:

  - The primary key for the `projectstaffs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `staffPositionID` on the `projectstaffs` table. All the data in the column will be lost.
  - The required column `id` was added to the `projectStaffs` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `positionID` to the `projectStaffs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `projectparticipants` MODIFY `createdDateTime` DATETIME(3) NULL DEFAULT (current_timestamp());

-- AlterTable
ALTER TABLE `projectstaffs` DROP PRIMARY KEY,
    DROP COLUMN `staffPositionID`,
    ADD COLUMN `id` VARCHAR(36) NOT NULL,
    ADD COLUMN `positionID` VARCHAR(36) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `usercredentials` ALTER COLUMN `updatedDateTime` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `projectParticipants` ADD CONSTRAINT `projectParticipants_recruitID_fkey` FOREIGN KEY (`recruitID`) REFERENCES `projectParticipantRecruit`(`recruitID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectParticipants` ADD CONSTRAINT `projectParticipants_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `users`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectStaffs` ADD CONSTRAINT `projectStaffs_positionID_fkey` FOREIGN KEY (`positionID`) REFERENCES `projectStaffRecruitPosition`(`positionID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectStaffs` ADD CONSTRAINT `projectStaffs_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `users`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
