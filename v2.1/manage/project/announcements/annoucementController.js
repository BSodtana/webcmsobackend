// path: e.g., src/api/project/projectGlobalControllers.js
const {listProjectAnnouncements,
    addProjectAnnouncement,
    editProjectAnnouncement} = require('./annoucementServices');

const listGlobalAnnouncementsController = async (req, res) => {
    try {
        // Extract filter parameters from query string
        const { isPublic, isPinned, studentID } = req.query;

        const filters = {};
        if (isPublic !== undefined) filters.isPublic = isPublic;
        if (isPinned !== undefined) filters.isPinned = isPinned;
        if (studentID) filters.studentID = studentID;

        const announcements = await listProjectAnnouncements(filters);
        res.status(200).json({ success: true, data: announcements });
    } catch (error) {
        console.error('listGlobalAnnouncementsController Error:', error);
        // It's good practice to provide a more specific error code if possible
        // For now, using the existing structure
        res.status(500).json({
            success: false,
            code: error.code || 'INTERNAL_ERROR',
            error: {
                message: error.message || 'Failed to list global project announcements.'
            }
        });
    }
};
const addGlobalAnnouncementController = async (req, res) => {
    try {
        const studentID = req.userData.studentID
        if (!studentID) {
            return res.status(401).json({ success: false, code: 'UNAUTHENTICATED', error: { message: 'User not authenticated.' }});
        }
        const announcementData = { ...req.body, studentID };
        const newAnnouncement = await addProjectAnnouncement(announcementData);
        res.status(201).json({ success: true, message: "Global project announcement created.", data: newAnnouncement });
    } catch (error) {
        console.error('addGlobalAnnouncementController Error:', error);
        const statusCode = error.code === 'VALIDATION_ERROR' ? 400 : 500;
        res.status(statusCode).json({ success: false, code: error.code || 'INTERNAL_ERROR', error: { message: error.message || 'Failed to create global project announcement.'}});
    }
};

const editGlobalAnnouncementController = async (req, res) => {
    try {
        const { announcementId } = req.params;
        const editorStudentID = req.userData.studentID; 
        if (!editorStudentID) {
            return res.status(401).json({ success: false, code: 'UNAUTHENTICATED', error: { message: 'User not authenticated.' }});
        }   

        const updatedAnnouncement = await editProjectAnnouncement(announcementId, req.body, editorStudentID);
        res.status(200).json({ success: true, message: "Global project announcement updated.", data: updatedAnnouncement });
    } catch (error) {
        console.error('editGlobalAnnouncementController Error:', error);
        const statusCode = error.code === 'P2025' ? 404 : (error.code === 'VALIDATION_ERROR' ? 400 : 500); // P2025: Record not found
        res.status(statusCode).json({ success: false, code: error.code || 'INTERNAL_ERROR', error: { message: error.message || 'Failed to update global project announcement.'}});
    }
};

module.exports = {
    listGlobalAnnouncementsController,
    addGlobalAnnouncementController,
    editGlobalAnnouncementController
};