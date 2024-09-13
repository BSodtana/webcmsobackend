const { errorCodeToResponse } = require("../../../_helpers/errorCodeToResponse")
const { successCodeToResponse } = require("../../../_helpers/successCodeToResponse")
const eachOrgServices = require("./eachOrgServices")

// const getProjectBriefDataCon = async (req, res) => {
//     try {

//         const { projectID } = req.params
//         // const { studentID = 'NO-STD-ID' } = await req?.userData

//         if (!projectID) {
//             res.status(400).json(errorCodeToResponse('GET-PROJECT-BRIEF-DATA-NO-PROJECT-ID-PROVIDED', projectID))
//         } else {
//             const results = await eachOrgServices.getProjectBriefData(projectID)
//             res.status(200).json(successCodeToResponse(results, 'GET-PROJECT-BRIEF-DATA-SUCCESS', projectID))

//         }

//     } catch (error) {
//         console.log('getProjectBriefDataCon', error)
//         res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getProjectBriefDataCon'))
//     }
// }

// const putProjectBriefDataCon = async (req, res) => {
//     try {

//         const { projectID } = req.params
//         const { studentID = 'NO-STD-ID' } = await req?.userData
//         const data = req.body

//         const found = ["projectID", "orgID", "createdDateTime", "updatedDateTime", "academicYear"].some(r => Object.keys(data).includes(r))

//         // restricted some data to be edited
//         if (found) {
//             res.status(400).json(errorCodeToResponse("PROJECT-BRIEF-DATA-UPDATE-PROTECTED-DATA", projectID, studentID))
//         } else {
//             const results = await eachOrgServices.putProjectBriefData(projectID, data)
//             res.status(200).json(successCodeToResponse(results, 'UPDATE-PROJECT-BRIEF-DATA-SUCCESS', projectID, studentID))
//         }

//     } catch (error) {
//         console.log('putProjectBriefDataCon', error)
//         res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'putProjectBriefDataCon'))
//     }
// }

// const deleteProjectBriefDataCon = async (req, res) => {
//     try {

//         const { projectID } = req.params
//         const { confirmDeleted } = req.body
//         const { studentID = 'NO-STD-ID' } = await req?.userData


//         const results = await eachOrgServices.deleteProjectBriefData(projectID, confirmDeleted)
//         res.status(200).json(successCodeToResponse(results, 'DELETE-PROJECT-SUCCESS', projectID, studentID))

//     } catch (error) {
//         console.log('deleteProjectBriefDataCon', error)
//         res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'deleteProjectBriefDataCon'))
//     }
// }

// // --- full ---

// const getProjectFullDataCon = async (req, res) => {
//     try {

//         const { projectID } = req.params
//         const { studentID = 'NO-STD-ID' } = await req?.userData

//         if (!projectID) {
//             res.status(400).json(errorCodeToResponse('GET-PROJECT-FULL-DATA-NO-PROJECT-ID-PROVIDED', studentID))
//         } else {
//             const results = await eachOrgServices.getProjectFullData(projectID)
//             res.status(200).json(successCodeToResponse(results, 'GET-PROJECT-FULL-DATA-SUCCESS', projectID))

//         }

//     } catch (error) {
//         console.log('getProjectFullDataCon', error)
//         res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getProjectFullDataCon'))
//     }
// }

// const putProjectFullDataCon = async (req, res) => {
//     try {

//         const { projectID } = req.params
//         const { studentID = 'NO-STD-ID' } = await req?.userData
//         const data = req.body

//         const found = ["projectID", "updatedDateTime"].some(r => Object.keys(data).includes(r))

//         // restricted some data to be edited
//         if (found) {
//             res.status(400).json(errorCodeToResponse("PROJECT-FULL-DATA-UPDATE-PROTECTED-DATA", projectID, studentID))
//         } else {
//             const results = await eachOrgServices.putProjectFullData(projectID, data)
//             res.status(200).json(successCodeToResponse(results, 'UPDATE-PROJECT-FULL-DATA-SUCCESS', projectID, studentID))
//         }

//     } catch (error) {
//         console.log('putProjectFullDataCon', error)
//         res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'putProjectFullDataCon'))
//     }
// }


const getSpecificOrgDetailsCon = async (req, res) => {
    try {

        const { orgID } = req.params
        const { studentID = 'NO-STD-ID' } = await req?.userData

        const results = await eachOrgServices.getSpecificOrgDetails(orgID)
        res.status(200).json(successCodeToResponse(results, 'GET-DETAIL-CMSO-ORG-SUCCESS', studentID))

    } catch (error) {
        console.log('getSpecificOrgDetailsCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getSpecificOrgDetailsCon'))
    }
}

const editOrgSpecificCon = async (req, res) => {
    try {

        const { orgID } = req.params
        const { orgName, orgDesc, orgImageID, orgType, parentOrg } = req.body
        const { studentID = 'NO-STD-ID' } = await req?.userData

        const results = await eachOrgServices.editOrgSpecific(orgID, orgName, orgDesc, orgImageID, orgType, parentOrg)
        res.status(200).json(successCodeToResponse(results, 'EDIT-DETAIL-CMSO-ORG-SUCCESS', studentID))


    } catch (error) {
        console.log('editOrgSpecificCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'editOrgSpecificCon'))
    }
}


const getProjectOrgOwnedCon = async (req, res) => {
    try {
        const { orgID } = req.params
        const { studentID = 'NO-STD-ID' } = await req?.userData

        const results = await eachOrgServices.getProjectOrgOwned(orgID)
        res.status(200).json(successCodeToResponse(results, 'GET-PROJECT-ORG-OWN-SUCCESS', studentID))

    } catch (error) {
        console.log('getProjectOrgOwnedCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getProjectOrgOwnedCon'))

    }
}


const getSubOrgListCon = async (req, res) => {
    try {

        const { orgID } = req.params
        const { studentID = 'NO-STD-ID' } = await req?.userData

        const results = await eachOrgServices.getSubOrgList(orgID)
        res.status(200).json(successCodeToResponse(results, 'GET-SUB-ORG-SUCCESS', studentID))

    } catch (error) {
        console.log('getSubOrgListCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getSubOrgListCon'))
    }
}



module.exports = {
    getSpecificOrgDetailsCon,
    editOrgSpecificCon,
    getProjectOrgOwnedCon,

    getSubOrgListCon
}