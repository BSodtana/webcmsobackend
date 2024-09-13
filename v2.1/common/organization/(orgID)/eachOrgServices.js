require('dotenv').config()
const prisma = require('../../../prisma')

// const getProjectBriefData = async (projectID) => {

//     const search = await prisma.projects.findUnique({
//         where: {
//             projectID: projectID
//         },
//         include: {
//             projectdata: {
//                 select: {
//                     placeInCMU: true,
//                     placeOutsideCMU: true
//                 }
//             }
//         }
//     })

//     // if search = 0
//     if (!search) {
//         throw {
//             code: 'GET-PROJECT-BRIEF-DATA-NOT-EXIST',
//             desc: { userData: { projectID }, search }
//         }
//     } else {
//         return search
//     }

// }

// const putProjectBriefData = async (projectID, data) => {

//     const updatedResults = await prisma.projects.update({
//         where: {
//             projectID: projectID
//         },
//         data: {
//             ...data,
//             updatedDateTime: new Date()
//         }
//     })

//     return updatedResults
// }

// const deleteProjectBriefData = async (projectID, confirmed = false) => {


//     // check if confirmed?
//     if (!confirmed) {

//         throw {
//             code: 'DECLINED-CONFIRM-DELETE',
//             desc: { userData: { projectID, confirmed } }
//         }

//     } else {

//         const deleteResult = await prisma.projects.delete({
//             where: {
//                 projectID: projectID
//             }
//         })

//         return deleteResult


//     }

// }

const getSpecificOrgDetails = async (orgID) => {
    const data = await prisma.organizations.findUniqueOrThrow({
        where: {
            orgID: orgID
        },
        select: {
            orgID: true,
            orgName: true,
            orgDesc: true,
            orgImageID: true,
            orgType: true,
            parentOrg: true,
            studentID: true
        }
    })

    return data
}


const editOrgSpecific = async (orgID = '', orgName, orgDesc, orgImageID, orgType, parentOrg) => {
    const edited = await prisma.organizations.update({
        where: {
            orgID: orgID
        },
        data: {
            updatedDateTime: new Date(),
            orgName: orgName,
            orgDesc: orgDesc,
            orgImageID: orgImageID,
            orgType: orgType,
            parentOrg: parentOrg
        },
        select: {
            orgID: true,
            orgName: true,
            orgDesc: true,
            orgImageID: true,
            orgType: true,
            parentOrg: true,
            studentID: true
        }
    })
    return edited
}


const getSubOrgList = async (orgID) => {

    const data = await prisma.organizations.findMany({
        where: {
            parentOrg: orgID
        },
        select: {
            orgID: true,
            orgName: true,
            orgDesc: true,
            orgImageID: true,
            orgType: true,
            parentOrg: true
        }
    })

    return data
}


module.exports = {
    getSpecificOrgDetails,
    getSubOrgList
}