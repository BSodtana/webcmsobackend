const prisma = require('../prisma')

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

const getAllUserData = async () => {

    const data = await prisma.users.findMany()

    return data

}

const getSpecificUserData = async (studentID) => {

    const data = await prisma.users.findUniqueOrThrow({
        where: {
            studentID: studentID
        }
    })

    return data
}

const postData = async (orgID, orgName, orgType = 'DIVISION', orgParent = '') => {
    const data = await prisma.organizations.upsert({
        where: {
            orgID: orgID
        },
        update: {
            orgName: orgName,
            orgType: orgType,
            parentOrg: orgParent
        },
        create: {
            orgID: orgID,
            orgName: orgName,
            orgType: orgType,
            parentOrg: orgParent

        }
    })

    return data
}

module.exports = {
    helloWorld,
    getAllUserData,
    getSpecificUserData,
    postData
}