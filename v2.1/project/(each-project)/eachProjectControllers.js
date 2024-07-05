const { errorCodeToResponse } = require("../../_helpers/errorCodeToResponse")
const { successCodeToResponse } = require("../../_helpers/successCodeToResponse")
const projectServices = require("../projectServices")
const { getAllPCPInProject } = require("./(allPCPLogic)/allPCPLogic")
const eachprojectServices = require("./eachProjectServices")

const getProjectBriefDataCon = async (req, res) => {
    try {

        const { projectID } = req.params
        // const { studentID = 'NO-STD-ID' } = await req?.userData

        if (!projectID) {
            res.status(400).json(errorCodeToResponse('GET-PROJECT-BRIEF-DATA-NO-PROJECT-ID-PROVIDED', projectID))
        } else {
            const results = await eachprojectServices.getProjectBriefData(projectID)
            res.status(200).json(successCodeToResponse(results, 'GET-PROJECT-BRIEF-DATA-SUCCESS', projectID))

        }

    } catch (error) {
        console.log('getProjectBriefDataCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getProjectBriefDataCon'))
    }
}

const putProjectBriefDataCon = async (req, res) => {
    try {

        const { projectID } = req.params
        const { studentID = 'NO-STD-ID' } = await req?.userData
        const data = req.body

        const found = ["projectID", "orgID", "createdDateTime", "updatedDateTime", "academicYear"].some(r => Object.keys(data).includes(r))

        // restricted some data to be edited
        if (found) {
            res.status(400).json(errorCodeToResponse("PROJECT-BRIEF-DATA-UPDATE-PROTECTED-DATA", projectID, studentID))
        } else {
            const results = await eachprojectServices.putProjectBriefData(projectID, data)
            res.status(200).json(successCodeToResponse(results, 'UPDATE-PROJECT-BRIEF-DATA-SUCCESS', projectID, studentID))
        }

    } catch (error) {
        console.log('putProjectBriefDataCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'putProjectBriefDataCon'))
    }
}

const deleteProjectBriefDataCon = async (req, res) => {
    try {

        const { projectID } = req.params
        const { confirmDeleted } = req.body
        const { studentID = 'NO-STD-ID' } = await req?.userData


        const results = await eachprojectServices.deleteProjectBriefData(projectID, confirmDeleted)
        res.status(200).json(successCodeToResponse(results, 'DELETE-PROJECT-SUCCESS', projectID, studentID))

    } catch (error) {
        console.log('deleteProjectBriefDataCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'deleteProjectBriefDataCon'))
    }
}

// --- full ---

const getProjectFullDataCon = async (req, res) => {
    try {

        const { projectID } = req.params
        const { studentID = 'NO-STD-ID' } = await req?.userData

        if (!projectID) {
            res.status(400).json(errorCodeToResponse('GET-PROJECT-FULL-DATA-NO-PROJECT-ID-PROVIDED', studentID))
        } else {
            const results = await eachprojectServices.getProjectFullData(projectID)
            res.status(200).json(successCodeToResponse(results, 'GET-PROJECT-FULL-DATA-SUCCESS', projectID))

        }

    } catch (error) {
        console.log('getProjectFullDataCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getProjectFullDataCon'))
    }
}

const putProjectFullDataCon = async (req, res) => {
    try {

        const { projectID } = req.params
        const { studentID = 'NO-STD-ID' } = await req?.userData
        const data = req.body

        const found = ["projectID", "updatedDateTime"].some(r => Object.keys(data).includes(r))

        // restricted some data to be edited
        if (found) {
            res.status(400).json(errorCodeToResponse("PROJECT-FULL-DATA-UPDATE-PROTECTED-DATA", projectID, studentID))
        } else {
            const results = await eachprojectServices.putProjectFullData(projectID, data)
            res.status(200).json(successCodeToResponse(results, 'UPDATE-PROJECT-FULL-DATA-SUCCESS', projectID, studentID))
        }

    } catch (error) {
        console.log('putProjectFullDataCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'putProjectFullDataCon'))
    }
}

// ----- announcement -----
const getProjectAnnouncementCon = async (req, res) => {
    try {

        const { projectID } = req.params
        const { studentID = 'NO-STD-ID' } = await req?.userData

        if (!projectID) {
            res.status(400).json(errorCodeToResponse('GET-PROJECT-ANNOUNCEMENT-NO-PROJECT-ID-PROVIDED', projectID, studentID))
        } else {
            const results = await projectServices.getAnnouncementList(projectID)
            res.status(200).json(successCodeToResponse(results, 'GET-PROJECT-ANNOUNCEMENT-SUCCESS', projectID))
        }

    } catch (error) {
        console.log('getProjectAnnouncementCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getProjectAnnouncementCon'))
    }
}

const putProjectAnnouncementCon = async (req, res) => {
    try {

        const { projectID } = req.params
        const { studentID = 'NO-STD-ID' } = await req?.userData
        const data = req.body

        const found = ["studentID", "projectID", "updatedDateTime"].some(r => Object.keys(data).includes(r))

        // restricted some data to be edited
        if (found) {
            res.status(400).json(errorCodeToResponse("PROJECT-ANNOUNCEMENT-UPDATE-PROTECTED-DATA", projectID, studentID))
        } else {
            const results = await projectServices.updateAnnouncement(data?.announcementID, studentID, data)
            res.status(200).json(successCodeToResponse(results, 'UPDATE-PROJECT-ANNOUNCEMENT-SUCCESS', data?.announcementID, studentID))
        }

    } catch (error) {
        console.log('putProjectAnnouncementCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'putProjectAnnouncementCon'))
    }
}

const deleteProjectAnnouncementCon = async (req, res) => {
    try {

        const { projectID } = req.params
        const { announcementID, confirmDeleted } = req.body
        const { studentID = 'NO-STD-ID' } = await req?.userData


        const results = await projectServices.deleteAnnouncement(announcementID, confirmDeleted)
        res.status(200).json(successCodeToResponse(results, 'DELETE-PROJECT-ANNOUNCEMENT-SUCCESS', announcementID, studentID))

    } catch (error) {
        console.log('deleteProjectAnnouncementCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'deleteProjectAnnouncementCon'))
    }
}

const newProjectAnnouncementCon = async (req, res) => {
    try {

        const { projectID } = req.params
        const { studentID = 'NO-STD-ID' } = await req?.userData
        const data = req.body

        const found = ["announcementID", "studentID", "projectID", "updatedDateTime"].some(r => Object.keys(data).includes(r))

        // restricted some data to be edited
        if (found) {
            res.status(400).json(errorCodeToResponse("PROJECT-ANNOUNCEMENT-CREATED-PROTECTED-DATA", projectID, studentID))
        } else {
            // todo: allowed an option to notify staff & pcp if created new announcement
            const results = await projectServices.newAnnouncement(studentID, false, projectID, data)
            res.status(200).json(successCodeToResponse(results, 'CREATE-NEW-PROJECT-ANNOUNCEMENT-SUCCESS', results.announcementID, studentID))
        }

    } catch (error) {
        console.log('newProjectAnnouncementCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'newProjectAnnouncementCon'))
    }
}

// ----- pcp list -----
const getProjectAllPCPCon = async (req, res) => {
    try {

        const { projectID } = req.params
        const { studentID = 'NO-STD-ID' } = await req?.userData

        if (!projectID) {
            res.status(400).json(errorCodeToResponse('GET-PROJECT-PCP-LIST-NO-PROJECT-ID-PROVIDED', projectID, studentID))
        } else {
            const resultsPCP = await getAllPCPInProject(projectID)
            res.status(200).json(successCodeToResponse({
                participant: resultsPCP,
                staff: []
            }, 'GET-PROJECT-ANNOUNCEMENT-SUCCESS', projectID))
        }

    } catch (error) {
        console.log('getProjectAllPCPCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getProjectAllPCPCon'))
    }
}


// ----- join project -----
const joinProjectCon = async (req, res) => {
    try {

        const { projectID } = req.params
        const { studentID = 'NO-STD-ID' } = await req?.userData
        const { recruitID, password = null, forced = false } = req.body

        // todo: password protected recruitment
        if (!projectID || !studentID || !recruitID || (typeof (forced) !== "boolean")) {
            res.status(400).json(errorCodeToResponse("NOT-ENOUGH-DATA", recruitID, studentID))
        } else {
            // todo: allowed an option to notify staff & pcp if created new announcement
            const results = await eachprojectServices.joinProjectPCP(recruitID, studentID, password, forced)
            res.status(200).json(successCodeToResponse(results, 'JOIN-PROJECT-PCP-SUCCESS', recruitID, studentID))
        }

    } catch (error) {
        console.log('joinProjectCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'joinProjectCon'))
    }
}


module.exports = {
    getProjectBriefDataCon,
    putProjectBriefDataCon,
    deleteProjectBriefDataCon,

    getProjectFullDataCon,
    putProjectFullDataCon,

    getProjectAnnouncementCon,
    putProjectAnnouncementCon,
    deleteProjectAnnouncementCon,
    newProjectAnnouncementCon,

    getProjectAllPCPCon,

    joinProjectCon
}