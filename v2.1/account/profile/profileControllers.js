const { errorCodeToResponse } = require("../../_helpers/errorCodeToResponse")
const { successCodeToResponse } = require("../../_helpers/successCodeToResponse")
const profileServices = require("./profileServices")

const getUserFullDataController = async (req, res) => {
    try {

        const { studentID } = await req?.userData

        const results = await profileServices.getUserFullPersonalData(studentID)
        res.status(200).json(successCodeToResponse(results, 'GET-PERSONAL-DATA-SUCCESS', studentID))


    } catch (error) {
        console.log('getUserFullDataController', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getUserFullDataController'))
    }
}

const putUserFullDataController = async (req, res) => {
    try {

        const { studentID } = await req?.userData
        const data = req.body

        const found = ["studentID", "currentYear", "admissionCategory", "createdDateTime", "updatedDateTime"].some(r => Object.keys(data).includes(r))

        // restricted some data to be edited
        if (found) {
            res.status(400).json(errorCodeToResponse("PERSONAL-DATA-UPDATE-PROTECTED-DATA", studentID))
        } else {
            const results = await profileServices.putUserFullPersonalData(studentID, data)
            res.status(200).json(successCodeToResponse(results, 'UPDATE-PERSONAL-DATA-SUCCESS', studentID))

        }


    } catch (error) {
        console.log('putUserFullDataController', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'putUserFullDataController'))
    }
}

module.exports = {
    getUserFullDataController,
    putUserFullDataController
}