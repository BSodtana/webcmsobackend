require('dotenv').config()
const prisma = require('../prisma')

const allConsiderationData = async () => {
    const data = await prisma.projectconsiderationstatus.findMany({
        select: {
            projectID: true,
            statusVP: true,
            statusFinance: true,
            statusSec: true,
            statusPresent: true,
            updatedDTM: true,
            projectConsiderationType: true,
            dateApprovalDoc: true,
            dateOtherDoc: true,
            dateActionPlan: true,
            dateReceipt: true,
            dateFinalize: true,
            projectType: true,
            comment: true
        }
    })
}

module.exports = {
    allConsiderationData
}