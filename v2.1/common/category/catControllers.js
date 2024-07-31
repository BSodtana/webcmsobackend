const { errorCodeToResponse } = require("../../_helpers/errorCodeToResponse")
const { successCodeToResponse } = require("../../_helpers/successCodeToResponse")
const categoryServices = require("./catServices")

const cmsoMission = async (req,res) => {
    try {
        const results = await categoryServices.listAllCmsoMission()
        res.status(200).json(successCodeToResponse(results, 'LIST-ALL-CMSO-ORG-SUCCESS', studentID))
    } catch (error) {
        console.log(error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc))
    }
}

const cmsoProject = async (req,res) => {
    try {
        const results = await categoryServices.listAllCmsoProject()
        res.status(200).json(successCodeToResponse(results, 'LIST-ALL-CMSO-ORG-SUCCESS', studentID))
    } catch (error) {
        console.log(error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc))
    }
}

const cmuMedGrad = async (req,res) => {
    try {
        const results = await categoryServices.listAllCmuMedGrad()
        res.status(200).json(successCodeToResponse(results, 'LIST-ALL-CMSO-ORG-SUCCESS', studentID))
    } catch (error) {
        console.log(error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc))
    }
}

const cmuMedOrg = async (req,res) => {
    try {
        const results = await categoryServices.listAllCmuMedOrg()
        res.status(200).json(successCodeToResponse(results, 'LIST-ALL-CMSO-ORG-SUCCESS', studentID))
    } catch (error) {
        console.log(error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc))
    }
}

const cmuProject = async (req,res) => {
    try {
        const results = await categoryServices.listAllCmuProject()
        res.status(200).json(successCodeToResponse(results, 'LIST-ALL-CMSO-ORG-SUCCESS', studentID))
    } catch (error) {
        console.log(error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc))
    }
}

module.exports ={
    cmsoMission, cmsoProject, cmuMedGrad, cmuMedOrg, cmuProject
}