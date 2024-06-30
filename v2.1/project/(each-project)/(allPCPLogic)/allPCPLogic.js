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

module.exports = {
    getAllPCPInProject
}