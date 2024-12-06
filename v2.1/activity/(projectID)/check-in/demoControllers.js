const { Prisma } = require("@prisma/client")
const { errorCodeToResponse } = require("../_helpers/errorCodeToResponse")
const { successCodeToResponse } = require("../_helpers/successCodeToResponse")
const accountServices = require("./demoServices")

const helloWorldController = async (req, res) => {
    try {

        const { name } = req.body

        // if (!name) {
        //     res.status(400).json(errorCodeToResponse('HELLOWORLD-ERROR-NONAME', 'ADMIN Test'))
        // } else {
        // }

        const results = await accountServices.helloWorld(name)
        res.status(200).json(successCodeToResponse(results, 'HELLOWORLD-SUCCESS', 'ADMIN test'))


    } catch (error) {

        console.log('helloWorldController', error)
        if (error instanceof Prisma.PrismaClientValidationError) {
            res.status(500).json(errorCodeToResponse("ERROR-DATA-TYPE-FAILED", error?.message || 'postNewOrg'))
        } else {
            res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'helloWorldController'))
        }
    }
}

const getAllData = async (req, res) => {
    try {

        const results = await accountServices.getAllUserData()
        res.status(200).json(successCodeToResponse(results, 'HELLOWORLD-SUCCESS', 'ADMIN test'))

    } catch (error) {
        console.log('getAllData', error)

        if (error instanceof Prisma.PrismaClientValidationError) {
            res.status(500).json(errorCodeToResponse("ERROR-DATA-TYPE-FAILED", error?.message || 'postNewOrg'))
        } else {
            res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'helloWorldController'))
        }


    }
}

const getSpecificUserData = async (req, res) => {
    try {

        const { studentID } = req.query
        console.log('Search for', studentID)

        if (!studentID) {
            res.status(400).json(errorCodeToResponse('DEMO-ERROR-NO-STUDENT-ID-SPECIFIED'))
        } else {
            const results = await accountServices.getSpecificUserData(studentID)
            res.status(200).json(successCodeToResponse(results, 'DEMO-SEARCH-BY-STUDENT-ID-SUCCESS', studentID))
        }


    } catch (error) {
        console.log('getSpecificUserData', error)

        if (error instanceof Prisma.PrismaClientValidationError) {
            res.status(500).json(errorCodeToResponse("ERROR-DATA-TYPE-FAILED", error?.message || 'postNewOrg'))
        } else {
            res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'helloWorldController'))
        }


    }
}

const postNewOrg = async (req, res) => {
    try {

        const { orgID, orgName, orgType, orgParent } = req.body

        if (!orgID || !orgName || !orgType) {
            res.status(400).json(errorCodeToResponse('DEMO-ERROR-NEW-ORG-MISSING-DATA'))
        } else {
            const results = await accountServices.postData(orgID, orgName, orgType, orgParent)
            res.status(200).json(successCodeToResponse(results, 'DEMO-CREATE-NEW-ORG-SUCCESS', orgID))
        }


    } catch (error) {
        console.log('postNewOrg', error)
        if (error instanceof Prisma.PrismaClientValidationError) {
            res.status(500).json(errorCodeToResponse("ERROR-DATA-TYPE-FAILED", error?.message || 'postNewOrg'))
        } else {
            res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.message || 'helloWorldController'))

        }
    }
}



module.exports = {
    helloWorldController,
    getAllData,
    getSpecificUserData,
    postNewOrg
}