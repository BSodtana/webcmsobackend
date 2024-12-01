const prisma = require("../../../../prisma")

const generateNumberForCertificate = async (projectID) => {


    const countNumNow = await prisma.projectcertificatelist.count({
        where: {
            projectID: projectID
        }
    })

    let numberNow = countNumNow
    let isFound = false

    while (!isFound) {
        const newID = `${projectID}-${(numberNow).toString().padStart(4, '0')}`
        const search = await prisma.projectcertificatelist.findUnique({
            where: {
                certificateID: newID
            }
        })

        if (!search) {
            break
        } else {
            numberNow++
        }

    }

    return `${projectID}-${(numberNow).toString().padStart(4, '0')}`


}

module.exports = {
    generateNumberForCertificate
}