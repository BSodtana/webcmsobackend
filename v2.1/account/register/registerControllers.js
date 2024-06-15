const { errorCodeToResponse } = require("../../_helpers/errorCodeToResponse")
const { successCodeToResponse } = require("../../_helpers/successCodeToResponse")
const registerServices = require("./registerServices")

const prelimDataController = async (req, res) => {
    try {

        const { studentID } = req.params

        if (!studentID) {
            res.status(400).json(errorCodeToResponse('REGISTER-PRELIM-NO-STUDENT-ID', 'NEW-REGISTER'))
        } else {
            const results = await registerServices.getPrelimDataFromStudentID(studentID)
            res.status(200).json(successCodeToResponse(results, 'REGISTER-PRELIM-STUDENT-ID-SUCCESS', 'NEW-REGISTER'))
        }

    } catch (error) {
        console.log('prelimDataController', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'prelimDataController'))
    }
}

module.exports = {
    prelimDataController
}