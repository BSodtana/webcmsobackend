require('dotenv').config()
const activityError = require('../../../_helpers/error_text/activityError')
const { getUserBriefPersonalData } = require('../../../account/profile/profileServices')
const prisma = require('../../../prisma')
const { getProjectBriefData } = require('../../../project/(each-project)/eachProjectServices')
const { getDataSpecificPositionID } = require('../../../project/(each-project)/recruitment/(recruitmentID)/eachRCMServices')
const { getDataStaffSpecificPositionID } = require('../../../project/(each-project)/recruitment/(recruitmentID)/position/(positionID)/eachPOSServices')
const checkGenCertLogic = require('./(genCertLogic)/checkGenCertLogic')
const { generateNumberForCertificate } = require('./(genCertLogic)/genNumberCertLogic')

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

const getCertDefaultData = async (projectID) => {

    const defaultSearch = await prisma.projectcertificatedefaultdata.findUnique({
        where: {
            projectID: projectID
        }
    })

    if (!defaultSearch) {
        throw {
            code: 'CERTIFICATE-GET-DEFAULT-DATA-FAILED-NO-DATA',
            desc: { userData: { projectID } },
        }
    } else {

        return {
            teacherNameSignatureTH: defaultSearch.teacherNameSignatureTH,
            teacherNameSignatureEN: defaultSearch.teacherNameSignatureEN,
            teacherPositionSignatureTH: defaultSearch.teacherPositionSignatureTH,
            teacherPositionSignatureEN: defaultSearch.teacherPositionSignatureEN,
            projectOwnerSignatureFileID: defaultSearch.projectOwnerSignatureFileID,
            teacherSignatureFileID: defaultSearch.teacherSignatureFileID,
            certPCPCreatedDate: defaultSearch.certPCPCreatedDate,
            certPCPDefaultDesignType: defaultSearch.certPCPDefaultDesignType,
            certSTFCreatedDate: defaultSearch.certSTFCreatedDate,
            certSTFDefaultDesignType: defaultSearch.certSTFDefaultDesignType,
            updatedDatetime: defaultSearch.updatedDatetime
        }

    }

}

const editCertDefaultData = async (
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
) => {

    const update = await prisma.projectcertificatedefaultdata.upsert({
        where: {
            projectID: projectID
        },
        update: {
            teacherNameSignatureTH: teacherNameSignatureTH,
            teacherNameSignatureEN: teacherNameSignatureEN,
            teacherPositionSignatureTH: teacherPositionSignatureTH,
            teacherPositionSignatureEN: teacherPositionSignatureEN,
            teacherSignatureFileID: teacherSignatureFileID,
            certPCPCreatedDate: certPCPCreatedDate,
            certPCPDefaultDesignType: certPCPDefaultDesignType,
            certSTFCreatedDate: certSTFCreatedDate,
            certSTFDefaultDesignType: certSTFDefaultDesignType,
            updatedDatetime: new Date()
        },
        create: {
            projectID: projectID,
            teacherNameSignatureTH: teacherNameSignatureTH,
            teacherNameSignatureEN: teacherNameSignatureEN,
            teacherPositionSignatureTH: teacherPositionSignatureTH,
            teacherPositionSignatureEN: teacherPositionSignatureEN,
            teacherSignatureFileID: teacherSignatureFileID,
            certPCPCreatedDate: certPCPCreatedDate,
            certPCPDefaultDesignType: certPCPDefaultDesignType,
            certSTFCreatedDate: certSTFCreatedDate,
            certSTFDefaultDesignType: certSTFDefaultDesignType,
            updatedDatetime: new Date()
        }
    })

    return {
        teacherNameSignatureTH: update.teacherNameSignatureTH,
        teacherNameSignatureEN: update.teacherNameSignatureEN,
        teacherPositionSignatureTH: update.teacherPositionSignatureTH,
        teacherPositionSignatureEN: update.teacherPositionSignatureEN,
        teacherSignatureFileID: update.teacherSignatureFileID,
        certPCPCreatedDate: update.certPCPCreatedDate,
        certPCPDefaultDesignType: update.certPCPDefaultDesignType,
        certSTFCreatedDate: update.certSTFCreatedDate,
        certSTFDefaultDesignType: update.certSTFDefaultDesignType,
        updatedDatetime: update.updatedDatetime
    }

}

const changeCertCommonStatusWithRules = async (projectID, certPCPStatusEdited, certSTFStatusEdited) => {

    // todo: add logic to check Rules b4 changeing status

    const data = await editCertificateCommonStatus(projectID, certPCPStatusEdited, certSTFStatusEdited)

    return data
}

const generateCertForUser = async (studentID, projectID, forced = false) => {

    // check if this user already has cert

    try {
        const search = await searchCertificateByProjectIDStudentID(projectID, studentID)


        // if not error = already has cert = return cert num and link for download
        return {
            certificateID: search.certificateID,
            linkToDownload: ""
        }

    } catch (error) {

        // if error = not generate cert yet = gen and sent download link

        // list for check if user can download cert
        // 1 user join activity and has role data
        // 2 user do evaluation form
        // 3 that form has percent pass treshold -todo
        // 4 owner allow to download


        const checkList = [
            await checkGenCertLogic.checkIfUserJoinedProject(studentID, projectID),
            await checkGenCertLogic.checkIfUserDidEvaluationForm(studentID, projectID),
            true,
            await checkIfOwnerAllowedUserToDL(studentID, projectID)
        ]

        console.log('gencert checkList', checkList);

        const dictDesc = [
            {
                "textTH": "ผู้ใช้ไม่ได้ลงทะเบียนกิจกรรมนี้",
                "textEN": "This student didn't join this activity",
            },
            {
                "textTH": "ผู้ใช้ยังไม่ได้ประเมินกิจกรรม",
                "textEN": "This student hasn't evaluated this activity yet",
            },
            {
                "textTH": "ผู้เข้าร่วมยังประเมินกิจกรรมไม่ถึงที่กำหนดไว้",
                "textEN": "Evaluation not met criteria",
            },
            {
                "textTH": "เจ้าของกิจกรรมยังไม่เปิดให้ดาวน์โหลดเกียรติบัตร",
                "textEN": "Download a certificate is not allowed (yet)",
            }
        ]

        // check if can regis?
        const isNotAllowedGenerate = checkList.includes(false)
        const reason = dictDesc.filter((d, ind) => !checkList[ind])

        if (!forced && isNotAllowedGenerate) {
            throw {
                code: 'GENERATE-CERTIFICATE-FAILED-NOT-MEET-CRITERIA',
                desc: { userData: { studentID, projectID, }, reason }
            }
        } else {

            // generate join id

            const createCertNo = await generateNumberForCertificate(projectID)
            const getUserData = await checkGenCertLogic.checkIfUserJoinedProject(studentID, projectID, true)
            const getUserApplicationID = getUserData.as === 'PCP' ? getUserData.data.participantApplicationID :
                getUserData.data.staffApplicationID

            console.log('createCertNo', createCertNo);
            console.log('getUserData', getUserData);
            console.log('getUserApplicationID', getUserApplicationID);

            const newCert = await prisma.projectcertificatelist.create({
                data: {
                    certificateID: createCertNo,
                    studentID: studentID,
                    projectID: projectID,
                    certUserType: getUserData.as,
                    applicationID: getUserApplicationID,
                    updatedDatetime: new Date()
                }
            })

            return {
                certificateID: newCert.certificateID,
                linkToDownload: ""
            }



        }

    }




}


const getInfoFromCertNo = async (certID) => {
    const data = await prisma.projectcertificatelist.findUnique({
        where: {
            certificateID: certID
        }
    })

    if (!data) {
        // no data
        throw {
            code: 'CERTIFICATE-INFO-GET-DATA-FAILED-NO-DATA',
            desc: { userData: { certID } },
        }
    } else {

        // get user data
        const userData = await getUserBriefPersonalData(data.studentID)

        // get project data
        const projectData = await getProjectBriefData(data.projectID)

        let STFpositionDetail = {}
        let PCPpositionDetail = {}
        // check if user is stf or pcp
        if (data.certUserType.includes('STF')) {
            // user is stf -> get position detail
            STFpositionDetail = await getSTFDataFromApplicationID(data.applicationID)
        } else if (data.certUserType.includes('PCP')) {
            // user is pcp -> get pcp detail
            PCPpositionDetail = await getPCPDataFromApplicationID(data.applicationID)
        } else {
            STFpositionDetail = await getSTFDataFromApplicationID(data.applicationID)
        }

        // get this this activity cert data
        const certCommonData = await getCertDefaultData(data.projectID)



        // construct output data
        const output = {
            userData,
            projectData,
            certUserType: data.certUserType,
            PCPpositionDetail,
            STFpositionDetail,
            certCommonData

        }
        return output
    }
}

// ------ logic for check allowed to generate -----
const checkIfOwnerAllowedUserToDL = async (studentID, projectID) => {

    const userRole = await checkGenCertLogic.checkIfUserJoinedProject(studentID, projectID, true)
    const getCertStatus = await getCertificateCommonStatus(projectID)

    if ((userRole.as === 'PCP') && (getCertStatus.certPCPStatus === 'READY')) {
        return true
    } else if ((userRole.as === 'STF') && (getCertStatus.certSTFStatus === 'READY')) {
        return true
    } else {
        return false
    }
}

// --- logic to get user data from application id ---

const getSTFDataFromApplicationID = async (staffApplicationID) => {
    const data = await prisma.projectstaffs.findUnique({
        where: {
            staffApplicationID: staffApplicationID
        }
    })

    if (!data) {
        throw {
            code: 'GET-STAFF-APPLICATION-ID-DATA-FAILED-NO-DATA',
            desc: { userData: { staffApplicationID } },
        }
    } else {
        // get position data
        const posData = await getDataStaffSpecificPositionID(data.positionID)
        return {
            applicationID: data.staffApplicationID,
            recruitID: data.recruitID,
            positionID: data.positionID,
            studentID: data.studentID,
            createdDateTime: data.createdDateTime,
            positionData: {
                staffPositionID: posData.staffPositionID,
                positionName: posData.positionName,
            }
        }
    }
}

const getPCPDataFromApplicationID = async (participantApplicationID) => {
    const data = await prisma.projectparticipants.findUnique({
        where: {
            participantApplicationID: participantApplicationID
        }
    })

    if (!data) {
        throw {
            code: 'GET-PARTICIPANT-APPLICATION-ID-DATA-FAILED-NO-DATA',
            desc: { userData: { participantApplicationID } },
        }
    } else {

        return {
            applicationID: data.participantApplicationID,
            recruitID: data.recruitID,
            studentID: data.studentID,
            createdDateTime: data.createdDateTime
        }
    }
}


module.exports = {
    getCertificateCommonStatus,
    editCertificateCommonStatus,

    getCertificateUserConsentStatus,
    searchCertificateByProjectIDStudentID,

    getCertDefaultData,
    editCertDefaultData,

    changeCertCommonStatusWithRules,

    generateCertForUser,

    getInfoFromCertNo
}