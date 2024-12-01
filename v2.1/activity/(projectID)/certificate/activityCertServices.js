require('dotenv').config()
const prisma = require('../../../prisma')

const getCertificateCommonStatus = async (projectID) => {

    const statusSearch = await prisma.projectcertificategeneratestatus.findUnique({
        where: {
            projectID: projectID
        }
    })

    if (!statusSearch) {
        throw {
            code: 'CERTIFICATE-GET-STATUS-FAILED-NO-STATUS-DEFINED',
            desc: { userData: { projectID } },
        }
    } else {

        return {
            certPCPStatus: statusSearch.certPCPStatus,
            certSTFStatus: statusSearch.certSTFStatus,
            updatedDatetime: statusSearch.updatedDatetime
        }

    }
}

const getCertificateUserConsentStatus = async (projectID, studentID) => {

    // get common status
    const status = await getCertificateCommonStatus(projectID)

    // search certificate of user in this project
    // search if user has gen cert before
    try {

        const searchUserCert = await searchCertificateByProjectIDStudentID(projectID, studentID)

        return {
            projectID: projectID,
            certStatus: status,
            certUserAvailable: true,
            certUserData: searchUserCert
        }

    } catch (error) {
        // user not gen cert yet
        return {
            projectID: projectID,
            certStatus: status,
            certUserAvailable: false,
            certUserData: null
        }

    }


}

const searchCertificateByProjectIDStudentID = async (projectID, studentID) => {

    const search = await prisma.projectcertificatelist.findFirst({
        where: {
            studentID: studentID,
            projectID: projectID
        }
    })

    if (!search) {

        throw {
            code: 'CERTIFICATE-GET-CERT-FAILED-NOT-GENERATED',
            desc: { userData: { projectID, studentID } },
        }

    } else {

        return {
            certificateID: search.certificateID,
            studentID: search.studentID,
            projectID: search.projectID,
            certUserType: search.certUserType,
            applicationID: search.applicationID,
            createdDateTime: search.createdDateTime
        }

    }
}

const editCertificateCommonStatus = async (projectID, certPCPStatusEdited, certSTFStatusEdited) => {

    const statusEdit = await prisma.projectcertificategeneratestatus.update({
        where: {
            projectID: projectID
        },
        data: {
            certPCPStatus: certPCPStatusEdited,
            certSTFStatus: certSTFStatusEdited,
            updatedDatetime: new Date()
        }
    })

    return {
        certPCPStatus: statusEdit.certPCPStatus,
        certSTFStatus: statusEdit.certSTFStatus,
        updatedDatetime: statusEdit.updatedDatetime
    }

}


module.exports = {
    getCertificateCommonStatus,
    editCertificateCommonStatus,

    getCertificateUserConsentStatus,

}