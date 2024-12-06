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
            projectNameTH: true,
            projectNickNameTH: true,
            projectShortDescriptionTH: true,
            projectNameEN: true,
            projectNickNameEN: true,
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
        select: {
            participantApplicationID: true,
            recruitID: true,
            studentID: true,
            createdDateTime: true,

            projectparticipantrecruit: {
                select: {
                    projectID: true,
                    recruitName: true,
                    projects: {
                        select: {
                            projectNameTH: true,
                            projectNameEN: true,
                            projectNickNameTH: true,
                            projectNickNameEN: true
                        }
                    }
                }
            }


        }
    })


    return searchProject.map((each) => {
        return {
            participantApplicationID: each.participantApplicationID,
            recruitID: each.recruitID,
            studentID: each.studentID,
            createdDateTime: each.createdDateTime,
            projectID: each.projectparticipantrecruit.projectID,
            recruitName: each.projectparticipantrecruit.recruitName,
            projectNameTH: each.projectparticipantrecruit.projects.projectNameTH,
            projectNameEN: each.projectparticipantrecruit.projects.projectNameEN,
            projectNickNameTH: each.projectparticipantrecruit.projects.projectNickNameTH,
            projectNickNameEN: each.projectparticipantrecruit.projects.projectNickNameEN
        }
    })
}

const getProjectIJoinAsSTF = async (studentID = '') => {
    const searchProject = await prisma.projectstaffs.findMany({
        where: {
            studentID: studentID
        },

        select: {
            staffApplicationID: true,
            recruitID: true,
            studentID: true,
            createdDateTime: true,

            projectstaffrecruitposition: {
                select: {
                    positionName: true,
                    staffPositionID: true
                }
            },


            projectstaffrecruit: {
                select: {
                    recruitName: true,
                    projectID: true,
                    projects: {
                        select: {
                            projectNameTH: true,
                            projectNameEN: true,
                            projectNickNameTH: true,
                            projectNickNameEN: true,

                        }
                    }
                }
            },


        }

    })

    return searchProject.map((each) => {
        return {
            staffApplicationID: each.staffApplicationID,
            recruitID: each.recruitID,
            studentID: each.studentID,

            recruitName: each.projectstaffrecruit.recruitName,
            staffPositionID: each.projectstaffrecruitposition.staffPositionID,
            positionName: each.projectstaffrecruitposition.positionName,

            projectID: each.projectstaffrecruit.projectID,
            projectNameEN: each.projectstaffrecruit.projects.projectNameEN,
            projectNameTH: each.projectstaffrecruit.projects.projectNameTH,
            projectNickNameTH: each.projectstaffrecruit.projects.projectNickNameTH,
            projectNickNameEN: each.projectstaffrecruit.projects.projectNickNameEN,

            createdDateTime: each.createdDateTime

        }
    })
}


module.exports = {
    getProjectMyOwn,
    getProjectIJoinAsPCP,
    getProjectIJoinAsSTF
}