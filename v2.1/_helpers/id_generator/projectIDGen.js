const prisma = require("../../prisma")

const newProjectID = async (academicYear = "2025", semester = '01', added = 0) => {

    // search projectID number now
    const searchAll = await prisma.projects.findFirst({
        where: {
            projectID: {
                startsWith: academicYear.slice(-2) + semester
            }
        },
        orderBy: {
            projectID: 'desc'
        }
    })

    // get number
    const lastNumber = searchAll?.projectID?.slice(-3) || "000"

    // convert to number and add 1
    const newnum = parseInt(lastNumber) + 1 + added
    const newnumStr = newnum.toString().padStart(3, '0')
    const newID = `${academicYear.slice(-2)}${semester}${newnumStr}`

    return newID
}

module.exports = {
    newProjectID
}