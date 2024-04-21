-- CreateTable
CREATE TABLE `activity_characteristics_choices` (
    `id` VARCHAR(50) NOT NULL,
    `type` INTEGER NULL,
    `text` VARCHAR(150) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organizations` (
    `orgID` VARCHAR(15) NOT NULL DEFAULT '',
    `orgName` VARCHAR(100) NOT NULL DEFAULT '',
    `orgType` VARCHAR(10) NOT NULL DEFAULT '',
    `parentOrg` VARCHAR(15) NULL DEFAULT '',

    PRIMARY KEY (`orgID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_21st_skill_items` (
    `skillItemID` VARCHAR(50) NOT NULL DEFAULT '',
    `skillSetID` VARCHAR(50) NOT NULL DEFAULT '',
    `skillName` VARCHAR(100) NOT NULL DEFAULT '',

    PRIMARY KEY (`skillItemID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_21st_skill_set` (
    `skillSetID` VARCHAR(50) NOT NULL,
    `skillSetName` VARCHAR(100) NOT NULL DEFAULT '0',

    PRIMARY KEY (`skillSetID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_participants` (
    `participantPositionID` VARCHAR(36) NOT NULL,
    `recruitID` VARCHAR(15) NOT NULL DEFAULT '',
    `student_id` INTEGER NOT NULL DEFAULT 0,
    `createdDateTime` DATETIME(3) NULL,

    INDEX `recruitID`(`recruitID`),
    INDEX `student_id`(`student_id`),
    PRIMARY KEY (`participantPositionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_recruit_participant` (
    `recruitID` VARCHAR(15) NOT NULL DEFAULT (current_timestamp()),
    `projectID` VARCHAR(15) NOT NULL,
    `registerFrom` DATETIME(0) NOT NULL,
    `registerUntil` DATETIME(0) NOT NULL,
    `maxNumber` INTEGER NOT NULL DEFAULT 0,
    `createdDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isAllowed` BOOLEAN NOT NULL DEFAULT false,

    INDEX `projectID`(`projectID`),
    PRIMARY KEY (`recruitID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_recruit_staff` (
    `recruitID` VARCHAR(15) NOT NULL DEFAULT (current_timestamp()),
    `projectID` VARCHAR(15) NOT NULL,
    `registerFrom` DATETIME(0) NOT NULL,
    `registerUntil` DATETIME(0) NOT NULL,
    `createdDateTime` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedDateTime` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `isAllowed` BOOLEAN NOT NULL DEFAULT false,

    INDEX `projectID`(`projectID`),
    PRIMARY KEY (`recruitID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_staff_positions` (
    `positionID` VARCHAR(15) NOT NULL DEFAULT (current_timestamp()),
    `recruitID` VARCHAR(15) NOT NULL,
    `positionName` VARCHAR(15) NOT NULL,
    `maxNumber` INTEGER NOT NULL DEFAULT 0,
    `registerFrom` DATETIME(0) NOT NULL,
    `registerUntil` DATETIME(0) NOT NULL,
    `createdDateTime` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedDateTime` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `isAllowed` BOOLEAN NOT NULL DEFAULT false,

    INDEX `recruitID`(`recruitID`),
    PRIMARY KEY (`positionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_staffs` (
    `staffPositionID` VARCHAR(36) NOT NULL,
    `recruitID` VARCHAR(15) NOT NULL DEFAULT '',
    `student_id` INTEGER NOT NULL DEFAULT 0,
    `createdDateTime` DATETIME(3) NULL,

    INDEX `recruitID`(`recruitID`),
    INDEX `student_id`(`student_id`),
    PRIMARY KEY (`staffPositionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_year_allow` (
    `allowID` VARCHAR(10) NOT NULL DEFAULT (current_timestamp()),
    `recruitID` VARCHAR(15) NULL,
    `yearAllowed` INTEGER NULL,

    INDEX `recruitID`(`recruitID`),
    PRIMARY KEY (`allowID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projects` (
    `project_id` VARCHAR(50) NOT NULL,
    `student_id` INTEGER NULL,
    `orgID` VARCHAR(50) NULL,
    `projectName` VARCHAR(500) NULL,
    `projectDescription` VARCHAR(280) NULL,
    `projectDetail` VARCHAR(10000) NULL,
    `eventDateStart` DATETIME(3) NULL,
    `eventDateFinish` DATETIME(3) NULL,
    `createdDateTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedDateTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `orgID`(`orgID`),
    INDEX `student_id`(`student_id`),
    PRIMARY KEY (`project_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projects_data` (
    `project_id` VARCHAR(50) NOT NULL,
    `project_name` VARCHAR(500) NULL,
    `place_in_cmu` MEDIUMTEXT NULL,
    `place_outside_cmu` MEDIUMTEXT NULL,
    `date_prepare_start` DATE NULL,
    `date_prepare_end` DATE NULL,
    `date_event_start` DATE NULL,
    `date_event_end` DATE NULL,
    `date_summation_start` DATE NULL,
    `date_summation_end` DATE NULL,
    `owner_org` VARCHAR(9) NULL,
    `owner_student` INTEGER NULL,
    `prof` VARCHAR(100) NULL,
    `prof_aff` VARCHAR(100) NULL,
    `other_org` MEDIUMTEXT NULL,
    `cmso_proj_type` VARCHAR(10) NULL,
    `cmu_proj_type` VARCHAR(10) NULL,
    `cmu_med_grad` VARCHAR(10) NULL,
    `cmso_mission_type` VARCHAR(10) NULL,
    `cmu_med_org` VARCHAR(10) NULL,
    `background` VARCHAR(3000) NULL,
    `aims` MEDIUMTEXT NULL,
    `participant_student` INTEGER NULL,
    `participant_prof` INTEGER NULL,
    `participant_student_staff` INTEGER NULL,
    `participant_fac_staff` INTEGER NULL,
    `participant_outside` INTEGER NULL,
    `goal_qualitative` MEDIUMTEXT NULL,
    `indicator_participant` MEDIUMTEXT NULL,
    `indicator_satisfactory` MEDIUMTEXT NULL,
    `indicator_aims` MEDIUMTEXT NULL,
    `output` MEDIUMTEXT NULL,
    `plan` MEDIUMTEXT NULL,
    `stageDo` MEDIUMTEXT NULL,
    `stageCheck` MEDIUMTEXT NULL,
    `act` MEDIUMTEXT NULL,
    `fund_fac` MEDIUMTEXT NULL,
    `fund_extracir` MEDIUMTEXT NULL,
    `fund_sport` MEDIUMTEXT NULL,
    `fund_other` MEDIUMTEXT NULL,
    `fund_name` VARCHAR(200) NULL,
    `createdDateTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`project_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_affiliation` (
    `student_id` INTEGER NOT NULL,
    `affiliatedOrg` VARCHAR(50) NOT NULL,
    `affiliationType` VARCHAR(50) NULL,
    `createdDateTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `affiliationID` INTEGER NOT NULL AUTO_INCREMENT,

    INDEX `affiliatedOrg`(`affiliatedOrg`),
    INDEX `student_id`(`student_id`),
    PRIMARY KEY (`affiliationID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `student_id` INTEGER NOT NULL,
    `title` VARCHAR(10) NULL,
    `first_name` VARCHAR(50) NULL,
    `last_name` VARCHAR(50) NULL,
    `nick_name` VARCHAR(50) NULL,
    `current_year` INTEGER NULL,
    `category` VARCHAR(50) NULL,
    `phone_number` VARCHAR(10) NULL,
    `line_id` VARCHAR(50) NULL,
    `facebook` VARCHAR(50) NULL,
    `instagram` VARCHAR(50) NULL,
    `medical_condition` VARCHAR(100) NULL,
    `allergy` VARCHAR(100) NULL,
    `special_need` VARCHAR(100) NULL,
    `createdDateTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedDateTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `first_name_en` VARCHAR(50) NULL,
    `last_name_en` VARCHAR(50) NULL,

    INDEX `student_id`(`student_id`, `first_name`),
    UNIQUE INDEX `users_student_id_key`(`student_id`),
    PRIMARY KEY (`student_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_code_verification` (
    `student_id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(10) NULL,
    `createdDateTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `referenceID` VARCHAR(10) NULL,

    PRIMARY KEY (`student_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_credential` (
    `student_id` INTEGER NOT NULL,
    `email` VARCHAR(100) NULL,
    `password` VARCHAR(500) NULL,
    `createdDateTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedDateTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `role` ENUM('admin', 'staff', 'user') NULL,
    `emailVerified` INTEGER NULL DEFAULT 0,

    UNIQUE INDEX `users_credential_student_id_key`(`student_id`),
    PRIMARY KEY (`student_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_infection` (
    `owner_uuid` VARCHAR(36) NOT NULL,
    `dose` INTEGER NOT NULL,
    `date` DATE NULL,
    `createdDateTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`owner_uuid`, `dose`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_logout` (
    `uuid` VARCHAR(36) NULL,
    `jwt` VARCHAR(500) NULL,
    `killedDateTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_vaccine` (
    `owner_uuid` VARCHAR(36) NOT NULL,
    `dose` INTEGER NOT NULL,
    `type` VARCHAR(50) NULL,
    `date` DATE NULL,
    `createdDateTime` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`owner_uuid`, `dose`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `projects_data` ADD CONSTRAINT `projects_data_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
