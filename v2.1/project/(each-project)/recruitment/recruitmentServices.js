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
    const newparticipantRecruitID = await generateNewPCPRecruitID(projectID)


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

    return {
        participantRecruitID: newRecruit.participantRecruitID,
        projectID: newRecruit.projectID,
        recruitName: newRecruit.recruitName,
        recruitDescription: newRecruit.recruitDescription,
        registerFrom: newRecruit.registerFrom,
        registerUntil: newRecruit.registerUntil,
        maxNumber: newRecruit.maxNumber,
        createdDateTime: newRecruit.createdDateTime,
        updatedDateTime: newRecruit.updatedDateTime,
        isAllowed: newRecruit.isAllowed,
        yearAllowed: newRecruit.yearAllowed,
        password: newRecruit.password
    }
}

const generateNewPCPRecruitID = async (projectID) => {

    // get current number & new ID of recruitment
    const search = await getParticipantRecruitmentList(projectID)
    const countNow = search.length
    const newPCPNo = countNow + 1
    // const newStaffRecruitID = `${projectID}-STF${newSTFNo}`

    // check if this posNum already exist
    let runNum = newPCPNo
    let searchNum = true
    do {
        const searchNewRecruitID = await prisma.projectparticipantrecruit.findFirst({
            where: {
                participantRecruitID: `${projectID}-PCP${runNum.toString().padStart(3, '0')}`
            }
        })


        if (searchNewRecruitID?.participantRecruitID) {
            runNum += 1
        } else {
            searchNum = false
        }

    } while (searchNum)


    return `${projectID}-PCP${runNum.toString().padStart(3, '0')}`

}


const newStaffRecruitment = async (projectID, data) => {

    // get current number & new ID of recruitment
    const newStaffRecruitID = await generateNewSTFRecruitID(projectID)


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

    return {
        staffRecruitID: newRecruit.staffRecruitID,
        projectID: newRecruit.projectID,
        recruitName: newRecruit.recruitName,
        recruitDescription: newRecruit.recruitDescription,
        registerFrom: newRecruit.registerFrom,
        registerUntil: newRecruit.registerUntil,
        createdDateTime: newRecruit.createdDateTime,
        updatedDateTime: newRecruit.updatedDateTime,
        isAllowed: newRecruit.isAllowed,
        yearAllowed: newRecruit.yearAllowed,
        password: newRecruit.password
    }
}

const generateNewSTFRecruitID = async (projectID) => {

    // get current number & new ID of recruitment
    const search = await getStaffRecruitmentList(projectID)
    const countNow = search.length
    const newSTFNo = countNow + 1
    // const newStaffRecruitID = `${projectID}-STF${newSTFNo}`

    // check if this posNum already exist
    let runNum = newSTFNo
    let searchNum = true
    do {
        const searchNewRecruitID = await prisma.projectstaffrecruit.findFirst({
            where: {
                staffRecruitID: `${projectID}-STF${runNum.toString().padStart(3, '0')}`
            }
        })


        if (searchNewRecruitID?.staffRecruitID) {
            runNum += 1
        } else {
            searchNum = false
        }

    } while (searchNum)


    return `${projectID}-STF${runNum.toString().padStart(3, '0')}`

}


module.exports = {
    getParticipantRecruitmentList,
    getStaffRecruitmentList,

    newParticipantRecruitment,
    newStaffRecruitment
}
