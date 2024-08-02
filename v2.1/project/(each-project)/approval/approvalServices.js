require('dotenv').config()
const prisma = require('../../../prisma')

const getProjectConsiderationData = async (projectID) => {

    const data2 = await prisma.projectconsiderationstatus.findFirst({
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



module.exports = {
    getProjectConsiderationData
}