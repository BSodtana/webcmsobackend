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
            parentOrg: true,
            studentID: true
        }
    })

    return data
}

const getProjectOrgOwned = async (orgID) => {
    const search = await prisma.projects.findMany({
        where: {
            orgID: orgID
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

            eventDateStart: true,
            eventDateFinish: true,

            academicYear: true,
            projectdata: {
                select: {
                    placeInCMU: true,
                    placeOutsideCMU: true
                }
            }
        }
    })

    return search.map((each) => {
        return {
            projectID: each.projectID,
            studentID: each.studentID,
            orgID: each.orgID,

            projectNameTH: each.projectNameTH,
            projectNickNameTH: each.projectNickNameTH,
            projectShortDescriptionTH: each.projectShortDescriptionTH,

            projectNameEN: each.projectNameEN,
            projectNickNameEN: each.projectNickNameEN,

            eventDateStart: each.eventDateStart,
            eventDateFinish: each.eventDateFinish,

            academicYear: each.academicYear,

            placeInCMU: each.projectdata?.placeInCMU || null,
            placeOutsideCMU: each.projectdata?.placeOutsideCMU || null

        }
    })

}


module.exports = {
    getSpecificOrgDetails,
    editOrgSpecific,
    getProjectOrgOwned,

    getSubOrgList
}