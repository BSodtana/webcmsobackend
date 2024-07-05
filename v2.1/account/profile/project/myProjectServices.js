const prisma = require('../../../prisma')

require('dotenv').config()

const getProjectMyOwn = async (studentID = '') => {
    const searchProject = await prisma.projects.findMany({
        where: {
            studentID: studentID
        }
    })

    return searchProject
}

const getProjectIJoinAsPCP = async (studentID = '') => {
    const searchProject = await prisma.projectparticipants.findMany({
        where: {
            studentID: studentID
        },
        include: {
            projectparticipantrecruit: {
                include: {
                    projects: {
                        select: {
                            projectNameEN: true,
                            projectNameTH: true,
                            projectNickNameEN: true,
                            projectNickNameTH: true,
                            projectID: true,
                        }
                    }
                }
            }
        }
    })

    return searchProject.map((each) => {
        return {
            "participantApplicationID": each.participantApplicationID,
            "recruitID": each.recruitID,
            "studentID": each.studentID,
            "createdDateTime": each.createdDateTime,
            "projectID": each.projectparticipantrecruit.projectID,
            "recruitName": each.projectparticipantrecruit.recruitName,
            "projectNameEN": each.projectparticipantrecruit.projects.projectNameEN,
            "projectNameTH": each.projectparticipantrecruit.projects.projectNameTH,
            "projectNickNameEN": each.projectparticipantrecruit.projects.projectNickNameEN,
            "projectNickNameTH": each.projectparticipantrecruit.projects.projectNickNameTH,
        }
    })
}


module.exports = {
    getProjectMyOwn,
    getProjectIJoinAsPCP
}