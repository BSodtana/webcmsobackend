const prisma = require('../../../prisma')

require('dotenv').config()

const getProjectMyOwn = async (studentID = '') => {
    const searchProject = await prisma.projects.findMany({
        where: {
            studentID: studentID
        },  
        select: {
            projectID: true,
            studentID: true,
            orgID: true,
            projectNameTH:true,
            projectNickNameTH: true,
            projectShortDescriptionTH: true,
            projectNameEN: true,
            projectNickNameEN:true,
            projectFullDetail: true,
            eventDateStart: true,
            eventDateFinish: true,
            academicYear: true,
            isShown: true,
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
                            recruitID: true,
                            studentID: true,
                            projectNameEN: true,
                            projectNameTH: true,
                            projectNickNameEN: true,
                            projectNickNameTH: true,
                            projectID: true,
                            recruitName: true,
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

const getProjectIJoinAsSTF = async (studentID = '') => {
    const searchProject = await prisma.projectstaffs.findMany({
        where: {
            studentID: studentID
        },
        include: {
            projectstaffrecruit: {
                include: {
                    projects: {
                        select: {
                            studentID: true,
                            recruitID: true,
                            recruitName: true,
                            projectNameEN: true,
                            projectNameTH: true,
                            projectNickNameEN: true,
                            projectNickNameTH: true,
                            projectID: true,
                        }
                    }
                }
            },
            projectstaffrecruitposition: {
                select: {
                    staffPositionID: true,
                    positionName: true
                }
            }
        }
    })

    return searchProject.map((each) => {
        return {
            "staffApplicationID": each.staffApplicationID,
            "recruitID": each.recruitID,
            "studentID": each.studentID,
            "recruitName": each.projectstaffrecruit.recruitName,
            "staffPositionID": each.projectstaffrecruitposition.staffPositionID,
            "positionName": each.projectstaffrecruitposition.positionName,

            "projectID": each.projectstaffrecruit.projectID,
            "projectNameEN": each.projectstaffrecruit.projects.projectNameEN,
            "projectNameTH": each.projectstaffrecruit.projects.projectNameTH,
            "projectNickNameEN": each.projectstaffrecruit.projects.projectNickNameEN,
            "projectNickNameTH": each.projectstaffrecruit.projects.projectNickNameTH,
            "createdDateTime": each.createdDateTime,

        }
    })
}


module.exports = {
    getProjectMyOwn,
    getProjectIJoinAsPCP,
    getProjectIJoinAsSTF
}