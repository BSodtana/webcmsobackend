const prisma = require('../../../../../../prisma')

require('dotenv').config()

const getDataSpecificRecruitID = async (recruitmentID = '') => {

    // check if this id was PCP or STF
    const isPCP = recruitmentID.includes('PCP')

    if (isPCP) {
        // participant recruit id

        const search = await prisma.projectparticipantrecruit.findUnique({
            where: {
                participantRecruitID: recruitmentID
            }
        })

        return search


    } else {

        // STF id
        const search = await prisma.projectstaffrecruit.findUnique({
            where: {
                staffRecruitID: recruitmentID
            },
            include: {
                projectstaffrecruitposition: true
            }
        })

        return search

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

const getDataStaffSpecificPositionID = async (positionID = '') => {
    const search = await prisma.projectstaffrecruitposition.findUnique({
        where: {
            staffPositionID: positionID
        }
    })

    return search
}


module.exports = {
    getDataSpecificRecruitID,
    editDataSpecificRecruitID,
    deleteDataSpecificRecruitID,

    getDataStaffSpecificPositionID
}