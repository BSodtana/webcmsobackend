const { errorCodeToResponse } = require("../../_helpers/errorCodeToResponse")
const { successCodeToResponse } = require("../../_helpers/successCodeToResponse")
const commonServices = require("./commonServices")

const listAllOrgCMSOCon = async (req, res) => {
    try {

        const { studentID = 'NO-STD-ID' } = await req?.userData

        const results = await commonServices.listAllOrgCMSO()
        res.status(200).json(successCodeToResponse(results, 'LIST-ALL-CMSO-ORG-SUCCESS', studentID))


    } catch (error) {
        console.log('listAllOrgCMSOCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'listAllOrgCMSOCon'))
    }
}

module.exports = {
    listAllOrgCMSOCon
}