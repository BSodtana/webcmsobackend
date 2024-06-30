
const { errorCodeToResponse } = require("../../../../_helpers/errorCodeToResponse")
const { successCodeToResponse } = require("../../../../_helpers/successCodeToResponse")
const eachRCMServices = require("./eachRCMServices")

const getDataSpecificRecruitIDCon = async (req, res) => {
    try {

        const { projectID, recruitmentID } = req.params
        const { studentID = 'NO-STD-ID' } = await req?.userData

        const results = await eachRCMServices.getDataSpecificRecruitID(recruitmentID)

        if (results?.projectID !== projectID) {
            res.status(400).json(errorCodeToResponse("ACCESS-DENIED-OTHER", 'ProjectID not match recruitment ID', studentID))
        } else {
            res.status(200).json(successCodeToResponse(results, 'GET-RECRUITMENT-DATA-SUCCESS', recruitmentID, studentID))
        }


    } catch (error) {
        console.log('getDataSpecificRecruitIDCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getDataSpecificRecruitIDCon'))
    }
}

const editDataSpecificRecruitIDCon = async (req, res) => {
    try {

        const { projectID, recruitmentID } = req.params
        const { studentID = 'NO-STD-ID' } = await req?.userData
        const data = req.body

        const found = ["participantRecruitID", "staffRecruitID", "studentID", "projectID", "createdDateTime", "updatedDateTime"].some(r => Object.keys(data).includes(r))


        // restricted some data to be edited
        if (found) {
            res.status(400).json(errorCodeToResponse("RECRUIT-UPDATE-PROTECTED-DATA", recruitmentID, studentID))
        } else {

            // check recruit projectID
            const results = await eachRCMServices.getDataSpecificRecruitID(recruitmentID)

            if (results?.projectID !== projectID) {
                res.status(400).json(errorCodeToResponse("ACCESS-DENIED-OTHER", 'ProjectID not match recruitment ID', studentID))
            } else {
                const results = await eachRCMServices.editDataSpecificRecruitID(recruitmentID, data)
                res.status(200).json(successCodeToResponse(results, 'UPDATE-RECRUITMENT-DATA-SUCCESS', recruitmentID, studentID))
            }


        }

    } catch (error) {
        console.log('editDataSpecificRecruitIDCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'editDataSpecificRecruitIDCon'))
    }
}

const deleteDataSpecificRecruitIDCon = async (req, res) => {
    try {

        const { projectID, recruitmentID } = req.params
        const { confirmDeleted } = req.body
        const { studentID = 'NO-STD-ID' } = await req?.userData

        // check recruit projectID
        const results = await eachRCMServices.getDataSpecificRecruitID(recruitmentID)

        if (results?.projectID !== projectID) {
            res.status(400).json(errorCodeToResponse("ACCESS-DENIED-OTHER", 'ProjectID not match recruitment ID', studentID))
        } else {
            const results = await eachRCMServices.deleteDataSpecificRecruitID(recruitmentID, confirmDeleted)
            res.status(200).json(successCodeToResponse(results, 'DELETE-RECRUITMENT-DATA-SUCCESS', recruitmentID, studentID))
        }


    } catch (error) {
        console.log('deleteDataSpecificRecruitIDCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'deleteDataSpecificRecruitIDCon'))
    }
}

const getAllUserInSpecificRecruitIDCon = async (req, res) => {
    try {

        const { projectID, recruitmentID } = req.params
        const { studentID = 'NO-STD-ID' } = await req?.userData

        const results = await eachRCMServices.getAllUserInSpecificRecruitID(recruitmentID)
        res.status(200).json(successCodeToResponse(results, 'GET-RECRUITMENT-DATA-SUCCESS', recruitmentID, studentID))



    } catch (error) {
        console.log('getAllUserInSpecificRecruitID', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getAllUserInSpecificRecruitID'))
    }
}

module.exports = {
    getDataSpecificRecruitIDCon,
    editDataSpecificRecruitIDCon,
    deleteDataSpecificRecruitIDCon,

    getAllUserInSpecificRecruitIDCon
}