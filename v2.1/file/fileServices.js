require('dotenv').config()
const prisma = require('../prisma')
const multer = require('multer')
const nanoid = require('nanoid')
const fs = require('fs')
const nanoid2 = nanoid.customAlphabet('123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 16)

const path = require('path')
const { filePublicityType, uploadedReasonList } = require('../_helpers/file_upload/uploadedReason')
const allowedFileType = require('../_helpers/file_upload/allowedFileType')

// default value
const maxFileSizeMB = 5

const storage = multer.diskStorage({
    destination: function (req, file, callback) {

        // check req if the file needed to upload where 
        const {
            uuid
        } = req?.userData

        const {
            fileRelatedType,
            fileRelatedTypeID,
            filePublicity,
            fileUploadedReason
        } = req?.fileReason

        let path = ""

        switch (fileRelatedType) {
            case 'USER':
                path = `./user_upload/user/${uuid}`
                break;
            case 'PROJECT':
                path = `./user_upload/project/${fileRelatedTypeID}`
                break;
            case 'ORG':
                path = `./user_upload/org/${fileRelatedTypeID}`
                break;
            case 'PUBLIC':
                path = `./user_upload/public`
                break;
            default:
                path = `./user_upload/default`
                break;
        }

        fs.mkdirSync(path, { recursive: true })
        callback(null, path)
    },
    filename: function (req, file, callback) {
        // set file name by project/orgid and type
        const {
            uuid
        } = req?.userData

        const {
            fileRelatedType,
            fileRelatedTypeID,
            filePublicity,
            fileUploadedReason
        } = req?.fileReason

        let suffix = `${fileUploadedReason}`

        switch (fileRelatedType) {
            case 'USER':
                suffix += `-${uuid}`
                break;
            case 'PROJECT':
                suffix += `-${fileRelatedTypeID}`
                break;
            case 'ORG':
                suffix += `-${fileRelatedTypeID}`
                break;
            case 'PUBLIC':
                suffix += `-${uuid}-${fileRelatedTypeID}`
                break;
            default:
                suffix += `-${uuid}`
                break;
        }

        // get file extension
        const filename = file.originalname.split('.')
        const fileext = filename[filename.length - 1]
        console.log('[save storage]', `${new Date().getTime().toString()}-${suffix}.${fileext}`);

        callback(null, `${new Date().getTime().toString()}-${suffix}.${fileext}`)
    },
})

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * maxFileSizeMB },
    fileFilter: (req, file, callback) => {

        const filename = file.originalname.split('.')
        const fileext = filename[filename.length - 1]

        if (!allowedFileType.includes(file.mimetype)) {
            file.uploadError = {
                code: 'UPLOAD-FILE-ERROR-NOT-ALLOWED-TYPE',
                desc: { fileType: file.mimetype, fileExtension: fileext }
            }
            return callback(null, false)// return but with error code
        } else {

            // for each reason, has its own allowed filetype
            const {
                fileUploadedReason
            } = req?.fileReason

            const allowedData = uploadedReasonList[fileUploadedReason]

            if (allowedData.allowedFileType.includes('*')) {
                console.log('[allowed save]');
                callback(null, true)
            } else if (!allowedData.allowedFileType.includes(file.mimetype)) {
                file.uploadError = {
                    code: 'UPLOAD-FILE-ERROR-NOT-ALLOWED-TYPE',
                    desc: { fileType: file.mimetype, fileExtension: fileext }
                }
                return callback(null, true) // return but with error code
            } else {
                console.log('[allowed save]');
                return callback(null, true)
            }
        }
    }
}).single(['file'])

const uploadFileService = async (req, res) => {

    return new Promise((resolve, reject) => {
        try {

            upload(req, res, async (error) => {

                if (error) {
                    // check error code for specific error response 
                    reject({
                        code: error?.code || 'UPLOAD-FILE-ERROR-INTERNAL-ERROR',
                        desc: { message: error?.message, error }
                    }
                    )
                } else if (req?.file && req?.file?.uploadError) {
                    // file attached but some error happened
                    reject({
                        code: req?.file?.uploadError?.code || error?.code || 'UPLOAD-FILE-ERROR-INTERNAL-ERROR',
                        desc: { message: error?.message, error: req?.file?.uploadError.desc }
                    })
                } else {


                    const userData = req?.userData
                    const {
                        fileRelatedType,
                        fileRelatedTypeID,
                        filePublicity,
                        fileUploadedReason
                    } = req?.fileReason

                    // file already in db, so add data to db first
                    // save data to db

                    const uploadedFileData = req?.file

                    const savedFileDataToDB = await assignFileNamePathOnDB(
                        uploadedFileData.filename,
                        uploadedFileData.originalname,
                        userData.uuid,
                        fileRelatedType,
                        fileRelatedTypeID,
                        uploadedFileData.path,
                        uploadedFileData.size,
                        filePublicity,
                        fileUploadedReason
                    )

                    console.log('[save db]',
                        uploadedFileData.filename,
                        uploadedFileData.originalname,
                        userData.uuid,
                        fileRelatedType,
                        fileRelatedTypeID,
                        uploadedFileData.path,
                        uploadedFileData.size,
                        filePublicity,
                        fileUploadedReason
                    );


                    // after check file type and reason, check quota
                    switch (fileRelatedType) {
                        case 'USER':
                            // user quota
                            const quota = await getCurrentSizeAndUpdateQuotaUser(fileRelatedTypeID)

                            if (quota.currentSizeUsed > quota.maxSizeQuota) {

                                // storage full, delete this files
                                fs.unlinkSync(uploadedFileData?.path)
                                await deleteFileIDFromDB(savedFileDataToDB.fileID)

                                reject({
                                    code: 'UPLOAD-FILE-ERROR-FULL-QUOTA',
                                    desc: {
                                        currentFileSize: uploadedFileData?.size,
                                        currentSizeUsed: quota.currentSizeUsed - uploadedFileData?.size,
                                        maxSizeQuota: quota.maxSizeQuota,
                                        quotaDeficit: quota.currentSizeUsed - quota.maxSizeQuota
                                    }
                                })
                            } else {

                                resolve({
                                    fileID: savedFileDataToDB.fileID,
                                    fileName: savedFileDataToDB.fileName,
                                    fileUploadByUUID: savedFileDataToDB.fileUploadByUUID,
                                    fileRelatedType: fileRelatedType,
                                    fileRelatedTypeID: fileRelatedTypeID,
                                    fileSize: uploadedFileData.size,
                                    filePublicity: filePublicity,
                                    fileUploadedReason: fileUploadedReason,
                                    currentSizeUsed: quota.currentSizeUsed,
                                })
                            }
                            break;

                        case 'PROJECT':
                            // user quota
                            const quotaProject = await getCurrentSizeAndUpdateQuotaProject(fileRelatedTypeID)

                            if (quotaProject.currentSizeUsed > quotaProject.maxSizeQuota) {

                                // storage full, delete this files
                                fs.unlinkSync(uploadedFileData?.path)
                                await deleteFileIDFromDB(savedFileDataToDB.fileID)

                                reject({
                                    code: 'UPLOAD-FILE-ERROR-FULL-QUOTA',
                                    desc: {
                                        currentFileSize: uploadedFileData?.size,
                                        currentSizeUsed: quotaProject.currentSizeUsed - uploadedFileData?.size,
                                        maxSizeQuota: quotaProject.maxSizeQuota,
                                        quotaDeficit: quotaProject.currentSizeUsed - quotaProject.maxSizeQuota
                                    }
                                })
                            } else {

                                resolve({
                                    fileID: savedFileDataToDB.fileID,
                                    fileName: savedFileDataToDB.fileName,
                                    fileUploadByUUID: savedFileDataToDB.fileUploadByUUID,
                                    fileRelatedType: fileRelatedType,
                                    fileRelatedTypeID: fileRelatedTypeID,
                                    fileSize: uploadedFileData.size,
                                    filePublicity: filePublicity,
                                    fileUploadedReason: fileUploadedReason,
                                    currentSizeUsed: quotaProject.currentSizeUsed,
                                })
                            }
                            break;

                        case 'ORG':
                            // org quota
                            const orgQuota = await getCurrentSizeAndUpdateQuotaOrg(fileRelatedTypeID)

                            if (orgQuota.currentSizeUsed > orgQuota.maxSizeQuota) {

                                // storage full, delete this files
                                fs.unlinkSync(uploadedFileData?.path)
                                await deleteFileIDFromDB(savedFileDataToDB.fileID)

                                reject({
                                    code: 'UPLOAD-FILE-ERROR-FULL-QUOTA',
                                    desc: {
                                        currentFileSize: uploadedFileData?.size,
                                        currentSizeUsed: orgQuota.currentSizeUsed - uploadedFileData?.size,
                                        maxSizeQuota: orgQuota.maxSizeQuota,
                                        quotaDeficit: orgQuota.currentSizeUsed - orgQuota.maxSizeQuota
                                    }
                                })
                            } else {

                                resolve({
                                    fileID: savedFileDataToDB.fileID,
                                    fileName: savedFileDataToDB.fileName,
                                    fileUploadByUUID: savedFileDataToDB.fileUploadByUUID,
                                    fileRelatedType: fileRelatedType,
                                    fileRelatedTypeID: fileRelatedTypeID,
                                    fileSize: uploadedFileData.size,
                                    filePublicity: filePublicity,
                                    fileUploadedReason: fileUploadedReason,
                                    currentSizeUsed: orgQuota.currentSizeUsed,
                                })
                            }
                            break;


                        case 'PUBLIC':
                            // no quota
                            resolve({
                                fileID: savedFileDataToDB.fileID,
                                fileName: savedFileDataToDB.fileName,
                                fileUploadByUUID: savedFileDataToDB.fileUploadByUUID,
                                fileRelatedType: fileRelatedType,
                                fileRelatedTypeID: fileRelatedTypeID,
                                fileSize: uploadedFileData.size,
                                filePublicity: filePublicity,
                                fileUploadedReason: fileUploadedReason,
                            })

                            break;
                        default:
                            // no quota
                            throw {
                                code: error?.code || 'UPLOAD-FILE-ERROR-INTERNAL-ERROR',
                                desc: { error },
                            }

                    }







                }
            })
        } catch (error) {

            throw {
                code: error?.code || 'UPLOAD-FILE-ERROR-INTERNAL-ERROR',
                desc: { error },
            }

        }


    })
}


const serveFileFromFileID = async (fileID) => {


    // check if file id exists in system

    const check = await prisma.uploadedfiledata.findFirst({
        where: {
            fileID: fileID
        }
    })

    if (!check?.fileID) {
        throw {
            code: 'VIEW-FILE-ERROR-NO-FILE-ID-EXIST',
            desc: { fileID },
        }
    } else {
        const filePath = path.resolve(__dirname, '../../', check.filePathNow)
        return filePath
    }
}


const getCurrentSizeAndUpdateQuotaUser = async (uuid) => {

    // sum data
    const sumTotalFileSize = await prisma.uploadedfiledata.aggregate({
        _sum: {
            fileSize: true
        },
        where: {
            fileRelatedType: 'USER',
            fileRelatedTypeID: uuid
        }
    })

    const fileSizeUserNow = sumTotalFileSize._sum.fileSize || 0

    const updateQuota = await prisma.userfilequota.upsert({
        where: {
            UUID: uuid
        },
        update: {
            currentSizeUsed: fileSizeUserNow,
            updatedDatetime: new Date()
        },
        create: {
            currentSizeUsed: fileSizeUserNow,
            updatedDatetime: new Date(),
            usercredentials: {
                connect: {
                    uuid: uuid
                }
            }
        }
    })

    return {
        UUID: updateQuota.UUID,
        maxSizeQuota: updateQuota.maxSizeQuota,
        currentSizeUsed: updateQuota.currentSizeUsed,
        updatedDatetime: updateQuota.updatedDatetime
    }
}

const getCurrentSizeAndUpdateQuotaProject = async (projectID) => {

    // sum data
    const sumTotalFileSize = await prisma.uploadedfiledata.aggregate({
        _sum: {
            fileSize: true
        },
        where: {
            fileRelatedType: 'PROJECT',
            fileRelatedTypeID: projectID
        }
    })

    const fileSizeUserNow = sumTotalFileSize._sum.fileSize || 0



    const updateQuota = await prisma.projectfilequota.upsert({
        where: {
            projectID: projectID
        },
        update: {
            currentSizeUsed: fileSizeUserNow,
            updatedDatetime: new Date()
        },
        create: {
            currentSizeUsed: fileSizeUserNow,
            updatedDatetime: new Date(),
            projects: {
                connect: {
                    projectID: projectID
                }
            }
        }
    })

    return {
        projectID: updateQuota.projectID,
        maxSizeQuota: updateQuota.maxSizeQuota,
        currentSizeUsed: updateQuota.currentSizeUsed,
        updatedDatetime: updateQuota.updatedDatetime
    }
}

const getCurrentSizeAndUpdateQuotaOrg = async (orgID) => {

    // sum data
    const sumTotalFileSize = await prisma.uploadedfiledata.aggregate({
        _sum: {
            fileSize: true
        },
        where: {
            fileRelatedType: 'ORG',
            fileRelatedTypeID: orgID
        }
    })

    const fileSizeUserNow = sumTotalFileSize._sum.fileSize || 0

    const updateQuota = await prisma.organizationsfilequota.upsert({
        where: {
            orgID: orgID
        },
        update: {
            currentSizeUsed: fileSizeUserNow,
            updatedDatetime: new Date()
        },
        create: {
            currentSizeUsed: fileSizeUserNow,
            updatedDatetime: new Date(),
            organizations: {
                connect: {
                    orgID: orgID
                }
            }
        }
    })

    return {
        orgID: updateQuota.orgID,
        maxSizeQuota: updateQuota.maxSizeQuota,
        currentSizeUsed: updateQuota.currentSizeUsed,
        updatedDatetime: updateQuota.updatedDatetime
    }
}

// file data on db
const assignFileNamePathOnDB = async (fileName, fileOriginalName, fileUploadByUUID, fileRelatedType = 'USER', fileRelatedTypeID, filePath, fileSize, filePublicity = 'PRIVATE', fileUploadedReason) => {

    try {

        // gen an ID
        let fileID = nanoid2()
        let checkUsed = {}

        do {

            checkUsed = await prisma.uploadedfiledata.findUnique({
                where: {
                    fileID: fileID
                }
            })

            if (!checkUsed) {
                // not used -> add to db
                const saveToDB = await prisma.uploadedfiledata.create({
                    data: {
                        fileID: fileID,
                        fileName: fileName,
                        fileOriginalName: fileOriginalName,
                        fileUploadDatetime: new Date(),
                        fileUploadByUUID: fileUploadByUUID,
                        fileRelatedType: fileRelatedType,
                        fileRelatedTypeID: fileRelatedTypeID,
                        filePathNow: filePath,
                        fileSize: fileSize,
                        filePublicity: filePublicity,
                        fileUploadedReason: fileUploadedReason
                    }
                })

                return {
                    fileID: saveToDB.fileID,
                    fileName: saveToDB.fileName,
                    fileUploadDatetime: saveToDB.fileUploadDatetime,
                    fileUploadByUUID: saveToDB.fileUploadByUUID,
                    fileUploadedReason: saveToDB.fileUploadedReason
                }
            }
        } while (!checkUsed)
    }

    catch (error) {
        throw { code: error?.code || 500, message: error.message || error }

    }
}

const deleteFileIDFromDB = async (fileID) => {
    const deleteFile = await prisma.uploadedfiledata.delete({
        where: {
            fileID: fileID
        }
    })

    return {
        fileID: fileID
    }
}

const getFileInfoFromDB = async (fileID) => {

    const search = await prisma.uploadedfiledata.findFirstOrThrow({
        where: {
            fileID: fileID
        },
        select: {
            fileID: true,
            fileName: true,
            fileOriginalName: true,
            fileUploadDatetime: true,
            fileUploadByUUID: true,
            fileRelatedType: true,
            fileRelatedTypeID: true,
            filePathNow: true,
            fileSize: true,
            filePublicity: true,
            fileUploadedReason: true
        }
    })

    return search
}


module.exports = {
    uploadFileService,
    serveFileFromFileID,
    getFileInfoFromDB
}
