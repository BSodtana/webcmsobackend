const { errorCodeToResponse } = require("../../_helpers/errorCodeToResponse")
const { successCodeToResponse } = require("../../_helpers/successCodeToResponse")
const approvalServices = require('./approval/approvalServices')

const getAllApprovalData = async (req,res) => {
    try {
        const results = await approvalServices.allConsiderationData()
        res.status(200).json(successCodeToResponse(results, 'LIST-ALL-CONSIDERATION-DATA'))
    } catch (error) {
        console.log('getProjectBriefDataCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc ))
    }
}

module.exports = {
    getAllApprovalData
}