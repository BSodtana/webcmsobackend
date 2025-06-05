require('dotenv').config()
const prisma = require('../../../prisma');

const adminSearchUUIDfromStudentID = async (studentID = null) => {

    const search = await prisma.usercredentials.findUniqueOrThrow({
        where: {
            studentID: studentID
        },
        select: {
            uuid: true,
            studentID: true,
            email: true,
            createdDateTime: true,
            updatedDateTime: true,
            role: true,
            emailVerified: true
        }
    })

    return {
        uuid: search.uuid,
        studentID: search.studentID,
        email: search.email,
        createdDateTime: search.createdDateTime,
        updatedDateTime: search.updatedDateTime,
        role: search.role,
        emailVerified: search.emailVerified
    }

}


module.exports = {
    adminSearchUUIDfromStudentID,
}