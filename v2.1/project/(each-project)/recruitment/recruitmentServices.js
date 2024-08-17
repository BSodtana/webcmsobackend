const prisma = require('../../../prisma')

require('dotenv').config()

// ----- get -----

const getParticipantRecruitmentList = async (projectID) => {

    const search = await prisma.projectparticipantrecruit.findMany({
        where: {
            projectID: projectID
        },
        select: {
            participantRecruitID: true,
            projectID: true,
            recruitName: true,
            recruitDescription: true,
            registerFrom: true,
            registerUntil: true,
            maxNumber: true,
            createdDateTime: true,
            updatedDateTime: true,
            isAllowed: true,
            yearAllowed: true,
        }
    })

    return search

}

const getStaffRecruitmentList = async (projectID) => {

    const search = await prisma.projectstaffrecruit.findMany({
        where: {
            projectID: projectID
        },
        select: {
            staffRecruitID: true,
            projectID: true,
            recruitName: true,
            recruitDescription: true,
            registerFrom: true,
            registerUntil: true,
            createdDateTime: true,
            updatedDateTime: true,
            isAllowed: true,
            yearAllowed: true,
            projectstaffrecruitposition: {
                select: {
                    staffPositionID: true,
                    recruitID: true,
                    positionName: true,
                    maxNumber: true,
                    createdDateTime: true,
                    updatedDateTime: true,
                    isAllowed: true
                }
            }
        }
    })

    return search

}

// ----- new -----
const newParticipantRecruitment = async (projectID, data) => {

    // get current number & new ID of recruitment
    const search = await getParticipantRecruitmentList(projectID)
    const countNow = search.length
    const newPCPNo = (countNow + 1).toString().padStart(3, '0')
    const newparticipantRecruitID = `${projectID}-PCP${newPCPNo}`

    // create new recruitment
    const newRecruit = await prisma.projectparticipantrecruit.create({
        data: {
            participantRecruitID: newparticipantRecruitID,
            projectID: projectID,
            createdDateTime: new Date(),
            updatedDateTime: new Date(),
            ...data
        }
    })

    return newRecruit
}

const newStaffRecruitment = async (projectID, data) => {

    // get current number & new ID of recruitment
    const search = await getStaffRecruitmentList(projectID)
    const countNow = search.length
    const newSTFNo = (countNow + 1).toString().padStart(3, '0')
    const newStaffRecruitID = `${projectID}-STF${newSTFNo}`

    // create new recruitment
    const newRecruit = await prisma.projectstaffrecruit.create({
        data: {
            staffRecruitID: newStaffRecruitID,
            projectID: projectID,
            createdDateTime: new Date(),
            updatedDateTime: new Date(),
            ...data
        }
    })

    return newRecruit
}


module.exports = {
    getParticipantRecruitmentList,
    getStaffRecruitmentList,

    newParticipantRecruitment,
    newStaffRecruitment
}