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
            updatedDateTime: true
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

            updatedDateTime: each.updatedDateTime

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

const getDataFromAffID = async (affiliationID) => {

    const search = await prisma.useraffiliation.findFirstOrThrow({
        where: {
            affiliationID: affiliationID
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
            updatedDateTime: true
        },
    })


    return {
        affiliationID: search.affiliationID,
        affiliationType: search.affiliationType,

        orgID: search.organizations?.orgID || null,
        orgName: search.organizations?.orgName || null,

        studentID: search.users?.studentID || null,
        titleTH: search.users?.titleTH || null,
        firstNameTH: search.users?.firstNameTH || null,
        lastNameTH: search.users?.lastNameTH || null,
        nickNameTH: search.users?.nickNameTH || null,

        titleEN: search.users?.titleEN || null,
        firstNameEN: search.users?.firstNameEN || null,
        lastNameEN: search.users?.lastNameEN || null,

        currentYear: search.users?.currentYear || null,

        updatedDateTime: search.updatedDateTime

    }

}

const editDataFromAffID = async (affiliationID, affiliationType = 'MEMBER') => {

    const update = await prisma.useraffiliation.update({
        where: {
            affiliationID: affiliationID
        },
        data: {
            affiliationType: affiliationType,
            updatedDateTime: new Date()
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
            updatedDateTime: true
        },
    })

    return {
        affiliationID: update.affiliationID,
        affiliationType: update.affiliationType,

        orgID: update.organizations?.orgID || null,
        orgName: update.organizations?.orgName || null,

        studentID: update.users?.studentID || null,
        titleTH: update.users?.titleTH || null,
        firstNameTH: update.users?.firstNameTH || null,
        lastNameTH: update.users?.lastNameTH || null,
        nickNameTH: update.users?.nickNameTH || null,

        titleEN: update.users?.titleEN || null,
        firstNameEN: update.users?.firstNameEN || null,
        lastNameEN: update.users?.lastNameEN || null,

        currentYear: update.users?.currentYear || null,

        updatedDateTime: update.updatedDateTime

    }

}

const deleteDataFromAffID = async (affiliationID, confirm = false) => {


    if (confirm) {
        const deletedData = await prisma.useraffiliation.delete({
            where: {
                affiliationID: affiliationID
            }
        })
        return {}
    } else {
        throw {
            code: 'DECLINED-CONFIRM-DELETE',
            desc: { userData: { affiliationID, confirm } },
        }
    }


}


module.exports = {
    getUsersInSpecifigOrg,
    addUserToOrg,
    getDataFromAffID,
    editDataFromAffID,
    deleteDataFromAffID
}