require('dotenv').config()
const prisma = require('../../prisma')

const listAllOrgCMSO = async () => {
    const lists = await prisma.organizations.findMany({
        select: {
            orgID: true,
            orgName: true,
            orgImageID: true,
            orgType: true,
            parentOrg: true
        }
    })

    return lists
}

module.exports = {
    listAllOrgCMSO
}