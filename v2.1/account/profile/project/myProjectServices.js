const prisma = require('../../../prisma')

require('dotenv').config()

const getProjectMyOwn = async (studentID = '') => {
    const searchProject = await prisma.projects.findMany({
        where: {
            studentID: studentID
        }
    })

    return searchProject
}


module.exports = {
    getProjectMyOwn
}