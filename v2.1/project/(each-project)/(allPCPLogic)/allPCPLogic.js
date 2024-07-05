const prisma = require("../../../prisma")

// ----- get all user list in project
const getAllPCPInProject = async (projectID = '') => {
    const searchPCP = await prisma.projectparticipants.findMany({
        where: {
            projectparticipantrecruit: {
                projectID: projectID
            }
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
            }
        }

    })

    return searchPCP
}

const getAllSTFInProject = async (projectID = '') => {

    const searchSTF = await prisma.projectstaffs.findMany({
        where: {
            projectstaffrecruit: {
                projectID: projectID
            }
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
            projectstaffrecruitposition: {
                select: {
                    positionName: true,

                }
            },
            projectstaffrecruit: {
                select: {
                    projectID: true,
                    recruitName: true,

                }
            }
        }
    })

    return searchSTF
}

module.exports = {
    getAllPCPInProject,
    getAllSTFInProject
}