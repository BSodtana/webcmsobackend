const prisma = require('../../prisma')

require('dotenv').config()


const getPrelimDataFromStudentID = async (studentID) => {

    const data = prisma.users.findUnique({
        where: {
            studentID: studentID
        }
    })

    return data
}

module.exports = {

    getPrelimDataFromStudentID
}