const { errorCodeToResponse } = require("../../_helpers/errorCodeToResponse")
const { successCodeToResponse } = require("../../_helpers/successCodeToResponse")
const orgUsersServices = require("./orgUsersServices")

const getUsersInSpecifigOrgCon = async (req, res) => {
    try {

        const { orgID } = req.params
        const { studentID = 'NO-STD-ID' } = await req?.userData

        const results = await orgUsersServices.getUsersInSpecifigOrg(orgID)
        res.status(200).json(successCodeToResponse(results, 'GET-USER-LIST-IN-ORG-SUCCESS', studentID))


    } catch (error) {
        console.log('getUsersInSpecifigOrgCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getUsersInSpecifigOrgCon'))

    }
}

const addUserToOrgCon = async (req, res) => {
    try {

        const { orgID } = req.params
        const { studentID, affiliationType = 'MEMBER' } = req.body
        const { accountStdID } = await req?.userData?.studentID || 'NO-STD-ID'

        // check affiliationType
        const foundType = ['PRESIDENT', 'VICE_PRESIDENT', 'SECRETARY', 'MEMBER'].includes(affiliationType)

        if ((!foundType)) {
            res.status(400).json(errorCodeToResponse("ADD-USER-TO-ORG-WRONG-TYPE-ERROR", orgID, studentID, affiliationType))
        } else if ((studentID == 0)) {
            res.status(400).json(errorCodeToResponse("NOT-ENOUGH-DATA", orgID, studentID, affiliationType))
        } else {
            const results = await orgUsersServices.addUserToOrg(studentID, orgID, affiliationType)
            res.status(200).json(successCodeToResponse(results, 'ADD-USER-TO-ORG-SUCCESS', accountStdID))
        }


    } catch (error) {
        console.log('getUsersInSpecifigOrgCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getUsersInSpecifigOrgCon'))

    }
}

const getDataFromAffIDCon = async (req, res) => {
    try {
        const { orgID, affiliationID = '' } = req.params
        const { accountStdID } = await req?.userData?.studentID || 'NO-STD-ID'

        // check if org match affID
        const extAff = affiliationID.toString().split('-')[0]

        if (orgID !== extAff) {
            res.status(400).json(errorCodeToResponse("ORG-ID-NOT-MATCH-ERROR", orgID, affiliationID, accountStdID))
        } else {
            const results = await orgUsersServices.getDataFromAffID(affiliationID)
            res.status(200).json(successCodeToResponse(results, 'GET-DETAIL-FROM-AFFILIATION-ID-SUCCESS', affiliationID, accountStdID))

        }


    } catch (error) {
        console.log('getDataFromAffIDCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getDataFromAffIDCon'))
    }
}

const editDataFromAffIDCon = async (req, res) => {
    try {
        const { orgID, affiliationID = '' } = req.params
        const { affiliationType } = req.body
        const { accountStdID } = await req?.userData?.studentID || 'NO-STD-ID'

        // check if org match affID
        const extAff = affiliationID.toString().split('-')[0]

        // check affiliationType
        const foundType = ['PRESIDENT', 'VICE_PRESIDENT', 'SECRETARY', 'MEMBER'].includes(affiliationType)


        if (orgID !== extAff) {
            res.status(400).json(errorCodeToResponse("ORG-ID-NOT-MATCH-ERROR", orgID, affiliationID, accountStdID))
        } else if ((!foundType) || (affiliationType == "")) {
            res.status(400).json(errorCodeToResponse("EDIT-USER-TO-ORG-WRONG-TYPE-ERROR", orgID, affiliationID, affiliationType))

        } else {
            const results = await orgUsersServices.editDataFromAffID(affiliationID, affiliationType)
            res.status(200).json(successCodeToResponse(results, 'EDIT-DETAIL-FROM-AFFILIATION-ID-SUCCESS', affiliationID, accountStdID))

        }


    } catch (error) {
        console.log('getDataFromAffIDCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getDataFromAffIDCon'))
    }
}

module.exports = {
    getUsersInSpecifigOrgCon,
    addUserToOrgCon,
    getDataFromAffIDCon,
    editDataFromAffIDCon
}