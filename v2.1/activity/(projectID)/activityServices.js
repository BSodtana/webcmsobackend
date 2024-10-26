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

module.exports = {
    getCheckInCode,
    checkInActivity,

    checkInBulk,

    getEvaluationFormStatus,
}