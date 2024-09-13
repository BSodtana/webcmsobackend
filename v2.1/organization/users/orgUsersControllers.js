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

module.exports = {
    getUsersInSpecifigOrgCon
}