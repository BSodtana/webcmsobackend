const { errorCodeToResponse } = require("../_helpers/errorCodeToResponse")
const { filePublicityType, fileRelatedTypeType, uploadedReasonList } = require("../_helpers/file_upload/uploadedReason")
const { successCodeToResponse } = require("../_helpers/successCodeToResponse")
const { getUserFullCredentialData } = require("../account/profile/profileServices")
const { getSpecificOrgDetails } = require("../common/organization/(orgID)/eachOrgServices")
const { getUsersInSpecifigOrg } = require("../organization/users/orgUsersServices")
const { getAllPCPInProject, getAllSTFInProject } = require("../project/(each-project)/(allPCPLogic)/allPCPLogic")
const { getProjectBriefData } = require("../project/(each-project)/eachProjectServices")
const fileServices = require("./fileServices")

const uploadFileCon = async (req, res) => {

    const {
        studentID = 'NO-STD-ID',
        uuid
    } = await req?.userData

    // you need to specify this specific data in header (only for upload)
    req.fileReason = {}

    const fileUploadedReason = req?.get('fileUploadedReason')
    req.fileReason['fileUploadedReason'] = fileUploadedReason

    const fileRelatedTypeID = req?.get('fileRelatedTypeID')
    req.fileReason['fileRelatedTypeID'] = fileRelatedTypeID


    try {

        if (!Object.keys(uploadedReasonList).includes(fileUploadedReason)) {
            res.status(400).json(errorCodeToResponse("UPLOAD-FILE-ERROR-UNACCEPTED-REASON", uuid, fileUploadedReason))
        } else {

            if (!fileRelatedTypeID) {
                res.status(400).json(errorCodeToResponse("UPLOAD-FILE-ERROR-UNKNOWN-DESTINATION", fileRelatedTypeID))
            } else {

                // get & set default flle reason data
                const defaultData = uploadedReasonList[fileUploadedReason]

                req.fileReason['fileRelatedType'] = defaultData?.defaultFileRelatedType || 'USER'
                req.fileReason['fileRelatedTypeID'] = defaultData?.defaultFileRelatedType === 'USER' ? uuid : req.fileReason['fileRelatedTypeID']
                req.fileReason['filePublicity'] = defaultData?.defaultFilePublicity || 'PRIVATE'

                console.log(
                    '[data]',
                    req.fileReason['fileRelatedType'],
                    req.fileReason['fileRelatedTypeID'],
                    req.fileReason['filePublicity']
                );


                if (req.fileReason['fileRelatedType'] === 'PROJECT') {
                    // if type = PROJECT, it needs to exist and owners' upload only
                    console.log('[upload project]', await getProjectBriefData(fileRelatedTypeID).studentID);

                    if ((await getProjectBriefData(fileRelatedTypeID))?.studentID != studentID) {
                        res.status(403).json(errorCodeToResponse("UPLOAD-FILE-ERROR-ACCESS-DENIED", fileRelatedTypeID, studentID))
                    } else {
                        const uploadResult = await fileServices.uploadFileService(req, res)
                        res.status(200).json(successCodeToResponse(uploadResult, 'UPLOAD-FILE-SUCCESS', uuid, fileUploadedReason))
                    }

                } else if (req.fileReason['fileRelatedType'] === 'ORG') {
                    // if type = ORG, it needs to exist and owners' upload only
                    console.log('[upload ORG]', (await getSpecificOrgDetails(fileRelatedTypeID)), studentID, (await getSpecificOrgDetails(fileRelatedTypeID))?.orgOwnerStudentID == studentID);

                    if ((await getSpecificOrgDetails(fileRelatedTypeID))?.studentID != studentID) {
                        res.status(403).json(errorCodeToResponse("UPLOAD-FILE-ERROR-ACCESS-DENIED", fileRelatedTypeID, studentID))
                    } else {
                        const uploadResult = await fileServices.uploadFileService(req, res)
                        res.status(200).json(successCodeToResponse(uploadResult, 'UPLOAD-FILE-SUCCESS', uuid, fileUploadedReason))
                    }

                } else if (req.fileReason['fileRelatedType'] === 'PUBLIC') {
                    // if type = PUBLIC, roles need to be matched

                    if (!['ADMIN', 'PRES', 'STAFF'].includes((await getUserFullCredentialData(studentID)).role)) {
                        res.status(403).json(errorCodeToResponse("UPLOAD-FILE-ERROR-ACCESS-DENIED", fileRelatedTypeID, studentID))
                    } else {
                        const uploadResult = await fileServices.uploadFileService(req, res)
                        res.status(200).json(successCodeToResponse(uploadResult, 'UPLOAD-FILE-SUCCESS', uuid, fileUploadedReason))
                    }
                }
                else {
                    // if type = USER
                    const uploadResult = await fileServices.uploadFileService(req, res)
                    res.status(200).json(successCodeToResponse(uploadResult, 'UPLOAD-FILE-SUCCESS', uuid, fileUploadedReason))
                }

            }

        }

    } catch (error) {
        console.log('uploadFileCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'uploadFileCon'))
    }
}

const getFileCon = async (req, res) => {

    try {

        const {
            studentID = 'NO-STD-ID',
            uuid
        } = await req?.userData

        const allowedAction = ['download', 'view']

        let { fileID, action } = req?.query

        if (!allowedAction.includes(action)) {
            res.status(400).json(errorCodeToResponse("VIEW-FILE-ERROR-TYPE-ERROR", fileID, action))
        } else {

            // search for permission first
            const searchData = await fileServices.getFileInfoFromDB(fileID)

            if (searchData.filePublicity === 'PUBLIC') {
                // public file are allowed to access, even though not login
                const fileSearch = await fileServices.serveFileFromFileID(fileID)

                if (action === 'view') {
                    res.sendFile(fileSearch);
                } else {
                    res.download(fileSearch);
                }

            } else if (searchData.filePublicity === 'LOGIN_ONLY' && !!uuid && !!studentID) {

                // user need to login first, check by uuid and studentID

                if (searchData.fileRelatedType === 'USER' && (searchData.fileRelatedTypeID == uuid)) {
                    // user need to match to see this file
                    const fileSearch = await fileServices.serveFileFromFileID(fileID)

                    if (action === 'view') {
                        res.sendFile(fileSearch);
                    } else {
                        res.download(fileSearch);
                    }
                } else if (searchData.fileRelatedType === 'ORG' && ((await getUsersInSpecifigOrg(searchData.fileRelatedTypeID)).some((each) => each.studentID == studentID))) {
                    // to see org file, user need to be in that org
                    const fileSearch = await fileServices.serveFileFromFileID(fileID)

                    if (action === 'view') {
                        res.sendFile(fileSearch);
                    } else {
                        res.download(fileSearch);
                    }
                } else if (searchData.fileRelatedType === 'PROJECT'
                    && (
                        ((await getAllPCPInProject(searchData.fileRelatedTypeID)).some((each) => each.studentID == studentID))
                        || ((await getAllSTFInProject(searchData.fileRelatedTypeID)).some((each) => each.studentID == studentID))
                    )) {
                    //  to see project file, user need to be joined this activity (as pcp or stf)
                    const fileSearch = await fileServices.serveFileFromFileID(fileID)

                    if (action === 'view') {
                        res.sendFile(fileSearch);
                    } else {
                        res.download(fileSearch);
                    }
                } else {
                    // else access denied
                    throw {
                        code: 'ACCESS-DENIED-ROLE',
                        desc: {
                            userData: {
                                uuid,
                                studentID,
                                fileID, action
                            },
                        }
                    }
                }



            } else if (searchData.filePublicity === 'PRIVATE' && !!uuid && !!studentID) {

                // user need to login first, check by uuid and studentID
                if (searchData.fileRelatedType === 'USER' && (searchData.fileRelatedTypeID == uuid)) {
                    // user need to match to see this file
                    const fileSearch = await fileServices.serveFileFromFileID(fileID)

                    if (action === 'view') {
                        res.sendFile(fileSearch);
                    } else {
                        res.download(fileSearch);
                    }
                } else if (searchData.fileRelatedType === 'ORG' && ((await getSpecificOrgDetails(searchData.fileRelatedTypeID)).studentID == studentID)) {
                    // to see org file, user need to be org owner
                    const fileSearch = await fileServices.serveFileFromFileID(fileID)

                    if (action === 'view') {
                        res.sendFile(fileSearch);
                    } else {
                        res.download(fileSearch);
                    }
                } else if (searchData.fileRelatedType === 'PROJECT' && ((await getProjectBriefData(searchData.fileRelatedTypeID)).studentID == studentID)) {
                    //  to see project file, user need to be project owner
                    const fileSearch = await fileServices.serveFileFromFileID(fileID)

                    if (action === 'view') {
                        res.sendFile(fileSearch);
                    } else {
                        res.download(fileSearch);
                    }
                } else {
                    // else access denied
                    throw {
                        code: 'ACCESS-DENIED-ROLE',
                        desc: {
                            userData: {
                                uuid,
                                studentID, fileID, action
                            },
                        }
                    }
                }

            } else {
                // else access denied
                throw {
                    code: 'ACCESS-DENIED-ROLE',
                    desc: {
                        userData: {
                            uuid,
                            studentID, fileID, action
                        },
                    }
                }
            }

        }
    } catch (error) {
        console.log('getFileCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getFileCon'))
    }
}


// const getAnnouncementListController = async (req, res) => {
//     try {

//         const { studentID = 'NO-STD-ID' } = await req?.userData

//         const results = await projectServices.getAnnouncementList()
//         res.status(200).json(successCodeToResponse(results, 'GET-GLOBAL-ANNOUNCEMENT-SUCCESS', studentID))


//     } catch (error) {
//         console.log('getAnnouncementListController', error)
//         res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getAnnouncementListController'))
//     }
// }


module.exports = {
    uploadFileCon,
    getFileCon
}