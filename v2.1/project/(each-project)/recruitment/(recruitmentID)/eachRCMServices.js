const prisma = require('../../../../prisma')

require('dotenv').config()

const getDataSpecificPCPRecruitID = async (recruitmentID = '') => {

    const search = await prisma.projectparticipantrecruit.findUnique({
        where: {
            participantRecruitID: recruitmentID
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
            yearAllowed: true
        }
    })

    return search
}

const getDataSpecificSTFRecruitID = async (recruitmentID = '') => {

    const search = await prisma.projectstaffrecruit.findUnique({
        where: {
            staffRecruitID: recruitmentID
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


const getDataSpecificRecruitID = async (recruitmentID = '') => {

    // check if this id was PCP or STF
    const isPCP = recruitmentID.includes('PCP')

    if (isPCP) {
        // participant recruit id
        return getDataSpecificPCPRecruitID(recruitmentID)

    } else {
        // STF id
        return getDataSpecificSTFRecruitID(recruitmentID)

    }

}

const editDataSpecificRecruitID = async (recruitmentID = '', data) => {

    // check if this id was PCP or STF
    const isPCP = recruitmentID.includes('PCP')

    if (isPCP) {
        // participant recruit id

        const edited = await prisma.projectparticipantrecruit.update({
            where: {
                participantRecruitID: recruitmentID,
            },
            data: {
                updatedDateTime: new Date(),
                ...data
            }
        })


        return edited


    } else {

        // STF id
        const edited = await prisma.projectstaffrecruit.update({
            where: {
                staffRecruitID: recruitmentID
            },
            data: {
                updatedDateTime: new Date(),
                ...data
            }
        })

        return edited

    }


}

const deleteDataSpecificRecruitID = async (recruitmentID = '', confirmed = false) => {

    // check if this id was PCP or STF
    const isPCP = recruitmentID.includes('PCP')

    if (!confirmed) {
        throw {
            code: 'DECLINED-CONFIRM-DELETE',
            desc: { userData: { recruitmentID, confirmed } }
        }
    } else {
        if (isPCP) {
            // participant recruit id

            const edited = await prisma.projectparticipantrecruit.delete({
                where: {
                    participantRecruitID: recruitmentID,
                }
            })


            return {}


        } else {

            // STF id
            const edited = await prisma.projectstaffrecruit.delete({
                where: {
                    staffRecruitID: recruitmentID
                }
            })

            return {}

        }
    }



}


const getDataSpecificPositionID = async (positionID = '') => {


    const search = await prisma.projectstaffrecruitposition.findUnique({
        where: {
            staffPositionID: positionID
        }
    })

    return search

}

const getAllUserInSpecificRecruitID = async (recruitmentID = '') => {

    // check if this id was PCP or STF
    const isPCP = recruitmentID.includes('PCP')

    if (isPCP) {
        // participant recruit id

        const search = await prisma.projectparticipants.findMany({
            where: {
                recruitID: recruitmentID
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

        return search


    } else {

        // STF id
        const search = await prisma.projectstaffs.findMany({
            where: {
                recruitID: recruitmentID
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

        return search

    }
}



module.exports = {
    getDataSpecificRecruitID,
    editDataSpecificRecruitID,
    deleteDataSpecificRecruitID,

    getAllUserInSpecificRecruitID,
    getDataSpecificPositionID
}