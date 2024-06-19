const prisma = require('../../prisma')

require('dotenv').config()

const helloWorld = async (name) => {

    const data = await prisma.users.update({
        where: {
            studentID: '660710000'
        },
        data: {
            firstNameTH: name
        }
    })
    console.log('data', data)

    return {
        name: name,
        text: `Hello ${name}`,
        data: data
    }

}

const getUserFullPersonalData = async (studentID) => {

    const data = await prisma.users.findUnique({
        where: {
            studentID: studentID
        }
    })

    if (!data) {
        throw {
            code: 'PERSONAL-DATA-NO-INFORMATION',
            desc: { userData: { studentID }, data }
        }
    } else {
        return data
    }

}

const putUserFullPersonalData = async (studentID, data) => {

    const updatedResults = await prisma.users.upsert({
        where: {
            studentID: studentID
        },
        update: {
            ...data,
            updatedDateTime: new Date()
        },
        create: {}
    })

    return updatedResults

}

const getUserFullCredentialData = async (studentID) => {

    const data = await prisma.usercredentials.findUnique({
        where: {
            studentID: studentID
        }
    })

    if (!data) {
        throw {
            code: 'CREDENTIAL-DATA-NO-INFORMATION',
            desc: { userData: { studentID }, data }
        }
    } else {
        return data
    }

}

module.exports = {
    helloWorld,

    getUserFullPersonalData,
    putUserFullPersonalData,

    getUserFullCredentialData
}