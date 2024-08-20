require('dotenv').config()
const prisma = require('../../../prisma')

const getProjectConsiderationInfoData = async (projectID) => {

    const data2 = await prisma.projectconsiderationstatus.findFirstOrThrow({
        where: {
            projectID: projectID
        },
        select: {
            projectID: true,

            projectConsiderationType: true,
            projectType: true,

            dateApprovalDoc: true,
            dateOtherDoc: true,
            dateActionPlan: true,
            dateReceipt: true,
            dateFinalize: true,

            updatedDatetime: true,

        }

    })
    return data2
}

const editProjectConsiderationInfoData = async (projectID, projectConsiderationType, projectType, dateApprovalDoc, dateOtherDoc, dateActionPlan, dateReceipt, dateFinalize) => {

    if (projectConsiderationType) {
        const editConsiderType = await prisma.projectconsiderationstatus.update({
            where: {
                projectID: projectID
            },
            data: {
                projectConsiderationType,

                updatedDatetime: new Date()
            }

        })
    }

    if (projectType) {
        const editProjectType = await prisma.projectconsiderationstatus.update({
            where: {
                projectID: projectID
            },
            data: {
                projectType,

                updatedDatetime: new Date()
            }

        })

    }

    if (dateApprovalDoc || dateOtherDoc || dateActionPlan || dateReceipt || dateFinalize) {
        const editInfo = await prisma.projectconsiderationstatus.update({
            where: {
                projectID: projectID
            },
            data: {

                dateApprovalDoc,
                dateOtherDoc,
                dateActionPlan,
                dateReceipt,
                dateFinalize,

                updatedDatetime: new Date()
            }

        })
    }

    return getProjectConsiderationInfoData(projectID)
}

const getProjectConsiderationDataOnlyStatusData = async (projectID) => {

    const data2 = await prisma.projectconsiderationstatus.findFirstOrThrow({
        where: {
            projectID: projectID
        },
        select: {
            projectID: true,

            statusVP: true,
            statusFinance: true,
            statusSec: true,
            statusPresent: true,
            comment: true,

            updatedDatetime: true,
        }

    })
    return data2
}

const editProjectConsiderationDataOnlyStatus = async (projectID, statusVP, statusFinance, statusSec, statusPresent, comment) => {

    const data2 = await prisma.projectconsiderationstatus.update({
        where: {
            projectID: projectID
        },
        data: {

            statusVP,
            statusFinance,
            statusSec,
            statusPresent,
            comment,

            updatedDatetime: new Date(),
        }

    })
    return getProjectConsiderationDataOnlyStatusData(projectID)
}

module.exports = {
    getProjectConsiderationInfoData,
    editProjectConsiderationInfoData,

    getProjectConsiderationDataOnlyStatusData,
    editProjectConsiderationDataOnlyStatus
}