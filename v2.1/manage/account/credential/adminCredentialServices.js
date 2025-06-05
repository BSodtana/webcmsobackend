require('dotenv').config()
const prisma = require('../../../prisma');
const { nanoid } = require('nanoid')
const bcrypt = require('bcrypt')


const adminSearchUUIDfromStudentID = async (studentID = null) => {

    try {
        const search = await prisma.usercredentials.findUnique({
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

        if (!search) {
            throw {
                code: 'ADMIN-MANAGE-CREDENTIAL-GET-UUID-FAILED-STDID-NOT-EXIST',
                desc: { userData: { studentID } }
            }
        } else {
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

    } catch (error) {

        throw {
            code: error.code,
            desc: error.desc || { userData: { studentID } }
        }
    }

}

const adminSetUserEmailPassword = async (studentID, email, password) => {

    // gen new uuid
    // check if this uuid was used
    let uuid = ''
    let uniqueUUID = false
    while (!uniqueUUID) {
        uuid = nanoid(10)
        const checkUUID = await prisma.usercredentials.findUnique({
            where: {
                uuid: uuid,
            },
        })
        if (!checkUUID) break
    }


    if (await checkIfEmailWasRegistered(email)) {
        throw {
            code: 'ADMIN-MANAGE-CREDENTIAL-ADD-NEW-CRED-ERROR-EMAIL-EXIST',
            desc: { userData: { email } }
        }
    } else {
        // new unique email

        // gen bcrypt password

        try {
            const hashedPW = await bcrypt.hash(password, 14)

            // password was hashed, then create new data
            const newData = await prisma.usercredentials.create({
                data: {
                    uuid: uuid,
                    studentID: studentID,
                    email: email,
                    hashPassword: hashedPW,
                    createdDateTime: new Date(),
                    updatedDateTime: new Date(),
                    role: 'USER',
                    emailVerified: 1
                }
            })

            // return data
            return {
                uuid: newData.uuid,
                studentID: newData.studentID,
                email: newData.email,
                createdDateTime: newData.createdDateTime,
                updatedDateTime: newData.updatedDateTime,
                role: newData.role,
                emailVerified: newData.emailVerified
            }

        } catch (error) {
            throw {
                code: error?.code || 'BCRYPT-ERROR',
                desc: error?.desc || { userData: { studentID, email } },
            }
        }

    }

}

const checkIfStdIDWasRegistered = async (studentID = '') => {
    const search = await prisma.usercredentials.findMany({
        where: {
            studentID: studentID
        }
    })

    if (search.length !== 0) {
        // this student id was already used for register
        return true
    } else {
        return false
    }

}

const checkIfEmailWasRegistered = async (email = '') => {
    const search = await prisma.usercredentials.findMany({
        where: {
            email: email
        }
    })
    // console.log('search email', email, search);


    if (search.length !== 0) {
        // this email was already used for register
        return true
    } else {
        return false
    }

}


module.exports = {
    adminSearchUUIDfromStudentID,
    adminSetUserEmailPassword,

    checkIfStdIDWasRegistered,
    checkIfEmailWasRegistered
}