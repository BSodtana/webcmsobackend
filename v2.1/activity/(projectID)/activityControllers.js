const { errorCodeToResponse } = require('../../_helpers/errorCodeToResponse')
const { successCodeToResponse } = require('../../_helpers/successCodeToResponse')
const activityServices = require('./activityServices')

const getCheckInCodeCon = async (req, res) => {
    try {

        const { studentID = 'NO-STD-ID' } = await req?.userData
        const { projectID } = req.params

        const results = await activityServices.getCheckInCode(projectID)
        res.status(200).json(successCodeToResponse(results, 'ACTIVITY-GET-CHECK-IN-CODE-SUCCESS', studentID))


    } catch (error) {
        console.log('getCheckInCodeCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getCheckInCodeCon'))

    }
}

const checkInBulkCon = async (req, res) => {
    try {

        const { studentID = 'NO-STD-ID' } = await req?.userData
        const { projectID } = req.params
        const { studentIDList = [] } = req.body

        // list of stdid in list
        if (!projectID || !studentID || studentIDList.constructor !== Array) {
            res.status(400).json(errorCodeToResponse("NOT-ENOUGH-DATA", projectID, studentIDList))
        } else {
            const results = await activityServices.checkInBulk(projectID, studentIDList)
            res.status(200).json(successCodeToResponse(results, 'CHECK-IN-BULK-SUCCESS', projectID))
        }

    } catch (error) {
        console.log('checkInBulkCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'checkInBulkCon'))

    }
}

const submitEvaluationCon = async (req, res) => {
    try {

        //todo: check if user is joined that activity b4 allowed to evaluate
        const { studentID = 'NO-STD-ID' } = await req?.userData
        const {
            projectID,
        } = req.params

        const {
            activityRating = 0,
            comment = "",

            otherSkills = "",
            shouldContinue = 0,

            fundamentalLiteracy = 0,
            fundamentalNumeracy = 0,
            fundamentalScientific = 0,
            fundamentalFinancial = 0,
            fundamentalICT = 0,
            fundamentalCulturalCivic = 0,

            competencyCriticalThinkProblemSolv = 0,
            competencyCreativity = 0,
            competencyCommunication = 0,
            competencyCollaboration = 0,

            characterCuriosity = 0,
            characterInitiative = 0,
            characterPersistenceGrit = 0,
            characterAdaptability = 0,
            characterLeadership = 0,
            characterSocialCulturalAwareness = 0
        } = req?.body

        const results = await activityServices.submitEvaluationForm(
            studentID,
            projectID,

            activityRating,
            comment,
            otherSkills,
            shouldContinue,

            fundamentalLiteracy,
            fundamentalNumeracy,
            fundamentalScientific,
            fundamentalFinancial,
            fundamentalICT,
            fundamentalCulturalCivic,

            competencyCriticalThinkProblemSolv,
            competencyCreativity,
            competencyCommunication,
            competencyCollaboration,

            characterCuriosity,
            characterInitiative,
            characterPersistenceGrit,
            characterAdaptability,
            characterLeadership,
            characterSocialCulturalAwareness
        )

        res.status(200).json(successCodeToResponse(results, 'EVALUATION-FORM-SUBMISSION-SUCCESS', projectID))


    } catch (error) {
        console.log('submitEvaluationCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'submitEvaluationCon'))

    }
}

const getEvaluationFormStatusCon = async (req, res) => {
    try {

        const { studentID = 'NO-STD-ID' } = await req?.userData
        const { projectID } = req.params

        const results = await activityServices.getEvaluationFormStatus(projectID)
        res.status(200).json(successCodeToResponse(results, 'EVALUATION-FORM-RETRIEVE-STATUS-SUCCESS', projectID))


    } catch (error) {
        console.log('getEvaluationFormStatusCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getEvaluationFormStatusCon'))
    }
}

const editEvaluationFormStatusCon = async (req, res) => {
    try {

        const { studentID = 'NO-STD-ID' } = await req?.userData
        const { projectID } = req.params

        const { formStatus } = req.body

        // check formstatus
        if (!['ACTIVE', 'INACTIVE'].includes(formStatus)) {
            res.status(400).json(errorCodeToResponse("ERROR-DATA-TYPE-FAILED", formStatus))
        } else {
            const results = await activityServices.editEvaluationFormStatus(projectID, formStatus)
            res.status(200).json(successCodeToResponse(results, 'EVALUATION-FORM-EDIT-STATUS-SUCCESS', projectID))
        }


    } catch (error) {
        console.log('editEvaluationFormStatusCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'editEvaluationFormStatusCon'))
    }
}

const getIfUserDoneEvaluationFormCon = async (req, res) => {
    try {

        const { studentID = 'NO-STD-ID' } = await req?.userData
        const { projectID } = req.params

        const results = await activityServices.checkIfUserDoneEvaluation(studentID, projectID)
        res.status(200).json(successCodeToResponse(results, 'EVALUATION-FORM-USER-DONE-RETRIEVE-STATUS-SUCCESS', projectID, studentID))


    } catch (error) {
        console.log('getIfUserDoneEvaluationFormCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'getIfUserDoneEvaluationFormCon'))
    }
}

const countNumberCon = async (req, res) => {
    try {
        const { studentID = 'NO-STD-ID' } = await req?.userData
        const { projectID } = req.params

        const results = await activityServices.countNumber(projectID)
        res.status(200).json(successCodeToResponse(results, 'EVALUATION-FORM-COUNT-SUCCESS', projectID))


    } catch (error) {
        console.log('countNumberCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'countNumberCon'))

    }
}


module.exports = {
    getCheckInCodeCon,
    checkInBulkCon,

    submitEvaluationCon,
    getEvaluationFormStatusCon,
    editEvaluationFormStatusCon,
    getIfUserDoneEvaluationFormCon,

    countNumberCon
}