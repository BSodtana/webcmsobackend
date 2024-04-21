/*
  Warnings:

  - Added the required column `title_en` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `usercredentials` ALTER COLUMN `updatedDateTime` DROP DEFAULT;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `title_en` VARCHAR(10) NOT NULL,
    MODIFY `title` VARCHAR(10) NOT NULL;
