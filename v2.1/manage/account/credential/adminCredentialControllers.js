const { errorCodeToResponse } = require("../../../_helpers/errorCodeToResponse")
const { successCodeToResponse } = require("../../../_helpers/successCodeToResponse")

// adminCredentialServices
const adminCredentialServices = require('./adminCredentialServices')

const adminSearchUUIDfromStudentIDController = async (req, res) => {
    try {

        const { uuid, studentID: adminID } = await req?.userData
        const { studentID = '' } = req.query

        const results = await adminCredentialServices.adminSearchUUIDfromStudentID(studentID)
        res.status(200).json(successCodeToResponse(results, 'ADMIN-MANAGE-CREDENTIAL-GET-UUID-SUCCESS', `admin-${uuid}`, results.studentID))


    } catch (error) {
        console.log('adminSearchUUIDfromStudentIDController', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'adminSearchUUIDfromStudentIDController'))
    }
}


module.exports = {
    adminSearchUUIDfromStudentIDController,
}