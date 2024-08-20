const { errorCodeToResponse } = require("../../../../../../_helpers/errorCodeToResponse")
const { successCodeToResponse } = require("../../../../../../_helpers/successCodeToResponse")
const eachPOSServices = require("./eachPOSServices")

const getDataStaffSpecificPositionIDCon = async (req, res) => {
    try {

        const { projectID, recruitmentID, positionID } = req.params
        const { studentID = 'NO-STD-ID' } = await req?.userData

        // todo: check recruitmentID match positionID

        const results = await eachPOSServices.getDataStaffSpecificPositionID(positionID)
        res.status(200).json(successCodeToResponse(results, 'GET-RECRUITMENT-DATA-SUCCESS', recruitmentID, studentID))



    } catch (error) {
        console.log('getDataStaffSpecificPositionIDCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getDataStaffSpecificPositionIDCon'))
    }
}

const createNewStaffPositionCon = async (req, res) => {
    try {

        const { projectID, recruitmentID, positionID } = req.params
        const { studentID = 'NO-STD-ID' } = await req?.userData
        const data = req.body

        const found = ["staffPositionID", "recruitID", "createdDateTime", "updatedDateTime"].some(r => Object.keys(data).includes(r))

        // restricted some data to be edited
        if (found) {
            res.status(400).json(errorCodeToResponse("POSITION-UPDATE-PROTECTED-DATA", recruitmentID, studentID))
        } else {
            const results = await eachPOSServices.createNewStaffPosition(
                recruitmentID,
                data?.positionName || 'ตำแหน่งหน้าที่',
                typeof (data?.maxNumber) === "number" ? data?.maxNumber : 1,
                typeof (data?.isAllowed) === "number" ? data?.isAllowed : 1
            )
            res.status(200).json(successCodeToResponse(results, 'CREATE-NEW-STF-POSITION-SUCCESS', results.staffPositionID, studentID))
        }


    } catch (error) {
        console.log('createNewStaffPositionCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'createNewStaffPositionCon'))
    }
}

const editStaffPositionCon = async (req, res) => {
    try {

        const { positionID } = req.params
        const { studentID = 'NO-STD-ID' } = await req?.userData
        const data = req.body

        const found = ["recruitID", "createdDateTime", "updatedDateTime"].some(r => Object.keys(data).includes(r))


        // restricted some data to be edited
        if (found) {
            res.status(400).json(errorCodeToResponse("POSITION-UPDATE-PROTECTED-DATA", positionID, studentID))
        } else {
            const results = await eachPOSServices.editStaffPositionData(positionID, data)
            res.status(200).json(successCodeToResponse(results, 'UPDATE-STF-POSITION-SUCCESS', positionID, studentID))
        }

    } catch (error) {
        console.log('editStaffPositionCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'editStaffPositionCon'))
    }
}

const deleteStaffPositionCon = async (req, res) => {
    try {

        const { positionID } = req.params
        const { confirmDeleted } = req.body
        const { studentID = 'NO-STD-ID' } = await req?.userData

        const results = await eachPOSServices.deleteStaffPositionData(positionID, confirmDeleted)
        res.status(200).json(successCodeToResponse(results, 'DELETE-STF-POSITION-SUCCESS', positionID, studentID))



    } catch (error) {
        console.log('deleteStaffPositionCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'deleteStaffPositionCon'))
    }
}

module.exports = {
    getDataStaffSpecificPositionIDCon,
    createNewStaffPositionCon,
    editStaffPositionCon,
    deleteStaffPositionCon
}