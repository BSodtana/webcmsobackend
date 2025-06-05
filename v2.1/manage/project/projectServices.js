// path: e.g., src/api/project/projectGlobalServices.js
require('dotenv').config();
const prisma = require('../../prisma'); // Adjust path to your Prisma client

/**
 * @desc Get list of all non-specific (global) project announcements
 */
const listProjectAnnouncements = async () => {
    return prisma.cmsoprojectannouncement.findMany({
        where: {
            projectID: null // Key filter for global announcements
        },
        orderBy: {
            updatedDateTime: 'desc'
        },
        include: { // Include user who made the announcement
            users: { // Based on relation name in 'cmsoprojectannouncement' to 'users'
                select: {
                    studentID: true,
                    firstNameTH: true,
                    lastNameTH: true
                }
            }
        }
    });
};

/**
 * @desc Add a new global project announcement
 * @param {object} announcementData - { studentID (creator), announcementTitle, announcementBody, etc. }
 */
const addProjectAnnouncement = async (announcementData) => {
    const { studentID, announcementTitle, announcementBody, announcementCTALink, isPublic, isAnnouncementPinned, announcementTarget } = announcementData;

    if (!studentID || !announcementTitle) {
        throw { code: 'VALIDATION_ERROR', desc: 'studentID and announcementTitle are required.' };
    }
    
    // Generate a unique announcementID (example strategy)
    const count = await prisma.cmsoprojectannouncement.count({ where: { projectID: null } });
    const newNum = count + 1;
    const numFormatPadding = newNum.toString().padStart(4, '0');
    const announcementID = `GLOBAL-PROJ-A${numFormatPadding}`;


    return prisma.cmsoprojectannouncement.create({
        data: {
            announcementID,
            studentID, // User who created it
            projectID: null, // Explicitly global
            announcementTitle,
            announcementBody,
            announcementCTALink,
            isPublic: isPublic ? 1 : 0,
            isAnnouncementPinned: isAnnouncementPinned ? 1 : 0,
            announcementTarget: announcementTarget || 'STF,PCP', // Default if not provided
            // updatedDateTime is handled by @default(now())
        }
    });
};

/**
 * @desc Edit/Update a global project announcement
 * @param {string} announcementID
 * @param {object} updateData - Fields to update
 * @param {string} editorStudentID - studentID of the user editing the announcement
 */
const editProjectAnnouncement = async (announcementID, updateData, editorStudentID) => {
    const { announcementTitle, announcementBody, announcementCTALink, isPublic, isAnnouncementPinned, announcementTarget } = updateData;

    return prisma.cmsoprojectannouncement.update({
        where: {
            announcementID: announcementID,
            projectID: null // Ensure we are only editing a global announcement
        },
        data: {
            announcementTitle,
            announcementBody,
            announcementCTALink,
            isPublic: isPublic !== undefined ? (isPublic ? 1 : 0) : undefined,
            isAnnouncementPinned: isAnnouncementPinned !== undefined ? (isAnnouncementPinned ? 1 : 0) : undefined,
            announcementTarget,
            studentID: editorStudentID, // Log who made the edit
            updatedDateTime: new Date() // Manually set update time
        }
    });
};


module.exports = {
    listProjectAnnouncements,
    addProjectAnnouncement,
    editProjectAnnouncement
};