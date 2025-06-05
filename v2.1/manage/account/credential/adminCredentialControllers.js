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

const adminSetUserEmailPasswordController = async (req, res) => {
    try {

        const { uuid: adminUUID, studentID: adminID } = await req?.userData
        const { studentID, email, password } = req.body

        // first, check if credential for this user is exist
        try {
            const results = await adminCredentialServices.adminSearchUUIDfromStudentID(studentID)
            throw {
                code: 'ADMIN-MANAGE-CREDENTIAL-ADD-NEW-CRED-ERROR-CRED-EXIST',
                desc: { userData: results }
            }
        } catch (error) {

            if (error.code === 'ADMIN-MANAGE-CREDENTIAL-GET-UUID-FAILED-STDID-NOT-EXIST') {
                // if this error = no data exist
                // then create credential for them
                if (!studentID || !email || !password) {
                    res.status(400).json(errorCodeToResponse('NOT-ENOUGH-DATA', `admin-${adminUUID}`))
                } else {
                    const results2 = await adminCredentialServices.adminSetUserEmailPassword(studentID, email, password)
                    res.status(200).json(successCodeToResponse(results2, 'ADMIN-MANAGE-CREDENTIAL-CREATE-NEW-CRED-SUCCESS', `admin-${adminUUID}`, results2?.uuid))
                }
            } else {
                // this is another error for different reason
                throw {
                    code: error.code,
                    desc: error.desc
                }
            }

        }

    } catch (error) {
        console.log('adminSetUserEmailPasswordController', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'adminSetUserEmailPasswordController'))
    }
}


module.exports = {
    adminSearchUUIDfromStudentIDController,
    adminSetUserEmailPasswordController
}