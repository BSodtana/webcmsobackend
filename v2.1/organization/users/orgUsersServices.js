require('dotenv').config()
const prisma = require('../../prisma')

const getUsersInSpecifigOrg = async (orgID) => {
    const search = await prisma.useraffiliation.findMany({
        where: {
            affiliatedOrg: orgID
        },
        select: {
            affiliationID: true,
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


module.exports = {
    getUsersInSpecifigOrg
}