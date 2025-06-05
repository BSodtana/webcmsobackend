// path: e.g., src/api/project/projectSpecificServices.js
require('dotenv').config();
const prisma = require('../../../prisma'); // Adjust path to your Prisma client

/**
 * @desc Get brief detail for a specific project
 * @param {string} projectID
 */
const getProjectBriefDetail = async (projectID) => {
    const project = await prisma.projects.findUnique({
        where: { projectID },
        select: {
            projectID: true,
            projectNameTH: true,
            projectNickNameTH: true,
            orgID: true,
            academicYear: true,
            eventDateStart: true,
            eventDateFinish: true,
            isShown: true,
            projectdata: { // Relation name from your 'projects' model to 'projectdata'
                select: {
                    projectShortDescriptionTH: true,
                    placeInCMU: true,
                    placeOutsideCMU: true,
                    numberStudentParticipant: true,
                    numberStudentStaff: true,
                    updatedDateTime: true // from projectdata
                }
            },
            updatedDateTime: true // from projects
        }
    });
    if (!project) {
        throw { code: 'PROJECT_NOT_FOUND', desc: `Project with ID ${projectID} not found.` };
    }
    return project;
};

/**
 * @desc Update brief detail for a specific project
 * @param {string} projectID
 * @param {object} dataToUpdate - Fields for 'projects' and 'projectdata' tables
 * @param {string} updaterStudentID - studentID of the user updating
 */
const updateProjectBriefDetail = async (projectID, dataToUpdate, updaterStudentID) => {
    const {
        // Fields for 'projects' table
        projectNameTH, projectNickNameTH, orgID, academicYear, eventDateStart, eventDateFinish, isShown,
        // Fields for 'projectdata' table
        projectShortDescriptionTH, placeInCMU, placeOutsideCMU, numberStudentParticipant, numberStudentStaff,
        // ... any other brief fields you want to allow updating via this endpoint
    } = dataToUpdate;

    // Data for the 'projects' table
    const projectUpdateData = {};
    if (projectNameTH !== undefined) projectUpdateData.projectNameTH = projectNameTH;
    if (projectNickNameTH !== undefined) projectUpdateData.projectNickNameTH = projectNickNameTH;
    if (orgID !== undefined) projectUpdateData.orgID = orgID; // Ensure orgID exists if changed
    if (academicYear !== undefined) projectUpdateData.academicYear = academicYear;
    if (eventDateStart !== undefined) projectUpdateData.eventDateStart = new Date(eventDateStart);
    if (eventDateFinish !== undefined) projectUpdateData.eventDateFinish = new Date(eventDateFinish);
    if (isShown !== undefined) projectUpdateData.isShown = parseInt(isShown) ? 1 : 0;
    
    // studentID of who last updated the project
    projectUpdateData.studentID = updaterStudentID; // Assuming the 'studentID' on 'projects' table tracks last modifier
    projectUpdateData.updatedDateTime = new Date();

    // Data for the 'projectdata' table
    const projectDataUpdatePayload = {};
    if (projectShortDescriptionTH !== undefined) projectDataUpdatePayload.projectShortDescriptionTH = projectShortDescriptionTH;
    if (placeInCMU !== undefined) projectDataUpdatePayload.placeInCMU = placeInCMU;
    if (placeOutsideCMU !== undefined) projectDataUpdatePayload.placeOutsideCMU = placeOutsideCMU;
    if (numberStudentParticipant !== undefined) projectDataUpdatePayload.numberStudentParticipant = parseInt(numberStudentParticipant);
    if (numberStudentStaff !== undefined) projectDataUpdatePayload.numberStudentStaff = parseInt(numberStudentStaff);
    
    projectDataUpdatePayload.updatedDateTime = new Date();


    return prisma.$transaction(async (tx) => {
        if (Object.keys(projectUpdateData).length > 0) {
            await tx.projects.update({
                where: { projectID },
                data: projectUpdateData,
            });
        }

        if (Object.keys(projectDataUpdatePayload).length > 0) {
            await tx.projectdata.upsert({ // Use upsert to create if not exists, or update if exists
                where: { projectID },
                update: projectDataUpdatePayload,
                create: {
                    projectID, // Must be included for create
                    ...projectDataUpdatePayload,
                    // Ensure all other required fields for projectdata are provided or have defaults
                },
            });
        }
        // Refetch the updated brief detail
        return getProjectBriefDetail(projectID); // Leverage the existing get function
    });
};

/**
 * @desc Delete brief detail data (specifically the associated 'projectdata' record) for a project.
 * The main 'projects' record remains.
 * @param {string} projectID
 */
const deleteProjectBriefDetailData = async (projectID) => {

    const existingProjectData = await prisma.projectdata.findUnique({ where: { projectID }});
    if (!existingProjectData) {
         throw { code: 'PROJECT_DATA_NOT_FOUND', desc: `Project data for project ID ${projectID} not found, nothing to delete.` };
    }

    return prisma.projectdata.delete({
        where: { projectID },
    });
};

module.exports = {
    getProjectBriefDetail,
    updateProjectBriefDetail,
    deleteProjectBriefDetailData,
    // ... other specific project services will be added here
};