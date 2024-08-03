require('dotenv').config()
const prisma = require('../../../../../../prisma')

// const getDataSpecificRecruitID = async (recruitmentID = '') => {

//     // check if this id was PCP or STF
//     const isPCP = recruitmentID.includes('PCP')

//     if (isPCP) {
//         // participant recruit id

//         const search = await prisma.projectparticipantrecruit.findUnique({
//             where: {
//                 participantRecruitID: recruitmentID
//             }
//         })

//         return search


//     } else {

//         // STF id
//         const search = await prisma.projectstaffrecruit.findUnique({
//             where: {
//                 staffRecruitID: recruitmentID
//             },
//             include: {
//                 projectstaffrecruitposition: true
//             }
//         })

//         return search

//     }

// }

// const editDataSpecificRecruitID = async (recruitmentID = '', data) => {

//     // check if this id was PCP or STF
//     const isPCP = recruitmentID.includes('PCP')

//     if (isPCP) {
//         // participant recruit id

//         const edited = await prisma.projectparticipantrecruit.update({
//             where: {
//                 participantRecruitID: recruitmentID,
//             },
//             data: {
//                 updatedDateTime: new Date(),
//                 ...data
//             }
//         })


//         return edited


//     } else {

//         // STF id
//         const edited = await prisma.projectstaffrecruit.update({
//             where: {
//                 staffRecruitID: recruitmentID
//             },
//             data: {
//                 updatedDateTime: new Date(),
//                 ...data
//             }
//         })

//         return edited

//     }


// }

// const deleteDataSpecificRecruitID = async (recruitmentID = '', confirmed = false) => {

//     // check if this id was PCP or STF
//     const isPCP = recruitmentID.includes('PCP')

//     if (!confirmed) {
//         throw {
//             code: 'DECLINED-CONFIRM-DELETE',
//             desc: { userData: { recruitmentID, confirmed } }
//         }
//     } else {
//         if (isPCP) {
//             // participant recruit id

//             const edited = await prisma.projectparticipantrecruit.delete({
//                 where: {
//                     participantRecruitID: recruitmentID,
//                 }
//             })


//             return {}


//         } else {

//             // STF id
//             const edited = await prisma.projectstaffrecruit.delete({
//                 where: {
//                     staffRecruitID: recruitmentID
//                 }
//             })

//             return {}

//         }
//     }



// }

const getDataStaffSpecificPositionID = async (positionID = '') => {
    const search = await prisma.projectstaffrecruitposition.findUnique({
        where: {
            staffPositionID: positionID
        }
    })

    return search
}

const createNewStaffPosition = async (recruitID, positionName = 'ชื่อหน้าที่ใหม่', maxNumber = 1, isAllowed = 0) => {


    try {
        // generate new posID
        const newID = await getNewStaffPositionID(recruitID)

        // create new position from new posID
        const newPos = await prisma.projectstaffrecruitposition.create({
            data: {
                staffPositionID: newID,
                recruitID: recruitID,
                positionName: positionName,
                maxNumber: maxNumber,
                createdDateTime: new Date(),
                updatedDateTime: new Date(),
                isAllowed: isAllowed
            }
        })

        return {
            "staffPositionID": newPos.staffPositionID,
            "positionName": newPos.positionName,
            "maxNumber": newPos.maxNumber,
            "createdDateTime": newPos.createdDateTime,
            "isAllowed": newPos.isAllowed
        }

    } catch (error) {
        throw {
            code: 'RECRUIT-STAFF-POS-CREATE-ERROR',
            desc: { userData: { recruitID, positionName, maxNumber, isAllowed }, error }
        }
    }


}

const getNewStaffPositionID = async (recruitmentID = '') => {

    // search for position in this recruitmentID
    const search = await prisma.projectstaffrecruitposition.findMany({
        where: {
            recruitID: recruitmentID
        }
    })
    const newPosNum = search.length + 1

    // check if this posNum already exist
    let runNum = newPosNum
    let searchNum = true
    do {

        const searchNewNum = await prisma.projectstaffrecruitposition.findFirst({
            where: {
                staffPositionID: `${recruitmentID}-POS${runNum.toString().padStart(3, '0')}`
            }
        })


        if (searchNewNum?.staffPositionID) {
            runNum += 1
        } else {
            searchNum = false
        }

    } while (searchNum)


    return `${recruitmentID}-POS${runNum.toString().padStart(3, '0')}`

}

const editStaffPositionData = async (positionID, data) => {


    const edited = await prisma.projectstaffrecruitposition.update({
        where: {
            staffPositionID: positionID
        },
        data: {
            updatedDateTime: new Date(),
            ...data
        }
    })

    return {
        "staffPositionID": edited.staffPositionID,
        "positionName": edited.positionName,
        "maxNumber": edited.maxNumber,
        "updatedDateTime": edited.updatedDateTime,
        "isAllowed": edited.isAllowed
    }

}

const deleteStaffPositionData = async (positionID = '', confirmed = false) => {
    if (!confirmed) {
        throw {
            code: 'DECLINED-CONFIRM-DELETE',
            desc: { userData: { positionID, confirmed } }
        }
    } else {

        const del = await prisma.projectstaffrecruitposition.delete({
            where: {
                staffPositionID: positionID
            }
        })

        return {}

    }
}



module.exports = {
    // getDataSpecificRecruitID,
    // editDataSpecificRecruitID,
    // deleteDataSpecificRecruitID,

    getDataStaffSpecificPositionID,
    createNewStaffPosition,
    editStaffPositionData,
    deleteStaffPositionData
}