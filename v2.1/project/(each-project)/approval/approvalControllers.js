const { errorCodeToResponse } = require("../../../_helpers/errorCodeToResponse")
const { successCodeToResponse } = require("../../../_helpers/successCodeToResponse")
const approvalServices = require("./approvalServices")

const getProjectApprovalData = async (req, res) => {
    try {

        const { projectID } = req.params

        if (!projectID) {
            res.status(400).json(errorCodeToResponse('GET-PROJECT-CONSIDER-DATA-NO-PROJECT-ID-PROVIDED'))
        } else {
            const results = await approvalServices.getProjectConsiderationData(projectID)
            res.status(200).json(successCodeToResponse(results, 'GET-PROJECT-CONSIDER-DATA-SUCCESS', projectID))
        }

    } catch (error) {
        console.log('getProjectApprovalData', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc))
    }
}

module.exports = {
    getProjectApprovalData
}