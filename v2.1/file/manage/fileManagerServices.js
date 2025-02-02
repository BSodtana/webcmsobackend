require('dotenv').config()
const prisma = require('../../prisma')
const fs = require('fs')

const { getCurrentSizeAndUpdateQuotaUser, getCurrentSizeAndUpdateQuotaProject, getCurrentSizeAndUpdateQuotaOrg, getFileInfoFromDB, deleteFileIDFromDB } = require('../fileServices')


// ------ check quota ------
const checkQuotaByUser = async (uuid) => {
    const data = await getCurrentSizeAndUpdateQuotaUser(uuid)
    return data
}


const checkQuotaByProject = async (projectID) => {
    const data = await getCurrentSizeAndUpdateQuotaProject(projectID)
    return data
}


const checkQuotaByOrg = async (orgID) => {
    const data = await getCurrentSizeAndUpdateQuotaOrg(orgID)
    return data
}


// ------ list file ------


const listAllFilesPaginationByUser = async (uuid, page = 1) => {

    const numEachPage = 50

    // count max page
    const countListFiles = await prisma.uploadedfiledata.count({
        where: {
            fileRelatedType: 'USER',
            fileRelatedTypeID: uuid
        }
    })

    const listFiles = await prisma.uploadedfiledata.findMany({
        skip: (page - 1) * numEachPage,
        take: numEachPage,
        where: {
            fileRelatedType: 'USER',
            fileRelatedTypeID: uuid
        },
        select: {
            fileID: true,
            fileOriginalName: true,
            fileUploadDatetime: true,
            fileUploadByUUID: true,
            fileSize: true,
            filePublicity: true,
            fileUploadedReason: true
        }
    })

    return {
        fileList: listFiles,
        pagination: {
            nowPage: page,
            lastPage: Math.ceil(countListFiles / numEachPage),
            maxEachPage: numEachPage
        }
    }
}

const listAllFilesPaginationByProject = async (projectID, page = 1) => {

    const numEachPage = 50

    // count max page
    const countListFiles = await prisma.uploadedfiledata.count({
        where: {
            fileRelatedType: 'PROJECT',
            fileRelatedTypeID: projectID
        }
    })

    const listFiles = await prisma.uploadedfiledata.findMany({
        skip: (page - 1) * numEachPage,
        take: numEachPage,
        where: {
            fileRelatedType: 'PROJECT',
            fileRelatedTypeID: projectID
        },
        select: {
            fileID: true,
            fileOriginalName: true,
            fileUploadDatetime: true,
            fileUploadByUUID: true,
            fileSize: true,
            filePublicity: true,
            fileUploadedReason: true
        }
    })

    return {
        fileList: listFiles,
        pagination: {
            nowPage: page,
            lastPage: Math.ceil(countListFiles / numEachPage),
            maxEachPage: numEachPage,
            fileCount: countListFiles
        }
    }
}

// ----- chenge file ------

const getSpecificFileInfo = async (fileID) => {

    const search = await prisma.uploadedfiledata.findUniqueOrThrow({
        where: {
            fileID: fileID
        },
        select: {
            fileID: true,
            fileOriginalName: true,
            fileUploadDatetime: true,
            fileUploadByUUID: true,
            fileRelatedType: true,
            fileRelatedTypeID: true,
            fileSize: true,
            filePublicity: true,
            fileUploadedReason: true
        }
    })

    return search

}

const deleteFilefromFileID = async (fileID, confirm = false) => {

    const fileData = await getFileInfoFromDB(fileID)

    if (confirm) {
        try {
            // del data from file
            fs.unlinkSync(fileData.filePathNow)

            // del data from table
            deleteFileIDFromDB(fileID)

            return {
                success: true
            }
        } catch (error) {
            console.log('[del file error]', error);

            throw {
                desc: { userData: { fileID, confirm } }
            }
        }
    } else {
        throw {
            code: 'INTERNAL-ERROR',
            desc: { userData: { fileID, confirm } }
        }
    }

}

const changeFilePublicityByFileID = async (fileID, publicity = 'PRIVATE') => {

    const fileInfo = await getSpecificFileInfo(fileID)

    const change = await prisma.uploadedfiledata.update({
        where: {
            fileID: fileID
        },
        data: {
            filePublicity: publicity
        }
    })

    return await getSpecificFileInfo(fileID)

}



module.exports = {
    checkQuotaByOrg,

    // ------ USER ------
    checkQuotaByUser,
    listAllFilesPaginationByUser,
    getSpecificFileInfo,
    deleteFilefromFileID,
    changeFilePublicityByFileID,

    // ------ PROJECT ------
    checkQuotaByProject,
    listAllFilesPaginationByProject
}