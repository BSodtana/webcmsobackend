const { errorCodeToResponse } = require("../../_helpers/errorCodeToResponse")
const { successCodeToResponse } = require("../../_helpers/successCodeToResponse")
const projectImportServices = require("./projectImportServices")

const getMSListProjectController = async (req, res) => {
    try {

        const { studentID = 'NO-STD-ID' } = await req?.userData

        const results = await projectImportServices.getMSListProject(studentID)
        res.status(200).json(successCodeToResponse(results, 'RETREIVE-MSLIST-DATA-SUCCESS', studentID))


    } catch (error) {
        console.log('getMSListProjectController', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getMSListProjectController'))
    }
}

const createNewProjectFromMSListCon = async (req, res) => {
    try {

        const { studentID = 'NO-STD-ID' } = await req?.userData
        const {
            autoID,
            orgID,
            editedProjectNameTH,
            editedProjectNickNameTH,
            editedDateEventStart,
            editedDateEventEnd
        } = req.body

        studentID, autoID, orgID, editedProjectNameTH, editedProjectNickNameTH, editedDateEventStart, editedDateEventEnd

        const results = await projectImportServices.createNewProjectFromMSList(
            studentID,
            autoID,
            orgID,
            editedProjectNameTH,
            editedProjectNickNameTH,
            editedDateEventStart,
            editedDateEventEnd
        )

        res.status(200).json(successCodeToResponse(results, 'CREATE-NEW-PROJECT-FROM-MS-LIST-SUCCESS', results.projectID, studentID))


    } catch (error) {
        console.log('createNewProjectFromMSListCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'createNewProjectFromMSListCon'))
    }
}


module.exports = {
    getMSListProjectController,
    createNewProjectFromMSListCon
}