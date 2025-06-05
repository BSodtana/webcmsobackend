const { errorCodeToResponse } = require("../_helpers/errorCodeToResponse")
const { successCodeToResponse } = require("../_helpers/successCodeToResponse")
const projectServices = require("./manageServices")

const getAnnouncementListController = async (req, res) => {
    try {

        const { studentID = 'NO-STD-ID' } = await req?.userData

        const results = await projectServices.getAnnouncementList()
        res.status(200).json(successCodeToResponse(results, 'GET-GLOBAL-ANNOUNCEMENT-SUCCESS', studentID))


    } catch (error) {
        console.log('getAnnouncementListController', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getAnnouncementListController'))
    }
}

const searchListProjectByNamePageController = async (req, res) => {
    try {

        // const { studentID = 'NO-STD-ID' } = await req?.userData
        const { name = '', language = 'TH', page = 1, ended = false } = req.query


        const results = await projectServices.searchListProjectByNamePage(name.toString(), language.toString(), parseInt(page) || 1, !!parseInt(ended))
        res.status(200).json(successCodeToResponse(results, 'SEARCH-PROJECT-BY-NAME-PAGE-SUCCESS', `${name}-${language}-${page}`))


    } catch (error) {
        console.log('searchListProjectByNamePageController', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'searchListProjectByNamePageController'))
    }
}

const createNewProjectCon = async (req, res) => {
    try {

        const { studentID = 'NO-STD-ID' } = await req?.userData
        const {
            orgID,
            projectNameTH,
            projectNickNameTH,
            projectNameEN,
            projectNickNameEN,
            eventDateStart,
            eventDateFinish,
            academicYear = "202501"
        } = req.body

        // const found = ["projectID", "studentID", "createdDateTime", "updatedDateTime", "projectShortDescriptionTH", "projectFullDetail", "isShown"].some(r => Object.keys(req.body).includes(r))

        // restricted some data to be edited
        // if (found) {
        //     res.status(400).json(errorCodeToResponse("CREATE-NEW-PROJECT-UPDATE-PROTECTED-DATA", projectNameTH, studentID))
        // } else {
        const results = await projectServices.createNewProject(
            studentID,
            orgID,
            projectNameTH,
            projectNickNameTH,
            projectNameEN,
            projectNickNameEN,
            eventDateStart,
            eventDateFinish,
            academicYear
        )
        res.status(200).json(successCodeToResponse(results, 'CREATE-NEW-PROJECT-SUCCESS', results.projectID, studentID))
        // }

    } catch (error) {
        console.log('createNewProjectCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'createNewProjectCon'))
    }
}

module.exports = {
    getAnnouncementListController,
    searchListProjectByNamePageController,

    createNewProjectCon
}