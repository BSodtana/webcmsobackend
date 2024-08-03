const { errorCodeToResponse } = require("../../_helpers/errorCodeToResponse")
const { successCodeToResponse } = require("../../_helpers/successCodeToResponse")
const commonCatServices = require("./commonCatServices")


const cmsoMission = async (req, res) => {
    try {
        const { studentID = 'NO-STD-ID' } = await req?.userData

        const results = await commonCatServices.listCMSOMission()
        res.status(200).json(successCodeToResponse(results, 'GET-COMMON-CATEGORY-SUCCESS', studentID))

    } catch (error) {
        console.log('cmsoMission', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc))
    }
}

const cmsoProject = async (req, res) => {
    try {
        const { studentID = 'NO-STD-ID' } = await req?.userData

        const results = await commonCatServices.listCMSOProject()
        res.status(200).json(successCodeToResponse(results, 'GET-COMMON-CATEGORY-SUCCESS', studentID))

    } catch (error) {
        console.log('cmsoProject', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc))
    }
}

const cmuMedGrad = async (req, res) => {
    try {
        const { studentID = 'NO-STD-ID' } = await req?.userData

        const results = await commonCatServices.listCMUMedGrad()
        res.status(200).json(successCodeToResponse(results, 'GET-COMMON-CATEGORY-SUCCESS', studentID))

    } catch (error) {
        console.log('cmuMedGrad', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc))
    }
}

const cmuMedOrg = async (req, res) => {
    try {
        const { studentID = 'NO-STD-ID' } = await req?.userData

        const results = await commonCatServices.listCMUMedOrg()
        res.status(200).json(successCodeToResponse(results, 'GET-COMMON-CATEGORY-SUCCESS', studentID))

    } catch (error) {
        console.log('cmuMedOrg', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc))
    }
}

const cmuProject = async (req, res) => {
    try {
        const { studentID = 'NO-STD-ID' } = await req?.userData

        const results = await commonCatServices.listCMUProject()
        res.status(200).json(successCodeToResponse(results, 'GET-COMMON-CATEGORY-SUCCESS', studentID))

    } catch (error) {
        console.log('cmuProject', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc))
    }
}

module.exports = {
    cmsoMission,
    cmsoProject,
    cmuMedGrad,
    cmuMedOrg,
    cmuProject
}