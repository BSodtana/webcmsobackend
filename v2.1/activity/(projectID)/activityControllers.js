const { errorCodeToResponse } = require('../../_helpers/errorCodeToResponse')
const { successCodeToResponse } = require('../../_helpers/successCodeToResponse')
const activityServices = require('./activityServices')

const getCheckInCodeCon = async (req, res) => {
    try {

        const { studentID = 'NO-STD-ID' } = await req?.userData
        const { projectID } = req.params

        const results = await activityServices.getCheckInCode(projectID)
        res.status(200).json(successCodeToResponse(results, 'ACTIVITY-GET-CHECK-IN-CODE-SUCCESS', studentID))


    } catch (error) {
        console.log('getCheckInCodeCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getCheckInCodeCon'))

    }
}

const checkInBulkCon = async (req, res) => {
    try {

        const { studentID = 'NO-STD-ID' } = await req?.userData
        const { projectID } = req.params
        const { studentIDList = [] } = req.body

        // list of stdid in list
        if (!projectID || !studentID || studentIDList.constructor !== Array) {
            res.status(400).json(errorCodeToResponse("NOT-ENOUGH-DATA", projectID, studentIDList))
        } else {
            const results = await activityServices.checkInBulk(projectID, studentIDList)
            res.status(200).json(successCodeToResponse(results, 'CHECK-IN-BULK-SUCCESS', projectID))
        }

    } catch (error) {
        console.log('checkInBulkCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'checkInBulkCon'))

    }
}



module.exports = {
    getCheckInCodeCon,
    checkInBulkCon
}