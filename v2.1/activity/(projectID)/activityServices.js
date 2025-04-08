require('dotenv').config()
const { errorCodeToResponse } = require('../../_helpers/errorCodeToResponse')
const prisma = require('../../prisma')
const { getAllPCPInProject, getAllSTFInProject } = require('../../project/(each-project)/(allPCPLogic)/allPCPLogic')

const getCheckInCode = async (projectID) => {
    const search = await prisma.projectcheckincode.findFirstOrThrow({
        where: {
            projectID: projectID
        },
        select: {
            checkinCode: true,
            updatedDatetime: true
        }
    })

    return search
}

const getProjectIDByCheckInCode = async (checkinCode) => {
    const search = await prisma.projectcheckincode.findUniqueOrThrow({
        where: {
            checkinCode: checkinCode
        },
        select: {
            projectID: true,
            updatedDatetime: true
        }
    })

    return search.projectID
}

const checkInActivity = async (checkinCode, studentID) => {
    const projectID = await getProjectIDByCheckInCode(checkinCode)



}

const checkInBulk = async (projectID = '', studentList = []) => {

    let errorPPL = []
    let successPPL = []

    for (const eachStdID of studentList) {

        try {
            const each = await checkInStdIDToProject(projectID, eachStdID.toString())
            successPPL.push(eachStdID)
        } catch (error) {
            // add stdid to list of error
            errorPPL.push({
                studentID: error.desc?.userData?.studentID,
                reason: errorCodeToResponse(error.code, projectID, eachStdID.toString())['description']
            })

        }

    }
    return {
        success: successPPL,
        failed: errorPPL
    }

}

const checkInStdIDToProject = async (projectID, studentID) => {

    const getPCPProject = await getAllPCPInProject(projectID)
    const searchPCP = getPCPProject.find((each) => {
        return each.studentID == studentID
    })

    const getSTFProject = await getAllSTFInProject(projectID)
    const searchSTF = getSTFProject.find((each) => {
        return each.studentID == studentID
    })

    if (searchPCP) {

        try {
            const dbPCP = await prisma.projectparticipation.create({
                data: {
                    applicationID: searchPCP.participantApplicationID,
                    studentID: searchPCP.studentID,
                    projectID: searchPCP.projectparticipantrecruit.projectID,
                    participationStatus: 'PRESENT',
                    updatedDatetime: new Date()
                }
            })

            return dbPCP
        } catch (error) {

            throw {
                code: 'CHECK-IN-ERROR-STUDENT-ID-CHECK-IN-ALREADY',
                desc: { userData: { projectID, studentID } },
            }


        }




    } else if (searchSTF) {

        try {

            const dbSTF = await prisma.projectparticipation.create({
                data: {
                    applicationID: searchSTF.staffApplicationID,
                    studentID: searchSTF.studentID,
                    projectID: searchSTF.projectstaffrecruit.projectID,
                    participationStatus: 'PRESENT',
                    updatedDatetime: new Date()
                }
            })

            return dbSTF

        } catch (error) {

            throw {
                code: 'CHECK-IN-ERROR-STUDENT-ID-CHECK-IN-ALREADY',
                desc: { userData: { projectID, studentID } },
            }


        }


    } else {
        throw {
            code: 'CHECK-IN-ERROR-STUDENT-ID-NOT-JOINED-ACTIVITY',
            desc: { userData: { projectID, studentID } },
        }
    }
}

// ------------ evaluation ------------------

const getEvaluationFormStatus = async (projectID) => {
    const search = await prisma.projectevaluateformstatus.findFirst({
        where: {
            projectID: projectID
        },
        select: {
            projectID: true,
            formStatus: true,
            updatedDatetime: true
        }
    })

    if (!search) {
        throw {
            code: 'P2025'
        }
    } else {
        return search
    }
}

const editEvaluationFormStatus = async (projectID, formStatus) => {

    // check if form is exist?
    let previous
    try {
        previous = await getEvaluationFormStatus(projectID)

        const edited = await prisma.projectevaluateformstatus.update({
            where: {
                projectID: projectID,
            },
            data: {
                formStatus: formStatus
            }
        })
    } catch (error) {
        // if not exist -> create new
        const count = await countNumber(projectID)
        const createNewEvForm = await prisma.projectevaluateformstatus.create({
            data: {
                projectID: projectID,
                formStatus: 'INACTIVE',
                maxNumberPCP: count.maxNumberPCP,
                joinedNumberPCP: count.joinedNumberPCP,
                submitNumberPCP: count.evaluatedNumberPCP,
                maxNumberSTF: count.maxNumberSTF,
                joinedNumberSTF: count.joinedNumberSTF,
                submitNumberSTF: count.evaluatedNumberSTF,
                updatedDatetime: new Date()
            },

            select: {
                projectID: true,
                formStatus: true,
                updatedDatetime: true
            }
        })

    }
    return getEvaluationFormStatus(projectID)

}

const checkIfUserDoneEvaluation = async (studentID, projectID) => {

    const search = await prisma.projectevaluateformresponse.findFirst({
        where: {
            projectID: projectID,
            studentID: studentID
        }
    })

    if (!search) {
        return {
            userDoneEvaluation: false
        }
    } else {
        return {
            userDoneEvaluation: true
        }
    }

}

const countNumber = async (projectID) => {
    // count number of PCP registered to activity by fx: getallpcp
    const maxNumberPCP = (await getAllPCPInProject(projectID)).length
    const maxNumberSTF = (await getAllSTFInProject(projectID)).length

    // count number of join ppl by checking check-in status
    const joinedNumberPCP = await countCheckInPCP(projectID)
    const joinedNumberSTF = await countCheckInSTF(projectID)

    // count number of evaluated ppl by checking evaluation db
    const evaluatedSTF = await countEvaluateFormResponseSTFPCP(projectID)

    console.log('count', maxNumberPCP, maxNumberSTF, joinedNumberPCP, joinedNumberSTF,
        evaluatedSTF.countPCP,
        evaluatedSTF.countSTF,);


    return {
        maxNumberPCP, maxNumberSTF, joinedNumberPCP, joinedNumberSTF,
        evaluatedNumberPCP: evaluatedSTF.evaluatedNumberPCP,
        evaluatedNumberSTF: evaluatedSTF.evaluatedNumberSTF,
    }
}

// to be fixed
const countCheckInSTF = async (projectID) => {
    const count = await prisma.projectparticipation.findMany(({
        where: {
            AND: [
                { projectID: projectID },
                {
                    applicationID: {
                        contains: 'STF'
                    }
                }
            ]
        }
    }))

    return count.length
}

// to be fixed
const countCheckInPCP = async (projectID) => {
    const count = await prisma.projectparticipation.findMany(({
        where: {
            AND: [
                { projectID: projectID },
                {
                    applicationID: {
                        contains: 'PCP'
                    }
                }
            ]
        }
    }))

    return count.length
}

const countEvaluateFormResponseSTFPCP = async (projectID) => {

    // workaround: filter form response by projID and use stdid to search
    const filter = await prisma.projectevaluateformresponse.findMany({
        where: {
            projectID: projectID
        }, select: {
            studentID: true
        }
    })


    const filterList = filter.map((each) => each.studentID)
    // console.log('filterList', filterList);


    let countPCP = 0

    for (const stdID of filterList) {

        const search = await prisma.projectparticipants.findFirst({
            where: {
                AND: [
                    { studentID: stdID },
                    {
                        projectparticipantrecruit: {
                            projectID: projectID
                        }
                    }
                ]
            }
        })

        if (search) {
            countPCP += 1
        }

    }

    return {
        evaluatedNumberPCP: countPCP,
        evaluatedNumberSTF: filterList.length - countPCP
    }


}

// ------------ submit evaluation ------------------

const submitEvaluationForm = async (
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
) => {

    try {
        // check if user already done evaluation
        const check = await checkIfUserDoneEvaluation(studentID, projectID)

        if (check.userDoneEvaluation === true) {
            throw {
                code: 'EVALUATION-ERROR-ALREADY-EVALUATED',
                desc: { userData: { studentID, projectID }, error: check }
            }
        } else {

            const submit = await prisma.projectevaluateformresponse.create({
                data: {
                    studentID: studentID,
                    projectID: projectID,

                    activityRating: activityRating,
                    shouldContinue: shouldContinue,
                    otherSkills: otherSkills,
                    comment: comment,
                    createdDatetime: new Date(),

                    fundamentalLiteracy: fundamentalLiteracy,
                    fundamentalNumeracy: fundamentalNumeracy,
                    fundamentalScientific: fundamentalScientific,
                    fundamentalFinancial: fundamentalFinancial,
                    fundamentalICT: fundamentalICT,
                    fundamentalCulturalCivic: fundamentalCulturalCivic,

                    competencyCriticalThinkProblemSolv: competencyCriticalThinkProblemSolv,
                    competencyCreativity: competencyCreativity,
                    competencyCommunication: competencyCommunication,
                    competencyCollaboration: competencyCollaboration,

                    characterCuriosity: characterCuriosity,
                    characterInitiative: characterInitiative,
                    characterPersistenceGrit: characterPersistenceGrit,
                    characterAdaptability: characterAdaptability,
                    characterLeadership: characterLeadership,
                    characterSocialCulturalAwareness: characterSocialCulturalAwareness
                }
            })
        }

    } catch (error) {
        console.log('[error outer submitEvaluationForm]'.error);

        throw {
            code: error?.code || 'EVALUATION-ERROR-INTERNAL-ERROR',
            desc: { userData: { studentID, projectID } }
        }
    }



}






module.exports = {
    getCheckInCode,
    checkInActivity,

    checkInBulk,

    submitEvaluationForm,
    getEvaluationFormStatus,
    editEvaluationFormStatus,
    checkIfUserDoneEvaluation,

    countNumber
}