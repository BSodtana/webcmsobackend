require('dotenv').config()
const { newAffiliationID } = require('../../_helpers/id_generator/affiliationIDGen')
const prisma = require('../../prisma')

const getUsersInSpecifigOrg = async (orgID) => {
    const search = await prisma.useraffiliation.findMany({
        where: {
            affiliatedOrg: orgID
        },
        select: {
            affiliationID: true,
            affiliationType: true,
            organizations: {
                select: {
                    orgID: true,
                    orgName: true,

                }
            },
            users: {
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
            },
            createdDateTime: true
        },
        orderBy: {
            studentID: 'asc'
        },
    })

    return search.map((each) => {
        return {
            affiliationID: each.affiliationID,
            affiliationType: each.affiliationType,

            orgID: each.organizations?.orgID || null,
            orgName: each.organizations?.orgName || null,

            studentID: each.users?.studentID || null,
            titleTH: each.users?.titleTH || null,
            firstNameTH: each.users?.firstNameTH || null,
            lastNameTH: each.users?.lastNameTH || null,
            nickNameTH: each.users?.nickNameTH || null,

            titleEN: each.users?.titleEN || null,
            firstNameEN: each.users?.firstNameEN || null,
            lastNameEN: each.users?.lastNameEN || null,

            currentYear: each.users?.currentYear || null,

            createdDateTime: each.createdDateTime

        }
    })
}

const addUserToOrg = async (studentID, orgID, affiliationType = 'MEMBER') => {

    // check if this user already in org
    const searchList = await getUsersInSpecifigOrg(orgID)
    const search = searchList.filter((member) => member.studentID == studentID)

    if (search.length !== 0) {

        // this user is already exists in org
        throw {
            code: 'ADD-USER-TO-ORG-ALREADY-JOINED-ERROR',
            desc: { userData: { studentID, orgID } },
        }

    } else {

        const newID = await newAffiliationID(orgID)

        const addData = await prisma.useraffiliation.create({
            data: {
                affiliationID: newID,
                affiliatedOrg: orgID,
                studentID: studentID,
                affiliationType: affiliationType
            }
        })


        // craft response
        const searchList = await getUsersInSpecifigOrg(orgID)
        const search = searchList.filter((member) => member.studentID == studentID)
        return search[0]

    }

}


module.exports = {
    getUsersInSpecifigOrg,
    addUserToOrg
}