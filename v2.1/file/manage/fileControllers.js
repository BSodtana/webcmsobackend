const { errorCodeToResponse } = require("../_helpers/errorCodeToResponse")
const { successCodeToResponse } = require("../_helpers/successCodeToResponse")

const uploadFileCon = async (req, res) => {

    const {
        studentID = 'NO-STD-ID',
        uuid
    } = await req?.userData

    const {
        fileRelatedType,
        fileRelatedTypeID,
        filePublicity,
        fileUploadedReason
    } = req?.body


    try {

        const uploadResult = await fileUploadService.uploadFileThroughHandler(req, res);
        const saveToDB = await fileUploadService.assignFileNamePathOnDB(req.userData.uuid, uploadResult.file.filename, uploadResult.file.originalname, uploadResult.file.path, fileAvailableForSameTeam = true, fileAvailableForAll = false)
        res.status(200).json({ status: 'success', data: saveToDB })
    } catch (error) {
        console.log('uploadFileThroughHandler err', error)
        res.status(200).json({ status: 'failed', data: { error: error.message || 'Internal Server Error' } })

    }
}


// ___/v1/view

// const viewfile = async (req, res) => async (req, res) => {
// const { id, action = 'download' } = req.query

// if (!id) {
//     res.status(200).json({ status: 'failed', data: { error: 'File ID and action is required.' } })
// } else {

// }


// 


module.exports = {

};



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
    // getAnnouncementListController,
    // searchListProjectByNamePageController,

    // uploadFileThroughHandler
}