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

const listAllFilesByProjectCon = async (req, res) => {

    try {
        const { studentID = 'NO-STD-ID', uuid } = await req?.userData
        const { page = 1 } = req?.query
        const { projectID } = req.params


        const results = await manageFileServices.listAllFilesPaginationByProject(projectID, page)
        res.status(200).json(successCodeToResponse(results, 'FILE-MANAGER-LIST-FILE-BY-PROJECT-SUCCESS', projectID, page))

    } catch (error) {
        console.log('listAllFilesByProjectCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'listAllFilesByProjectCon'))
    }
}

const getSpecificFileInfoProjectCon = async (req, res) => {

    try {
        const { studentID = 'NO-STD-ID', uuid } = await req?.userData
        const { fileID, projectID } = req?.params

        if (!fileID || !projectID) {
            res.status(400).json(errorCodeToResponse("FILE-MANAGER-GET-FILE-INFO-NO-ID-ERROR", uuid, fileID, projectID))
        } else {
            const results = await manageFileServices.getSpecificFileInfo(fileID)
            res.status(200).json(successCodeToResponse(results, 'FILE-MANAGER-GET-FILE-INFO-PROJECT-SUCCESS', uuid, fileID, projectID))
        }

    } catch (error) {
        console.log('getSpecificFileInfoProjectCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getSpecificFileInfoProjectCon'))
    }
}

const listAllFilesByOrgCon = async (req, res) => {

    try {
        const { studentID = 'NO-STD-ID', uuid } = await req?.userData
        const { page = 1 } = req?.query
        const { orgID } = req.params

        const results = await manageFileServices.listAllFilesPaginationByOrg(orgID, page)
        res.status(200).json(successCodeToResponse(results, 'FILE-MANAGER-LIST-FILE-BY-ORG-SUCCESS', uuid, orgID))

    } catch (error) {
        console.log('listAllFilesByOrgCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'listAllFilesByOrgCon'))
    }
}

const getSpecificFileInfoOrgCon = async (req, res) => {

    try {
        const { studentID = 'NO-STD-ID', uuid } = await req?.userData
        const { fileID, orgID } = req?.params

        if (!fileID || !orgID) {
            res.status(400).json(errorCodeToResponse("FILE-MANAGER-GET-FILE-INFO-NO-ID-ERROR", uuid, fileID, orgID))
        } else {
            const results = await manageFileServices.getSpecificFileInfo(fileID)
            res.status(200).json(successCodeToResponse(results, 'FILE-MANAGER-GET-FILE-INFO-ORG-SUCCESS', uuid, fileID, orgID))
        }

    } catch (error) {
        console.log('getSpecificFileInfoOrgCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getSpecificFileInfoOrgCon'))
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

const deleteFileProjectCon = async (req, res) => {
    try {

        const { fileID, projectID } = req.params
        const { confirm } = req.body
        const { studentID = 'NO-STD-ID', uuid } = await req?.userData

        if (!confirm) {
            res.status(400).json(errorCodeToResponse("DECLINED-CONFIRM-DELETE", uuid, projectID, fileID))
        } else {
            const results = await manageFileServices.deleteFilefromFileID(fileID, confirm)
            res.status(200).json(successCodeToResponse(results, 'FILE-MANAGER-DELETE-FILE-PROJECT-SUCCESS', uuid, projectID, fileID))

        }

    } catch (error) {
        console.log('deleteFileProjectCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'deleteFileProjectCon'))
    }
}

const changeFilePublicityProjectCon = async (req, res) => {
    try {

        const { fileID, projectID } = req.params
        const { publicity } = req.body
        const { studentID = 'NO-STD-ID', uuid } = await req?.userData


        const filePublicity = ['PUBLIC', 'PRIVATE', 'LOGIN_ONLY']
        if (!filePublicity.includes(publicity)) {
            res.status(400).json(errorCodeToResponse("ERROR-DATA-TYPE-FAILED", fileID, publicity, uuid))
        } else {
            const results = await manageFileServices.changeFilePublicityByFileID(fileID, publicity)
            res.status(200).json(successCodeToResponse(results, 'FILE-MANAGER-CHANGE-FILE-PUBLICITY-PROJECT-SUCCESS', fileID, publicity, uuid))

        }
    } catch (error) {
        console.log('changeFilePublicityProjectCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'changeFilePublicityProjectCon'))
    }
}

const deleteFileOrgCon = async (req, res) => {
    try {

        const { fileID, orgID } = req.params
        const { confirm } = req.body
        const { studentID = 'NO-STD-ID', uuid } = await req?.userData

        if (!confirm) {
            res.status(400).json(errorCodeToResponse("DECLINED-CONFIRM-DELETE", uuid, orgID, fileID))
        } else {
            const results = await manageFileServices.deleteFilefromFileID(fileID, confirm)
            res.status(200).json(successCodeToResponse(results, 'FILE-MANAGER-DELETE-FILE-PROJECT-SUCCESS', uuid, orgID, fileID))

        }

    } catch (error) {
        console.log('deleteFileOrgCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'deleteFileOrgCon'))
    }
}

const changeFilePublicityOrgCon = async (req, res) => {
    try {

        const { fileID, orgID } = req.params
        const { publicity } = req.body
        const { studentID = 'NO-STD-ID', uuid } = await req?.userData


        const filePublicity = ['PUBLIC', 'PRIVATE', 'LOGIN_ONLY']
        if (!filePublicity.includes(publicity)) {
            res.status(400).json(errorCodeToResponse("ERROR-DATA-TYPE-FAILED", fileID, publicity, uuid))
        } else {
            const results = await manageFileServices.changeFilePublicityByFileID(fileID, publicity)
            res.status(200).json(successCodeToResponse(results, 'FILE-MANAGER-CHANGE-FILE-PUBLICITY-PROJECT-SUCCESS', fileID, publicity, uuid))

        }
    } catch (error) {
        console.log('changeFilePublicityOrgCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'changeFilePublicityOrgCon'))
    }
}

module.exports = {

    // ------ USER ------
    checkQuotaByUserCon,
    listAllFilesByUserCon,
    getSpecificFileInfoUserCon,
    deleteFileUserCon,
    changeFilePublicityUserCon,

    // ------ PROJECT ------
    checkQuotaByProjectCon,
    listAllFilesByProjectCon,
    getSpecificFileInfoProjectCon,
    deleteFileProjectCon,
    changeFilePublicityProjectCon,

    // ------ ORG ------
    checkQuotaByOrgCon,
    listAllFilesByOrgCon,
    getSpecificFileInfoOrgCon,
    deleteFileOrgCon,
    changeFilePublicityOrgCon
}