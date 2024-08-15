const prisma = require('../../prisma')

require('dotenv').config()

const getUserBriefPersonalData = async (studentID) => {
// prelim data
    const data = await prisma.users.findUnique({
        where: {
            studentID: studentID
        },
        select: {
            studentID: true,
            titleTH: true,
            firstNameTH: true,
            lastNameTH: true,
            nickNameTH: true,
            titleEN: true,
            firstNameEN: true,
            lastNameEN: true,
            currentYear: true,
            
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

const getUserFullPersonalData = async (studentID) => {
// profile personal data
    const data = await prisma.users.findUnique({
        where: {
            studentID: studentID
        },
        select: {
            studentID: true,
            titleTH: true,
            firstNameTH: true,
            lastNameTH: true,
            nickNameTH: true,
            titleEN: true,
            firstNameEN: true,
            lastNameEN: true,
            currentYear: true,
            admissionCategory: true,
            phoneNumber: true,
            lineID: true,
            facebook: true,
            instagram: true,
            medicalCondition: true,
            allergy: true,
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
//put personal data
    const updatedResults = await prisma.users.upsert({
        where: {
            studentID: studentID
        },
        update: {
            ...data,
            updatedDateTime: new Date()
        },
        create: {},
        select: {
            studentID: true,
            titleTH: true,
            firstNameTH: true,
            lastNameTH: true,
            nickNameTH: true,
            titleEN: true,
            firstNameEN: true,
            lastNameEN: true,
            currentYear: true,
            admissionCategory: true,
            phoneNumber: true,
            lineID: true,
            facebook: true,
            instagram: true,
            medicalCondition: true,
            allergy: true,
        }
    })

    return updatedResults

}

const getUserFullCredentialData = async (studentID) => {

    const data = await prisma.usercredentials.findUnique({
        where: {
            studentID: studentID
        },
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
    getUserBriefPersonalData,
    getUserFullPersonalData,
    putUserFullPersonalData,

    getUserFullCredentialData
}