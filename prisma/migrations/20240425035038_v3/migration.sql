-- AlterTable
ALTER TABLE `usercredentials` ALTER COLUMN `updatedDateTime` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `userAffiliation` ADD CONSTRAINT `userAffiliation_affiliatedOrg_fkey` FOREIGN KEY (`affiliatedOrg`) REFERENCES `organizations`(`orgID`) ON DELETE RESTRICT ON UPDATE CASCADE;
