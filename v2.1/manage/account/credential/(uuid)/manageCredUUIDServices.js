require('dotenv').config()
const prisma = require('../../../../prisma');

const adminGetDataFromUUID = async (uuid = null) => {

    const search = await prisma.usercredentials.findUniqueOrThrow({
        where: {
            uuid: uuid
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

const adminDeleteCredentialDataFromUUID = async (uuid = null) => {
    try {
        const search = await prisma.usercredentials.delete({
            where: {
                uuid: uuid
            }
        })

        return {
            success: true
        }

    } catch (error) {
        throw {
            code: error?.code,
            desc: error?.desc || { userData: { uuid } }
        }

    }



}

module.exports = {
    adminGetDataFromUUID,
    adminDeleteCredentialDataFromUUID
}