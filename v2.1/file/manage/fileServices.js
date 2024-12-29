require('dotenv').config()
const prisma = require('../prisma')
const multer = require('multer')
const nanoid = require('nanoid')
const nanoid2 = nanoid.customAlphabet('123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 16)

const path = require('path')

// default value
const maxFileSizeMB = 5

const storage = multer.diskStorage({
    destination: function (req, file, callback) {

        // check req if the file needed to upload where 


        callback(null, `./public/uploads`)
    },
    filename: function (req, file, callback) {
        // set file name by project/orgid and type

        callback(null, `${new Date().getTime().toString()}-${req.userData.uuid}-${file.originalname}`)
    },
})

const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * maxFileSizeMB } }).single('upload_file')

const uploadFileService = async (req, res) => {

    return new Promise((resolve, reject) => {
        try {
            // rodo: check quota of org/project






            upload(req, res, (error) => {
                if (error) {
                    reject({ code: 400, message: JSON.stringify(error) })
                } else {


                    // save data to db


                    resolve({
                        message: `File Upload Success!`,
                        file: req.file
                    })
                }
            })
        } catch (error) {
            throw { code: error?.code || 500, message: error.message || error }
        }


    })
}

const assignFileNamePathOnDB = async (uploadedUser, fileName, fileOriginalName = 'original', filePath, fileAvailableForSameTeam = true, fileAvailableForAll = false) => {

    try {
        // assign fileID
        let fileID = nanoid2()

        // check if this id is alredy be used
        let checkFileIDUsed = []

        do {
            checkFileIDUsed = await db.pool.query('select * from fileuploaddata where fileID = ?', [fileID])

            if (checkFileIDUsed.length === 0) {

                //add file data to db
                const createData = await db.pool.query('insert into fileuploaddata (fileID, fileName, fileOriginalName, fileUploadDatetime, fileUploadByUUID, filePathNow, fileAvailableForSameTeam, fileAvailableForAll) values (?,?,?,?,?,?,?,?)', [
                    fileID,
                    fileName,
                    fileOriginalName,
                    getCurrentDateTime(),
                    uploadedUser,
                    filePath,
                    fileAvailableForSameTeam,
                    fileAvailableForAll
                ])

                return {
                    message: 'Save file data to db success!',
                    fileID: fileID,
                    fileName: fileName,
                    fileOriginalName: fileOriginalName,
                    fileUploadDatetime: getCurrentDateTime(),
                    fileUploadByUUID: uploadedUser,
                    filePathNow: filePath,
                    fileAvailableForSameTeam: fileAvailableForSameTeam,
                    fileAvailableForAll: fileAvailableForAll
                }

            }

        } while (checkFileIDUsed.length !== 0);

    } catch (error) {
        throw { code: error?.code || 500, message: error.message || error }
    }





}


// view file 
const sentFile = async () => {
    try {

        const fileDetails = await db.pool.query('select * from fileuploaddata where fileID = ?', [id])

        if (fileDetails.length === 0) {
            res.status(200).json({ status: 'failed', data: { error: 'File from provided file ID is not exist.' } })

        } else {
            const filePath = path.resolve(__dirname, '../../public/uploads', fileDetails[0].fileName);
            if (action === 'view') {
                return res.sendFile(filePath);
            } else {
                return res.download(filePath);
            }
        }



    } catch (error) {
        console.error("view file err", error);
        res.status(200).json({ status: 'failed', data: { error: error.message || 'Internal Server Error' } })

    }
}

module.exports = {
    uploadFileService,

    assignFileNamePathOnDB
}



// const getAnnouncementList = async (project = null) => {
//     const search = await prisma.cmsoprojectannouncement.findMany({
//         where: { projectID: project },
//         select: {
//             announcementID: true,
//             studentID: true,
//             projectID: true,
//             announcementTitle: true,
//             announcementBody: true,
//             announcementCTALink: true,
//             updatedDateTime: true,
//             users: {
//                 select: {
//                     titleTH: true,
//                     firstNameTH: true,
//                     lastNameTH: true
//                 }
//             }
//         }
//     })

//     return search.map((each) => {
//         return {
//             announcementID: each.announcementID,
//             studentID: each.studentID,
//             projectID: each.projectID,
//             announcementTitle: each.announcementTitle,
//             announcementBody: each.announcementBody,
//             announcementCTALink: each.announcementCTALink,
//             updatedDateTime: each.updatedDateTime,

//             titleTH: each.users?.titleTH || null,
//             firstNameTH: each.users?.firstNameTH || null,
//             lastNameTH: each.users?.lastNameTH || null,
//         }
//     })

// }

// const updateAnnouncement = async (announcementID, editedStudentID, data) => {

//     const edit = await prisma.cmsoprojectannouncement.update({
//         where: {
//             announcementID: announcementID
//         },
//         data: {
//             ...data,
//             studentID: editedStudentID,
//             updatedDateTime: new Date(),
//         }
//     })

//     return edit

// }

// const deleteAnnouncement = async (announcementID, confirmed = false) => {

//     // check if confirmed?
//     if (!confirmed) {

//         throw {
//             code: 'DECLINED-CONFIRM-DELETE',
//             desc: { userData: { announcementID, confirmed } }
//         }

//     } else {

//         const deleteResult = await prisma.cmsoprojectannouncement.delete({
//             where: {
//                 announcementID: announcementID
//             }
//         })

//         return {}

//     }

// }

// const newAnnouncement = async (studentID, isGlobal = false, projectID = null, data) => {

//     // check number of the announcement so it wont collide with previous announcement
//     const search = await getAnnouncementList(projectID)
//     const count = search.length
//     const newNum = count + 1
//     const numFormatPadding = newNum.toString().padStart(4, '0') // 4 digit string with leading 0


//     if (isGlobal) {
//         // if global announcement
//         const newAnnoun = await prisma.cmsoprojectannouncement.create({
//             data: {
//                 announcementID: `GLOBAL-A${numFormatPadding}`,
//                 studentID: studentID,
//                 projectID: null,
//                 announcementTitle: data.announcementTitle || 'New announcement',
//                 announcementBody: data.announcementBody || null,
//                 announcementCTALink: data.announcementCTALink || null,
//             }
//         })

//         return newAnnoun

//     } else {
//         // announcement project specific

//         const newAnnoun = await prisma.cmsoprojectannouncement.create({
//             data: {
//                 announcementID: `${projectID}-A${numFormatPadding}`,
//                 studentID: studentID,
//                 projectID: projectID,
//                 announcementTitle: data.announcementTitle || 'New announcement',
//                 announcementBody: data.announcementBody || null,
//                 announcementCTALink: data.announcementCTALink || null,
//             }
//         })

//         return newAnnoun

//     }

// }

// const searchListProjectByNamePage = async (searchByName = '', language = 'TH', page = 1, ended = false) => {

//     if (language === 'EN') {
//         // if language is en -> search en
//         const search = await prisma.projects.findMany({
//             skip: (page - 1) * 20,
//             take: 20,
//             where: {
//                 OR: [
//                     {
//                         projectNameEN: {
//                             contains: searchByName
//                         }
//                     },
//                     {
//                         projectNickNameEN: {
//                             contains: searchByName
//                         }
//                     }
//                 ],
//                 AND: ended ? {} : {
//                     eventDateFinish: {
//                         gte: new Date()
//                     }
//                 }

//             },
//             orderBy: {
//                 eventDateFinish: {
//                     sort: 'asc',
//                     nulls: 'last'
//                 }
//             },
//             select: {
//                 projectID: true,
//                 studentID: true,
//                 orgID: true,

//                 projectNameTH: true,
//                 projectNickNameTH: true,
//                 projectShortDescriptionTH: true,

//                 projectNameEN: true,
//                 projectNickNameEN: true,

//                 eventDateStart: true,
//                 eventDateFinish: true,

//                 academicYear: true,
//                 projectdata: {
//                     select: {
//                         placeInCMU: true,
//                         placeOutsideCMU: true
//                     }
//                 }
//             }

//         })

//         return search.map((each) => {
//             return {
//                 projectID: each.projectID,
//                 studentID: each.studentID,
//                 orgID: each.orgID,

//                 projectNameTH: each.projectNameTH,
//                 projectNickNameTH: each.projectNickNameTH,
//                 projectShortDescriptionTH: each.projectShortDescriptionTH,

//                 projectNameEN: each.projectNameEN,
//                 projectNickNameEN: each.projectNickNameEN,

//                 eventDateStart: each.eventDateStart,
//                 eventDateFinish: each.eventDateFinish,

//                 academicYear: each.academicYear,

//                 placeInCMU: each.projectdata?.placeInCMU || null,
//                 placeOutsideCMU: each.projectdata?.placeOutsideCMU || null

//             }
//         })


//     } else {
//         // else -> default seach = if language is th
//         const search = await prisma.projects.findMany({
//             skip: (page - 1) * 20,
//             take: 20,
//             where: {

//                 OR: [
//                     {
//                         projectNameTH: {
//                             contains: searchByName
//                         }
//                     },
//                     {
//                         projectNickNameTH: {
//                             contains: searchByName
//                         }
//                     }
//                 ],
//                 AND: ended ? {} : {
//                     eventDateFinish: {
//                         gte: new Date()
//                     }
//                 }
//             },
//             orderBy: {
//                 eventDateFinish: {
//                     sort: 'asc',
//                     nulls: 'last'
//                 }
//             },
//             select: {
//                 projectID: true,
//                 studentID: true,
//                 orgID: true,

//                 projectNameTH: true,
//                 projectNickNameTH: true,
//                 projectShortDescriptionTH: true,

//                 projectNameEN: true,
//                 projectNickNameEN: true,

//                 eventDateStart: true,
//                 eventDateFinish: true,

//                 academicYear: true,
//                 projectdata: {
//                     select: {
//                         placeInCMU: true,
//                         placeOutsideCMU: true
//                     }
//                 }
//             }
//         })

//         return search.map((each) => {
//             return {
//                 projectID: each.projectID,
//                 studentID: each.studentID,
//                 orgID: each.orgID,

//                 projectNameTH: each.projectNameTH,
//                 projectNickNameTH: each.projectNickNameTH,
//                 projectShortDescriptionTH: each.projectShortDescriptionTH,

//                 projectNameEN: each.projectNameEN,
//                 projectNickNameEN: each.projectNickNameEN,

//                 eventDateStart: each.eventDateStart,
//                 eventDateFinish: each.eventDateFinish,

//                 academicYear: each.academicYear,

//                 placeInCMU: each.projectdata?.placeInCMU || null,
//                 placeOutsideCMU: each.projectdata?.placeOutsideCMU || null

//             }
//         })

//     }


// }

// module.exports = {
//     // getAnnouncementList,
//     // updateAnnouncement,
//     // deleteAnnouncement,
//     // newAnnouncement,

//     // searchListProjectByNamePage
// }