const prisma = require("../../prisma")

const newAffiliationID = async (orgID) => {

    // search number now
    const searchAll = await prisma.useraffiliation.findFirst({
        where: {
            affiliatedOrg: orgID
        },
        orderBy: {
            affiliationID: 'desc'
        }
    })

    // get number
    const lastNumber = searchAll.affiliationID.split('-')[2]

    // convert to number and add 1
    const newnum = parseInt(lastNumber) + 1
    const newnumStr = newnum.toString().padStart(3, '0')
    const newID = `${orgID}-POSORG-${newnumStr}`

    return newID
}

module.exports = {
    newAffiliationID
}