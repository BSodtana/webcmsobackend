-- CreateTable
CREATE TABLE `categorycmsomission` (
    `cmsoMissionType` VARCHAR(10) NOT NULL DEFAULT '5-4-1',
    `cmsoMissionTypeName` TEXT NULL DEFAULT 'เป็นพื้นที่ให้นักศึกษามีอิสระในการจัดโปรเจคตามที่ตนเองต้องการ',

    PRIMARY KEY (`cmsoMissionType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categorycmsoproject` (
    `cmsoProjectType` VARCHAR(10) NOT NULL DEFAULT '5-1-1',
    `cmsoProjectTypeName` TEXT NULL DEFAULT 'ประเภทโครงงานกิจกรรมสัมมนาองค์กร',

    PRIMARY KEY (`cmsoProjectType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categorycmumedgrad` (
    `cmuMedGradType` VARCHAR(10) NOT NULL DEFAULT '5-3-1',
    `cmuMedGradTypeName` TEXT NULL DEFAULT 'มีคุณธรรม จริยธรรม ปฏิบัติตนตามจรรยาบรรณแห่งวิชาชีพ',

    PRIMARY KEY (`cmuMedGradType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categorycmumedorg` (
    `cmuMedOrgType` VARCHAR(10) NOT NULL DEFAULT '5-5-1',
    `cmuMedOrgTypeName` TEXT NULL DEFAULT 'Customer focus มุ่งเน้นผู้รับบริการ',

    PRIMARY KEY (`cmuMedOrgType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categorycmuproject` (
    `cmuProjectType` VARCHAR(10) NOT NULL DEFAULT '5-2-1',
    `cmuProjectTypeName` TEXT NULL DEFAULT 'โครงงานด้านอาหารและสุขภาพ',

    PRIMARY KEY (`cmuProjectType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organizations` (
    `orgID` VARCHAR(15) NOT NULL,
    `orgName` TEXT NOT NULL,
    `orgDesc` TEXT NULL,
    `orgImageID` VARCHAR(50) NULL,
    `orgType` ENUM('ROOT', 'CLUB', 'DIVISION', 'OTHER') NOT NULL DEFAULT 'DIVISION',
    `parentOrg` VARCHAR(15) NULL,

    INDEX `parentOrg`(`parentOrg`),
    PRIMARY KEY (`orgID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projectconsiderationstatus` (
    `projectID` VARCHAR(50) NOT NULL DEFAULT '',
    `statusVP` ENUM('QUEUE', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'QUEUE',
    `statusFinance` ENUM('QUEUE', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'QUEUE',
    `statusSec` ENUM('QUEUE', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'QUEUE',
    `statusPresent` ENUM('QUEUE', 'REJECTED', 'PASS_IN_PRINCIPLE', 'PASS') NOT NULL DEFAULT 'QUEUE',
    `updatedDTM` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `projectConsiderationType` ENUM('EARLY_BIRD', 'NORMAL') NOT NULL DEFAULT 'NORMAL',
    `dateApprovalDoc` DATETIME(3) NULL,
    `dateOtherDoc` DATETIME(3) NULL,
    `dateActionPlan` DATETIME(3) NULL,
    `dateReceipt` DATETIME(3) NULL,
    `dateFinalize` DATETIME(3) NULL,
    `projectType` ENUM('OLD', 'NEW') NOT NULL DEFAULT 'OLD',
    `comment` MEDIUMTEXT NOT NULL DEFAULT '',

    INDEX `projectID`(`projectID`),
    PRIMARY KEY (`projectID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projectcostexpandedlist` (
    `projectID` VARCHAR(50) NOT NULL DEFAULT '',
    `costType` ENUM('MEDINCOME', 'EXTRACIRR', 'SPORTS', 'OTHER') NOT NULL DEFAULT 'MEDINCOME',
    `costOtherTypeText` TEXT NULL,
    `costDescription` TEXT NULL,
    `costAmount` TEXT NULL,
    `costEach` TEXT NULL,
    `costTotal` TEXT NULL,

    INDEX `projectID`(`projectID`),
    PRIMARY KEY (`projectID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projectdata` (
    `projectID` VARCHAR(50) NOT NULL,
    `placeInCMU` MEDIUMTEXT NOT NULL DEFAULT '',
    `placeOutsideCMU` MEDIUMTEXT NULL DEFAULT '',
    `datePrepareStart` DATE NULL DEFAULT CURRENT_TIMESTAMP(3),
    `datePrepareEnd` DATE NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateEventStart` DATE NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateEventEnd` DATE NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateSummationStart` DATE NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateSummationEnd` DATE NULL DEFAULT CURRENT_TIMESTAMP(3),
    `professorFullName` VARCHAR(150) NULL DEFAULT '',
    `professorAffiliation` VARCHAR(150) NULL DEFAULT '',
    `otherOrgName` MEDIUMTEXT NULL DEFAULT '',
    `cmsoProjectType` VARCHAR(10) NULL,
    `cmuProjectType` VARCHAR(10) NULL,
    `cmuMedGradType` VARCHAR(10) NULL,
    `cmsoMissionType` VARCHAR(10) NULL,
    `cmuMedOrgType` VARCHAR(10) NULL,
    `background` VARCHAR(3000) NULL DEFAULT '',
    `aims` MEDIUMTEXT NULL DEFAULT '',
    `numberStudentParticipant` INTEGER NULL DEFAULT 0,
    `numberFacultyStaffParticipant` INTEGER NULL DEFAULT 0,
    `numberProfessorParticipant` INTEGER NULL DEFAULT 0,
    `numberOutsideParticipant` INTEGER NULL DEFAULT 0,
    `numberStudentStaff` INTEGER NULL DEFAULT 0,
    `goalQualitative` MEDIUMTEXT NULL DEFAULT '',
    `indicatorParticipantQuantitative` MEDIUMTEXT NULL DEFAULT '',
    `indicatorSatisfactory` MEDIUMTEXT NULL DEFAULT '',
    `indicatorAims` MEDIUMTEXT NULL DEFAULT '',
    `outcome` MEDIUMTEXT NULL DEFAULT '',
    `updatedDateTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `cmsoMissionType`(`cmsoMissionType`),
    INDEX `cmsoProjectType`(`cmsoProjectType`),
    INDEX `cmuMedGradType`(`cmuMedGradType`),
    INDEX `cmuMedOrgType`(`cmuMedOrgType`),
    INDEX `cmuProjectType`(`cmuProjectType`),
    INDEX `projectID`(`projectID`),
    PRIMARY KEY (`projectID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projectdoactlists` (
    `projectID` VARCHAR(50) NOT NULL DEFAULT '',
    `doActDescriptionText` TEXT NULL,
    `doActDateText` TEXT NULL,
    `doActResponsibleFullName` TEXT NULL,

    INDEX `projectID`(`projectID`),
    PRIMARY KEY (`projectID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projectdochecklists` (
    `projectID` VARCHAR(50) NOT NULL DEFAULT '',
    `doCheckDescriptionText` TEXT NULL,
    `doCheckDateText` TEXT NULL,
    `doCheckResponsibleFullName` TEXT NULL,

    INDEX `projectID`(`projectID`),
    PRIMARY KEY (`projectID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projectdodolists` (
    `projectID` VARCHAR(50) NOT NULL DEFAULT '',
    `doDoDescriptionText` TEXT NULL,
    `doDoDateText` TEXT NULL,
    `doDoResponsibleFullName` TEXT NULL,

    INDEX `projectID`(`projectID`),
    PRIMARY KEY (`projectID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projectdoplanlists` (
    `projectID` VARCHAR(50) NOT NULL DEFAULT '',
    `doPlanDescriptionText` TEXT NULL,
    `doPlanDateText` TEXT NULL,
    `doPlanResponsibleFullName` TEXT NULL,

    INDEX `projectID`(`projectID`),
    PRIMARY KEY (`projectID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projectparticipantrecruit` (
    `participantRecruitID` VARCHAR(50) NOT NULL,
    `projectID` VARCHAR(50) NOT NULL,
    `recruitName` VARCHAR(250) NULL DEFAULT 'New Recruitment',
    `recruitDescription` TEXT NULL,
    `registerFrom` DATETIME(0) NOT NULL,
    `registerUntil` DATETIME(0) NOT NULL,
    `maxNumber` INTEGER NOT NULL DEFAULT 1,
    `createdDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isAllowed` INTEGER NOT NULL DEFAULT 0,
    `yearAllowed` VARCHAR(191) NOT NULL DEFAULT '0,1,2,3,4,5,6,99',
    `password` VARCHAR(50) NULL,

    UNIQUE INDEX `participantRecruitID`(`participantRecruitID`),
    INDEX `projectID`(`projectID`),
    PRIMARY KEY (`participantRecruitID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projectparticipants` (
    `participantApplicationID` VARCHAR(50) NOT NULL,
    `recruitID` VARCHAR(50) NOT NULL,
    `studentID` VARCHAR(10) NOT NULL,
    `createdDateTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `participantApplicationID`(`participantApplicationID`),
    INDEX `recruitID`(`recruitID`),
    INDEX `studentID`(`studentID`),
    PRIMARY KEY (`participantApplicationID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projects` (
    `projectID` VARCHAR(50) NOT NULL,
    `studentID` VARCHAR(10) NULL,
    `orgID` VARCHAR(50) NOT NULL,
    `projectNameTH` TEXT NULL,
    `projectNickNameTH` VARCHAR(500) NULL,
    `projectShortDescriptionTH` TEXT NULL,
    `projectNameEN` TEXT NULL,
    `projectNickNameEN` VARCHAR(500) NULL,
    `projectFullDetail` MEDIUMTEXT NULL,
    `eventDateStart` DATETIME(3) NULL,
    `eventDateFinish` DATETIME(3) NULL,
    `createdDateTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedDateTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isShown` INTEGER NOT NULL DEFAULT 0,
    `academicYear` VARCHAR(50) NOT NULL DEFAULT '202401',

    UNIQUE INDEX `projects_project_id_key`(`projectID`),
    INDEX `orgID`(`orgID`),
    INDEX `student_id`(`studentID`),
    FULLTEXT INDEX `projectNameTH`(`projectNameTH`),
    FULLTEXT INDEX `projectNameEN`(`projectNameEN`),
    FULLTEXT INDEX `projectNickNameEN`(`projectNickNameEN`),
    FULLTEXT INDEX `projectNickNameTH`(`projectNickNameTH`),
    PRIMARY KEY (`projectID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projectstaffrecruit` (
    `staffRecruitID` VARCHAR(50) NOT NULL,
    `projectID` VARCHAR(50) NOT NULL,
    `recruitName` VARCHAR(250) NULL DEFAULT 'New Recruitment',
    `recruitDescription` TEXT NULL,
    `registerFrom` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `registerUntil` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `createdDateTime` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedDateTime` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `isAllowed` INTEGER NOT NULL DEFAULT 0,
    `yearAllowed` VARCHAR(191) NOT NULL DEFAULT '0,1,2,3,4,5,6,99',
    `password` VARCHAR(50) NULL,

    UNIQUE INDEX `staffRecruitID`(`staffRecruitID`),
    INDEX `projectID`(`projectID`),
    PRIMARY KEY (`staffRecruitID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projectstaffrecruitposition` (
    `staffPositionID` VARCHAR(50) NOT NULL,
    `recruitID` VARCHAR(50) NULL,
    `positionName` VARCHAR(100) NOT NULL DEFAULT 'ตำแหน่งหน้าที่',
    `maxNumber` INTEGER NOT NULL DEFAULT 1,
    `createdDateTime` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedDateTime` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `isAllowed` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `staffPositionID`(`staffPositionID`),
    INDEX `recruitID`(`recruitID`),
    PRIMARY KEY (`staffPositionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projectstaffs` (
    `staffApplicationID` VARCHAR(50) NOT NULL,
    `recruitID` VARCHAR(50) NOT NULL DEFAULT '',
    `positionID` VARCHAR(50) NOT NULL,
    `studentID` VARCHAR(10) NOT NULL DEFAULT '',
    `createdDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `staffApplicationID`(`staffApplicationID`),
    INDEX `projectstaffrecruitposition-staff-positionID`(`positionID`),
    INDEX `recruit-positionID`(`recruitID`, `positionID`),
    INDEX `studentID`(`studentID`),
    PRIMARY KEY (`staffApplicationID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `useraffiliation` (
    `studentID` VARCHAR(10) NOT NULL DEFAULT '',
    `affiliatedOrg` VARCHAR(50) NOT NULL,
    `affiliationID` VARCHAR(50) NOT NULL DEFAULT '',
    `affiliationType` ENUM('PRESIDENT', 'VICE_PRESIDENT', 'SECRETARY', 'MEMBER') NOT NULL DEFAULT 'MEMBER',
    `createdDateTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `affiliatedOrg`(`affiliatedOrg`),
    INDEX `studentID`(`studentID`),
    PRIMARY KEY (`affiliatedOrg`, `affiliationID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usercodeverification` (
    `studentID` VARCHAR(15) NOT NULL,
    `code` VARCHAR(10) NULL,
    `referenceID` VARCHAR(10) NULL,
    `createdDateTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `studentID`(`studentID`),
    PRIMARY KEY (`studentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usercredentials` (
    `uuid` VARCHAR(50) NOT NULL,
    `studentID` VARCHAR(10) NOT NULL,
    `email` VARCHAR(100) NULL,
    `hashPassword` VARCHAR(500) NULL,
    `createdDateTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedDateTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `role` ENUM('ADMIN', 'PRES', 'VP', 'STAFF', 'USER') NOT NULL DEFAULT 'USER',
    `emailVerified` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `uuid`(`uuid`),
    PRIMARY KEY (`studentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `studentID` VARCHAR(10) NOT NULL DEFAULT '',
    `titleTH` TEXT NULL,
    `firstNameTH` TEXT NULL,
    `lastNameTH` TEXT NULL,
    `nickNameTH` TEXT NULL,
    `titleEN` TEXT NULL,
    `firstNameEN` TEXT NULL,
    `lastNameEN` TEXT NULL,
    `currentYear` INTEGER NULL,
    `admissionCategory` VARCHAR(5) NULL,
    `phoneNumber` VARCHAR(11) NULL,
    `lineID` VARCHAR(100) NULL,
    `facebook` VARCHAR(100) NULL,
    `instagram` VARCHAR(100) NULL,
    `medicalCondition` TEXT NULL,
    `allergy` TEXT NULL,
    `specialNeed` TEXT NULL,
    `createdDateTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedDateTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `studentID`(`studentID`),
    PRIMARY KEY (`studentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userslogout` (
    `autoID` INTEGER NOT NULL AUTO_INCREMENT,
    `studentID` VARCHAR(50) NOT NULL DEFAULT '0',
    `token` VARCHAR(1000) NOT NULL DEFAULT '0',
    `killedDateTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `studentID`(`studentID`),
    PRIMARY KEY (`autoID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cmsoprojectannouncement` (
    `announcementID` VARCHAR(50) NOT NULL,
    `studentID` VARCHAR(10) NOT NULL,
    `projectID` VARCHAR(50) NULL,
    `announcementTitle` VARCHAR(250) NULL DEFAULT 'New Announcement',
    `announcementBody` MEDIUMTEXT NULL,
    `announcementCTALink` TEXT NULL,
    `updatedDateTime` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `projectID`(`projectID`),
    INDEX `studentID`(`studentID`),
    PRIMARY KEY (`announcementID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `uploadedfiledraft` (
    `fileID` VARCHAR(50) NOT NULL DEFAULT '',
    `studentID` VARCHAR(10) NOT NULL,
    `path` TEXT NOT NULL,
    `updatedDatetime` DATETIME(0) NULL,

    INDEX `studentID`(`studentID`),
    PRIMARY KEY (`fileID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `organizations` ADD CONSTRAINT `FK_organizations_organizations` FOREIGN KEY (`parentOrg`) REFERENCES `organizations`(`orgID`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectconsiderationstatus` ADD CONSTRAINT `FK_projectconsiderationstatus_projects` FOREIGN KEY (`projectID`) REFERENCES `projects`(`projectID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectcostexpandedlist` ADD CONSTRAINT `FK_projectcostexpandedlist_projectdata` FOREIGN KEY (`projectID`) REFERENCES `projectdata`(`projectID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projectdata` ADD CONSTRAINT `FK_projectdata_categorycmsomission` FOREIGN KEY (`cmsoMissionType`) REFERENCES `categorycmsomission`(`cmsoMissionType`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectdata` ADD CONSTRAINT `FK_projectdata_categorycmsoproject` FOREIGN KEY (`cmsoProjectType`) REFERENCES `categorycmsoproject`(`cmsoProjectType`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectdata` ADD CONSTRAINT `FK_projectdata_categorycmumedgrad` FOREIGN KEY (`cmuMedGradType`) REFERENCES `categorycmumedgrad`(`cmuMedGradType`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectdata` ADD CONSTRAINT `FK_projectdata_categorycmumedorg` FOREIGN KEY (`cmuMedOrgType`) REFERENCES `categorycmumedorg`(`cmuMedOrgType`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectdata` ADD CONSTRAINT `FK_projectdata_categorycmuproject` FOREIGN KEY (`cmuProjectType`) REFERENCES `categorycmuproject`(`cmuProjectType`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectdata` ADD CONSTRAINT `FK_projectdata_projects` FOREIGN KEY (`projectID`) REFERENCES `projects`(`projectID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectdoactlists` ADD CONSTRAINT `FK_projectdoactlists_projectdata` FOREIGN KEY (`projectID`) REFERENCES `projectdata`(`projectID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectdochecklists` ADD CONSTRAINT `FK_projectdochecklists_projectdata` FOREIGN KEY (`projectID`) REFERENCES `projectdata`(`projectID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectdodolists` ADD CONSTRAINT `FK_projectdodolists_projectdata` FOREIGN KEY (`projectID`) REFERENCES `projectdata`(`projectID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectdoplanlists` ADD CONSTRAINT `FK_projectplanlists_projectdata` FOREIGN KEY (`projectID`) REFERENCES `projectdata`(`projectID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectparticipantrecruit` ADD CONSTRAINT `projects-participantrtecruit-projectID` FOREIGN KEY (`projectID`) REFERENCES `projects`(`projectID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectparticipants` ADD CONSTRAINT `participantRecruit-participants-recruitID` FOREIGN KEY (`recruitID`) REFERENCES `projectparticipantrecruit`(`participantRecruitID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectparticipants` ADD CONSTRAINT `users-projectparticipants-studentID` FOREIGN KEY (`studentID`) REFERENCES `users`(`studentID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `organizations-projects-orgID` FOREIGN KEY (`orgID`) REFERENCES `organizations`(`orgID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `users-projects-studentID` FOREIGN KEY (`studentID`) REFERENCES `users`(`studentID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectstaffrecruit` ADD CONSTRAINT `projects-staffrecruit-projectID` FOREIGN KEY (`projectID`) REFERENCES `projects`(`projectID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectstaffrecruitposition` ADD CONSTRAINT `projecttaffrecruit-staffposition-recruitID` FOREIGN KEY (`recruitID`) REFERENCES `projectstaffrecruit`(`staffRecruitID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projectstaffs` ADD CONSTRAINT `projectstaffrecruit-staff-recruitID` FOREIGN KEY (`recruitID`) REFERENCES `projectstaffrecruit`(`staffRecruitID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projectstaffs` ADD CONSTRAINT `projectstaffrecruitposition-staff-positionID` FOREIGN KEY (`positionID`) REFERENCES `projectstaffrecruitposition`(`staffPositionID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projectstaffs` ADD CONSTRAINT `users-staff-studentID` FOREIGN KEY (`studentID`) REFERENCES `users`(`studentID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `useraffiliation` ADD CONSTRAINT `organizations-useraffiliation-affiliatedOrg` FOREIGN KEY (`affiliatedOrg`) REFERENCES `organizations`(`orgID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `useraffiliation` ADD CONSTRAINT `users-userafiliation-studentID` FOREIGN KEY (`studentID`) REFERENCES `users`(`studentID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usercodeverification` ADD CONSTRAINT `usercredentials-usercodeverification-studentID` FOREIGN KEY (`studentID`) REFERENCES `users`(`studentID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usercredentials` ADD CONSTRAINT `FK_usercredentials_users` FOREIGN KEY (`studentID`) REFERENCES `users`(`studentID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userslogout` ADD CONSTRAINT `FK_userslogout_usercredentials` FOREIGN KEY (`studentID`) REFERENCES `usercredentials`(`studentID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cmsoprojectannouncement` ADD CONSTRAINT `FK_cmsoprojectannouncement_projects` FOREIGN KEY (`projectID`) REFERENCES `projects`(`projectID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cmsoprojectannouncement` ADD CONSTRAINT `FK_cmsoprojectannouncement_users` FOREIGN KEY (`studentID`) REFERENCES `users`(`studentID`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `uploadedfiledraft` ADD CONSTRAINT `FK_uploadedfile_draft_users` FOREIGN KEY (`studentID`) REFERENCES `users`(`studentID`) ON DELETE NO ACTION ON UPDATE CASCADE;
