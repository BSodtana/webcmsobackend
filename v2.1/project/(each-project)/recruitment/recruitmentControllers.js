const { errorCodeToResponse } = require("../../../_helpers/errorCodeToResponse")
const { successCodeToResponse } = require("../../../_helpers/successCodeToResponse")
const recruitmentServices = require("./recruitmentServices")

const getPCPSTFListController = async (req, res) => {
    try {

        const { projectID } = req.params
        const { studentID = 'NO-STD-ID' } = await req?.userData

        const results1 = await recruitmentServices.getParticipantRecruitmentList(projectID)
        const results2 = await recruitmentServices.getStaffRecruitmentList(projectID)

        res.status(200).json(successCodeToResponse(
            {
                participant: results1,
                staff: results2

            }, 'GET-PARTICIPANT-RECRUITMENT-LIST-SUCCESS', studentID))


    } catch (error) {
        console.log('getPCPSTFListController', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getPCPSTFListController'))
    }
}

const getParticipantRecruitmentListController = async (req, res) => {
    try {

        const { projectID } = req.params
        const { studentID = 'NO-STD-ID' } = await req?.userData

        const results = await recruitmentServices.getParticipantRecruitmentList(projectID)
        res.status(200).json(successCodeToResponse(results, 'GET-PARTICIPANT-RECRUITMENT-LIST-SUCCESS', studentID))


    } catch (error) {
        console.log('getParticipantRecruitmentListController', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getParticipantRecruitmentListController'))
    }
}

const getStaffRecruitmentListController = async (req, res) => {
    try {

        const { projectID } = req.params
        const { studentID = 'NO-STD-ID' } = await req?.userData

        const results = await recruitmentServices.getStaffRecruitmentList(projectID)
        res.status(200).json(successCodeToResponse(results, 'GET-STAFF-RECRUITMENT-LIST-SUCCESS', studentID))


    } catch (error) {
        console.log('getStaffRecruitmentListController', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getStaffRecruitmentListController'))
    }
}

const newParticipantRecruitmentController = async (req, res) => {
    try {

        const { projectID } = req.params
        const { studentID = 'NO-STD-ID' } = await req?.userData
        const data = req.body

        const found = ["participantRecruitID", "projectID", "studentID", "createdDateTime", "updatedDateTime"].some(r => Object.keys(data).includes(r))

        // restricted some data to be edited
        if (found) {
            res.status(400).json(errorCodeToResponse("RECRUIT-PCP-UPDATE-PROTECTED-DATA", projectID, studentID))
        } else {
            const results = await recruitmentServices.newParticipantRecruitment(projectID, data)
            res.status(200).json(successCodeToResponse(results, 'CREATE-NEW-RECRUIT-PCP-SUCCESS', results.participantRecruitID, projectID))
        }


    } catch (error) {
        console.log('newParticipantRecruitmentController', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'newParticipantRecruitmentController'))
    }
}

const newStaffRecruitmentController = async (req, res) => {
    try {

        const { projectID } = req.params
        const { studentID = 'NO-STD-ID' } = await req?.userData
        const data = req.body

        const found = ["staffRecruitID", "projectID", "studentID", "createdDateTime", "updatedDateTime"].some(r => Object.keys(data).includes(r))

        // restricted some data to be edited
        if (found) {
            res.status(400).json(errorCodeToResponse("RECRUIT-STF-UPDATE-PROTECTED-DATA", projectID, studentID))
        } else {
            const results = await recruitmentServices.newStaffRecruitment(projectID, data)
            res.status(200).json(successCodeToResponse(results, 'CREATE-NEW-RECRUIT-STF-SUCCESS', results.staffRecruitID, projectID))
        }


    } catch (error) {
        console.log('newStaffRecruitmentController', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'newStaffRecruitmentController'))
    }
}

module.exports = {
    getParticipantRecruitmentListController,
    getStaffRecruitmentListController,

    newParticipantRecruitmentController,
    newStaffRecruitmentController,

    getPCPSTFListController
}