const prisma = require('../../../prisma')

require('dotenv').config()

// ----- participant -----

const getParticipantRecruitmentList = async (projectID) => {

    const search = await prisma.projectparticipantrecruit.findMany({
        where: {
            projectID: projectID
        }
    })

    return search

}

const getStaffRecruitmentList = async (projectID) => {

    const search = await prisma.projectstaffrecruit.findMany({
        where: {
            projectID: projectID
        },
        include: {
            projectstaffrecruitposition: true
        }
    })

    return search

}




module.exports = {
    getParticipantRecruitmentList,
    getStaffRecruitmentList
}