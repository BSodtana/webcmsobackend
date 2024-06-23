const { errorCodeToResponse } = require("../../../_helpers/errorCodeToResponse")
const { successCodeToResponse } = require("../../../_helpers/successCodeToResponse")
const recruitmentServices = require("./recruitmentServices")

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

module.exports = {
    getParticipantRecruitmentListController,
    getStaffRecruitmentListController
}