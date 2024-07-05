const { errorCodeToResponse } = require("../../../_helpers/errorCodeToResponse")
const { successCodeToResponse } = require("../../../_helpers/successCodeToResponse")
const myProjectServices = require('./myProjectServices')

const getProjectMyOwnController = async (req, res) => {
    try {

        const { studentID } = await req?.userData

        const results = await myProjectServices.getProjectMyOwn(studentID)
        res.status(200).json(successCodeToResponse(results, 'GET-PERSONAL-PROJECT-DATA-SUCCESS', studentID))


    } catch (error) {
        console.log('getProjectMyOwnController', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getProjectMyOwnController'))
    }
}

const getProjectIJoinedPCPController = async (req, res) => {
    try {

        const { studentID } = await req?.userData

        const results = await myProjectServices.getProjectIJoinAsPCP(studentID)
        res.status(200).json(successCodeToResponse(results, 'GET-PROJECT-JOINED-AS-PCP-SUCCESS', studentID))


    } catch (error) {
        console.log('getProjectIJoinedPCPController', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getProjectIJoinedPCPController'))
    }
}


module.exports = {
    getProjectMyOwnController,
    getProjectIJoinedPCPController
}