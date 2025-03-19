const { errorCodeToResponse } = require("../../_helpers/errorCodeToResponse")
const { successCodeToResponse } = require("../../_helpers/successCodeToResponse")
const projectImportServices = require("./projectImportServices")

const getMSListProjectController = async (req, res) => {
    try {

        const { studentID = 'NO-STD-ID' } = await req?.userData

        const results = await projectImportServices.getMSListProject(studentID)
        res.status(200).json(successCodeToResponse(results, 'RETREIVE-MSLIST-DATA-SUCCESS', studentID))


    } catch (error) {
        console.log('getMSListProjectController', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getMSListProjectController'))
    }
}



module.exports = {
    getMSListProjectController
}