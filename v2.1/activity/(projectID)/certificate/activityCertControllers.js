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

const getCertDefaultDataCon = async (req, res) => {

    try {

        const { studentID = 'NO-STD-ID' } = await req?.userData
        const { projectID } = req.params

        const results = await activityCertServices.getCertDefaultData(projectID)
        res.status(200).json(successCodeToResponse(results, 'CERTIFICATE-GET-USER-STATUS-SUCCESS', projectID, studentID))


    } catch (error) {
        console.log('getCertDefaultDataCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getCertDefaultDataCon'))

    }
}

const editCertDefaultDataCon = async (req, res) => {

    try {

        const { studentID = 'NO-STD-ID' } = await req?.userData
        const { projectID } = req.params
        const {
            teacherNameSignatureTH,
            teacherNameSignatureEN,
            teacherPositionSignatureTH,
            teacherPositionSignatureEN,
            teacherSignatureFileID,
            certPCPCreatedDate,
            certPCPDefaultDesignType,
            certSTFCreatedDate,
            certSTFDefaultDesignType
        } = req.body

        // check if each status is specific type/word

        if (!((typeof (certPCPDefaultDesignType) === 'undefined') || ['PCP_TH', 'PCP_EN'].includes(certPCPDefaultDesignType))) {

            // certPCPDefaultDesignType is not undefined or specific status
            res.status(400).json(errorCodeToResponse("ERROR-DATA-TYPE-FAILED", projectID, certPCPDefaultDesignType))


        } else if (!((typeof (certSTFDefaultDesignType) === 'undefined') || ['STF_TH', 'STF_EN'].includes(certSTFDefaultDesignType))) {

            // certSTFDefaultDesignType is not undefined or specific status
            res.status(400).json(errorCodeToResponse("ERROR-DATA-TYPE-FAILED", projectID, certSTFDefaultDesignType))

        } else {

            // type of both are correct
            const results = await activityCertServices.editCertDefaultData(
                projectID,
                teacherNameSignatureTH,
                teacherNameSignatureEN,
                teacherPositionSignatureTH,
                teacherPositionSignatureEN,
                teacherSignatureFileID,
                certPCPCreatedDate,
                certPCPDefaultDesignType,
                certSTFCreatedDate,
                certSTFDefaultDesignType
            )
            res.status(200).json(successCodeToResponse(results, 'CERTIFICATE-EDIT-DEFAULT-DATA-SUCCESS', projectID, studentID))

        }


    } catch (error) {
        console.log('editCertDefaultDataCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'editCertDefaultDataCon'))


    }
}

const editCertStatusWithConsentCon = async (req, res) => {

    try {

        const { studentID = 'NO-STD-ID' } = await req?.userData
        const { projectID } = req.params
        const { certPCPStatus, certSTFStatus, confirm } = req.body

        // check if each status is specific type/word

        if (!((typeof (certPCPStatus) === 'undefined') || ['DISABLED', 'NOT_READY', 'REQ_NOT_MEET', 'READY'].includes(certPCPStatus))) {

            // certPCPStatus is not undefined or specific status
            res.status(400).json(errorCodeToResponse("ERROR-DATA-TYPE-FAILED", projectID, certPCPStatus))


        } else if (!((typeof (certSTFStatus) === 'undefined') || ['DISABLED', 'NOT_READY', 'REQ_NOT_MEET', 'READY'].includes(certSTFStatus))) {

            // certSTFStatus is not undefined or specific status
            res.status(400).json(errorCodeToResponse("ERROR-DATA-TYPE-FAILED", projectID, certSTFStatus))

        } else if (confirm === true) {

            // type of both are correct
            const results = await activityCertServices.changeCertCommonStatusWithRules(projectID, certPCPStatus, certSTFStatus)
            res.status(200).json(successCodeToResponse(results, 'CERTIFICATE-EDIT-CERT-STATUS-SUCCESS', projectID, studentID))

        } else {

            res.status(400).json(errorCodeToResponse("DECLINED-CONFIRM", projectID, { certPCPStatus, certSTFStatus, confirm }))

        }



    } catch (error) {
        console.log('editCertStatusWithConsentCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'editCertStatusWithConsentCon'))


    }
}

const generateCertForUserCon = async (req, res) => {

    try {

        const { studentID = 'NO-STD-ID' } = await req?.userData
        const { projectID } = req.params
        const { confirm } = req.body

        if (!confirm) {
            res.status(400).json(errorCodeToResponse("DECLINED-CONFIRM", projectID, { confirm }))

        } else {
            const results = await activityCertServices.generateCertForUser(studentID, projectID, false)
            res.status(200).json(successCodeToResponse(results, 'CERTIFICATE-GENERATE-SUCCESS', projectID, studentID))
        }


    } catch (error) {
        console.log('generateCertForUserCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'generateCertForUserCon'))

    }
}

const getCertInfoDataCon = async (req, res) => {

    try {

        // const { studentID = 'NO-STD-ID' } = await req?.userData
        const { certID } = req.params

        const results = await activityCertServices.getInfoFromCertNo(certID)
        res.status(200).json(successCodeToResponse(results, 'CERTIFICATE-INFO-GET-DATA-SUCCESS', certID))


    } catch (error) {
        console.log('getCertInfoDataCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getCertInfoDataCon'))


    }
}

module.exports = {
    getCertStatusPCPCon,
    editCertStatusCon,

    getCertDefaultDataCon,
    editCertDefaultDataCon,

    editCertStatusWithConsentCon,

    generateCertForUserCon,

    getCertInfoDataCon
}