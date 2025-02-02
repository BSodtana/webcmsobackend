const { errorCodeToResponse } = require("../../_helpers/errorCodeToResponse");
const { successCodeToResponse } = require("../../_helpers/successCodeToResponse");

const manageFileServices = require('./fileManagerServices')

// todo: permission

// ------ get quota ------
const checkQuotaByUserCon = async (req, res) => {

    try {
        const { studentID = 'NO-STD-ID', uuid } = await req?.userData

        const results = await manageFileServices.checkQuotaByUser(uuid)
        res.status(200).json(successCodeToResponse(results, 'FILE-MANAGER-GET-USER-QUOTA-SUCCESS', uuid))

    } catch (error) {
        console.log('checkQuotaByUserCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'checkQuotaByUserCon'))
    }
}

const checkQuotaByProjectCon = async (req, res) => {

    try {
        const { studentID = 'NO-STD-ID', uuid } = await req?.userData
        const { projectID } = req?.params

        const results = await manageFileServices.checkQuotaByProject(projectID)
        res.status(200).json(successCodeToResponse(results, 'FILE-MANAGER-GET-PROJECT-QUOTA-SUCCESS', projectID))

    } catch (error) {
        console.log('checkQuotaByProjectCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'checkQuotaByProjectCon'))
    }
}

const checkQuotaByOrgCon = async (req, res) => {

    try {
        const { studentID = 'NO-STD-ID', uuid } = await req?.userData
        const { orgID } = req?.params

        const results = await manageFileServices.checkQuotaByOrg(orgID)
        res.status(200).json(successCodeToResponse(results, 'FILE-MANAGER-GET-ORG-QUOTA-SUCCESS', orgID))

    } catch (error) {
        console.log('checkQuotaByOrgCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'checkQuotaByOrgCon'))
    }
}

// ------ list files & info ------
const listAllFilesByUserCon = async (req, res) => {

    try {
        const { studentID = 'NO-STD-ID', uuid } = await req?.userData
        const { page = 1 } = req?.query

        const results = await manageFileServices.listAllFilesPaginationByUser(uuid, page)
        res.status(200).json(successCodeToResponse(results, 'FILE-MANAGER-LIST-FILE-BY-USER-SUCCESS', uuid))

    } catch (error) {
        console.log('listAllFilesByUserCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'listAllFilesByUserCon'))
    }
}

const getSpecificFileInfoUserCon = async (req, res) => {

    try {
        const { studentID = 'NO-STD-ID', uuid } = await req?.userData
        const { fileID } = req?.params

        if (!fileID) {
            res.status(400).json(errorCodeToResponse("FILE-MANAGER-GET-FILE-INFO-NO-ID-ERROR", uuid))
        } else {
            const results = await manageFileServices.getSpecificFileInfo(fileID)
            res.status(200).json(successCodeToResponse(results, 'FILE-MANAGER-GET-FILE-INFO-USER-SUCCESS', uuid))

        }


    } catch (error) {
        console.log('getSpecificFileInfoUserCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getSpecificFileInfoUserCon'))
    }
}


// ------ change file ------
const deleteFileUserCon = async (req, res) => {
    try {

        const { fileID } = req.params
        const { confirm } = req.body
        const { studentID = 'NO-STD-ID', uuid } = await req?.userData

        if (!confirm) {
            res.status(400).json(errorCodeToResponse("DECLINED-CONFIRM-DELETE", fileID, uuid))
        } else {
            const results = await manageFileServices.deleteFilefromFileID(fileID, confirm)
            res.status(200).json(successCodeToResponse(results, 'FILE-MANAGER-DELETE-FILE-USER-SUCCESS', fileID, uuid))

        }

    } catch (error) {
        console.log('deleteFileUserCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'deleteFileUserCon'))
    }
}

const changeFilePublicityUserCon = async (req, res) => {
    try {

        const { fileID } = req.params
        const { publicity } = req.body
        const { studentID = 'NO-STD-ID', uuid } = await req?.userData


        const filePublicity = ['PUBLIC', 'PRIVATE', 'LOGIN_ONLY']
        if (!filePublicity.includes(publicity)) {
            res.status(400).json(errorCodeToResponse("ERROR-DATA-TYPE-FAILED", fileID, publicity, uuid))

        } else {
            const results = await manageFileServices.changeFilePublicityByFileID(fileID, publicity)
            res.status(200).json(successCodeToResponse(results, 'FILE-MANAGER-CHANGE-FILE-PUBLICITY-USER-SUCCESS', fileID, publicity, uuid))

        }
    } catch (error) {
        console.log('changeFilePublicityUserCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'changeFilePublicityUserCon'))
    }
}

module.exports = {
    checkQuotaByUserCon,
    checkQuotaByProjectCon,
    checkQuotaByOrgCon,

    listAllFilesByUserCon,
    getSpecificFileInfoUserCon,
    deleteFileUserCon,
    changeFilePublicityUserCon
}