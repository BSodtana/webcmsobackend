const { errorCodeToResponse } = require('../../../_helpers/errorCodeToResponse')
const { successCodeToResponse } = require('../../../_helpers/successCodeToResponse')
const activityCertServices = require('./activityCertServices')

const getCertStatusPCPCon = async (req, res) => {

    try {

        const { studentID = 'NO-STD-ID' } = await req?.userData
        const { projectID } = req.params

        const results = await activityCertServices.getCertificateUserConsentStatus(projectID, studentID)
        res.status(200).json(successCodeToResponse(results, 'CERTIFICATE-GET-USER-STATUS-SUCCESS', projectID, studentID))


    } catch (error) {
        console.log('certStatusPCPCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'certStatusPCPCon'))


    }
}


const editCertStatusCon = async (req, res) => {

    try {

        const { studentID = 'NO-STD-ID' } = await req?.userData
        const { projectID } = req.params
        const { certPCPStatus, certSTFStatus } = req.body

        // check if each status is specific type/word

        if (!((typeof (certPCPStatus) === 'undefined') || ['DISABLED', 'NOT_READY', 'REQ_NOT_MEET', 'READY'].includes(certPCPStatus))) {

            // certPCPStatus is not undefined or specific status
            res.status(400).json(errorCodeToResponse("ERROR-DATA-TYPE-FAILED", projectID, certPCPStatus))


        } else if (!((typeof (certSTFStatus) === 'undefined') || ['DISABLED', 'NOT_READY', 'REQ_NOT_MEET', 'READY'].includes(certSTFStatus))) {

            // certSTFStatus is not undefined or specific status
            res.status(400).json(errorCodeToResponse("ERROR-DATA-TYPE-FAILED", projectID, certSTFStatus))

        } else {

            // type of both are correct
            const results = await activityCertServices.editCertificateCommonStatus(projectID, certPCPStatus, certSTFStatus)
            res.status(200).json(successCodeToResponse(results, 'CERTIFICATE-EDIT-CERT-STATUS-SUCCESS', projectID, studentID))

        }



    } catch (error) {
        console.log('editCertStatusCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'editCertStatusCon'))


    }
}

    } catch (error) {
        console.log('checkInBulkCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'checkInBulkCon'))

    }
}



module.exports = {
    getCertStatusPCPCon,
    editCertStatusCon,

}