require('dotenv').config()
const prisma = require('../../prisma')
const eachRCMServices = require('./(joinProjectLogic)/joinProjectPCPLogic')
const { getDataSpecificRecruitID } = require('./recruitment/(recruitmentID)/eachRCMServices')

// ----- brief data -----
const getProjectBriefData = async (projectID) => {

    const search = await prisma.projects.findUnique({
        where: {
            projectID: projectID
        },
        include: {
            users: {
                select: {
                    studentID: true,
                    titleTH: true,
                    firstNameTH: true,
                    lastNameTH: true,
                    nickNameTH: true,
                    titleEN: true,
                    firstNameEN: true,
                    lastNameEN: true,
                    currentYear: true,
                }
            },
            projectdata: {
                select: {
                    placeInCMU: true,
                    placeOutsideCMU: true
                }
            }
        }
    })

    // if search = 0
    if (!search) {
        throw {
            code: 'GET-PROJECT-BRIEF-DATA-NOT-EXIST',
            desc: { userData: { projectID }, search }
        }
    } else {
        return search
    }

}

const putProjectBriefData = async (projectID, data) => {

    const updatedResults = await prisma.projects.update({
        where: {
            projectID: projectID
        },
        data: {
            ...data,
            updatedDateTime: new Date()
        }
    })

    return updatedResults
}

const deleteProjectBriefData = async (projectID, confirmed = false) => {


    // check if confirmed?
    if (!confirmed) {

        throw {
            code: 'DECLINED-CONFIRM-DELETE',
            desc: { userData: { projectID, confirmed } }
        }

    } else {

        const deleteResult = await prisma.projects.delete({
            where: {
                projectID: projectID
            }
        })

        return {}


    }

}


// ---- full data ---
const getProjectFullData = async (projectID) => {

    const search = await prisma.projectdata.findUnique({
        where: {
            projectID: projectID
        }
    })

    // if search = 0
    if (!search) {
        throw {
            code: 'GET-PROJECT-FULL-DATA-NOT-EXIST',
            desc: { userData: { projectID }, search }
        }
    } else {
        return search
    }

}

const putProjectFullData = async (projectID, data) => {

    const updatedResults = await prisma.projectdata.update({
        where: {
            projectID: projectID
        },
        data: {
            ...data,
            updatedDateTime: new Date()
        }
    })

    return updatedResults
}


// ----- joining a project -----

const joinProjectPCP = async (recruitID, studentID, password, forced = false) => {

    const checkListForJoining = [
        await eachRCMServices.checkIfRecruitIsOpen(recruitID),
        await eachRCMServices.checkIfUserYearIsAllowed(recruitID, studentID),
        await eachRCMServices.checkIfMaxNumberExceed(recruitID),
        await eachRCMServices.checkIfPasswordIsTrue(recruitID, password),
        await eachRCMServices.checkIfUserJoinAsPCPAlready(recruitID, studentID)
    ]

    // check if can regis?
    const isNotAllowedRegis = checkListForJoining.includes(false)

    if (!forced && isNotAllowedRegis) {
        throw {
            code: 'REGISTER-PRELIM-NO-STUDENT-DATA',
            desc: { userData: { studentID }, data }
        }
    }

    return true

}


module.exports = {
    getProjectBriefData,
    putProjectBriefData,
    deleteProjectBriefData,

    getProjectFullData,
    putProjectFullData,

    joinProjectPCP
}