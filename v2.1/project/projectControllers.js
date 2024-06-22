const { errorCodeToResponse } = require("../_helpers/errorCodeToResponse")
const { successCodeToResponse } = require("../_helpers/successCodeToResponse")
const projectServices = require("./projectServices")

const getAnnouncementListController = async (req, res) => {
    try {

        const studentID = req?.userData?.studentID || 'NO-STD-ID'

        const results = await projectServices.getAnnouncementList()
        res.status(200).json(successCodeToResponse(results, 'GET-GLOBAL-ANNOUNCEMENT-SUCCESS', studentID))


    } catch (error) {
        console.log('getAnnouncementListController', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getAnnouncementListController'))
    }
}

const searchListProjectByNamePageController = async (req, res) => {
    try {

        const studentID = req?.userData?.studentID || 'NO-STD-ID'
        const { name = '', language = 'TH', page = 1 } = req.query


        const results = await projectServices.searchListProjectByNamePage(name.toString(), language.toString(), parseInt(page) || 1)
        res.status(200).json(successCodeToResponse(results, 'SEARCH-PROJECT-BY-NAME-PAGE-SUCCESS', studentID))


    } catch (error) {
        console.log('searchListProjectByNamePageController', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'searchListProjectByNamePageController'))
    }
}

module.exports = {
    getAnnouncementListController,
    searchListProjectByNamePageController
}