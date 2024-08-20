const { errorCodeToResponse } = require("../../../_helpers/errorCodeToResponse")
const { successCodeToResponse } = require("../../../_helpers/successCodeToResponse")
const approvalServices = require("./approvalServices")

const getProjectApprovalData = async (req, res) => {
    try {

        const { projectID } = req.params

        if (!projectID) {
            res.status(400).json(errorCodeToResponse('GET-PROJECT-CONSIDER-DATA-NO-PROJECT-ID-PROVIDED'))
        } else {
            const results = await approvalServices.getProjectConsiderationInfoData(projectID)
            res.status(200).json(successCodeToResponse(results, 'GET-PROJECT-CONSIDER-DATA-SUCCESS', projectID))
        }

    } catch (error) {
        console.log('getProjectApprovalData', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc))
    }
}

const editProjectApprovalData = async (req, res) => {
    try {

        const { projectID } = req.params
        const {
            projectConsiderationType,
            projectType,

            dateApprovalDoc,
            dateOtherDoc,
            dateActionPlan,
            dateReceipt,
            dateFinalize,
        } = req.body

        let checkData = true
        // check type of each data
        if ((projectConsiderationType !== null) && (!['EARLY_BIRD', 'NORMAL'].includes(projectConsiderationType))) { checkData = false }
        if ((projectType !== null) && (!['OLD', 'NEW'].includes(projectType))) { checkData = false }


        if (!projectID) {
            res.status(400).json(errorCodeToResponse('EDIT-PROJECT-CONSIDER-DATA-NO-PROJECT-ID-PROVIDED'))
        } else if (checkData !== true) {
            res.status(400).json(errorCodeToResponse("ERROR-DATA-TYPE-FAILED", { projectConsiderationType, projectType }))
        } else {
            const results = await approvalServices.editProjectConsiderationInfoData(projectID, projectConsiderationType, projectType, dateApprovalDoc, dateOtherDoc, dateActionPlan, dateReceipt, dateFinalize)
            res.status(200).json(successCodeToResponse(results, 'EDIT-PROJECT-CONSIDER-DATA-SUCCESS', projectID))
        }

    } catch (error) {
        console.log('editProjectApprovalData', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc))
    }
}

const getProjectApprovalDataOnlyStatus = async (req, res) => {
    try {

        const { projectID } = req.params

        if (!projectID) {
            res.status(400).json(errorCodeToResponse('GET-PROJECT-CONSIDER-DATA-NO-PROJECT-ID-PROVIDED'))
        } else {
            const results = await approvalServices.getProjectConsiderationDataOnlyStatusData(projectID)
            res.status(200).json(successCodeToResponse(results, 'GET-PROJECT-CONSIDER-DATA-SUCCESS', projectID))
        }

    } catch (error) {
        console.log('getProjectApprovalDataOnlyStatus', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc))
    }
}

const editProjectApprovalDataOnlyStatus = async (req, res) => {
    try {

        const { projectID } = req.params
        const {
            statusVP,
            statusFinance,
            statusSec,
            statusPresent,
            comment
        } = req.body

        let checkData = true
        // check type of each data
        if ((statusVP !== null) && (!['QUEUE', 'APPROVED', 'REJECTED'].includes(statusVP))) { checkData = false }
        if ((statusFinance !== null) && (!['QUEUE', 'APPROVED', 'REJECTED'].includes(statusFinance))) { checkData = false }
        if ((statusSec !== null) && (!['QUEUE', 'APPROVED', 'REJECTED'].includes(statusSec))) { checkData = false }
        if ((statusPresent !== null) && (!['QUEUE', 'REJECTED', 'PASS_IN_PRINCIPLE', 'PASS'].includes(statusPresent))) { checkData = false }


        if (!projectID) {
            res.status(400).json(errorCodeToResponse('EDIT-PROJECT-CONSIDER-DATA-NO-PROJECT-ID-PROVIDED'))
        } else if (checkData !== true) {
            res.status(400).json(errorCodeToResponse("ERROR-DATA-TYPE-FAILED", {
                statusVP,
                statusFinance,
                statusSec,
                statusPresent,
                comment
            }))
        } else {
            const results = await approvalServices.editProjectConsiderationDataOnlyStatus(projectID, statusVP, statusFinance, statusSec, statusPresent, comment)
            res.status(200).json(successCodeToResponse(results, 'EDIT-PROJECT-CONSIDER-DATA-SUCCESS', projectID))
        }

    } catch (error) {
        console.log('editProjectApprovalDataOnlyStatus', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc))
    }
}

module.exports = {
    getProjectApprovalData,
    editProjectApprovalData,

    getProjectApprovalDataOnlyStatus,
    editProjectApprovalDataOnlyStatus
}