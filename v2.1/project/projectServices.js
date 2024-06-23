require('dotenv').config()
const prisma = require('../prisma')

const getAnnouncementList = async (project = null) => {

    const search = await prisma.cmsoprojectannouncement.findMany({
        where: { projectID: project },
        include: {
            users: {
                select: {
                    studentID: true,
                    titleTH: true,
                    firstNameTH: true,
                    lastNameTH: true
                }
            }
        }
    })

    return search

}

const updateAnnouncement = async (announcementID, editedStudentID, data) => {

    const edit = await prisma.cmsoprojectannouncement.update({
        where: {
            announcementID: announcementID
        },
        data: {
            ...data,
            studentID: editedStudentID,
            updatedDateTime: new Date(),
        }
    })

    return edit

}

const deleteAnnouncement = async (announcementID, confirmed = false) => {

    // check if confirmed?
    if (!confirmed) {

        throw {
            code: 'DECLINED-CONFIRM-DELETE',
            desc: { userData: { announcementID, confirmed } }
        }

    } else {

        const deleteResult = await prisma.cmsoprojectannouncement.delete({
            where: {
                announcementID: announcementID
            }
        })

        return {}

    }

}

const newAnnouncement = async (studentID, isGlobal = false, projectID = null, data) => {

    // check number of the announcement so it wont collide with previous announcement
    const search = await getAnnouncementList(projectID)
    const count = search.length
    const newNum = count + 1
    const numFormatPadding = newNum.toString().padStart(4, '0') // 4 digit string with leading 0


    if (isGlobal) {
        // if global announcement
        const newAnnoun = await prisma.cmsoprojectannouncement.create({
            data: {
                announcementID: `GLOBAL-A${numFormatPadding}`,
                studentID: studentID,
                projectID: null,
                announcementTitle: data.announcementTitle || 'New announcement',
                announcementBody: data.announcementBody || null,
                announcementCTALink: data.announcementCTALink || null,
            }
        })

        return newAnnoun

    } else {
        // announcement project specific

        const newAnnoun = await prisma.cmsoprojectannouncement.create({
            data: {
                announcementID: `${projectID}-A${numFormatPadding}`,
                studentID: studentID,
                projectID: projectID,
                announcementTitle: data.announcementTitle || 'New announcement',
                announcementBody: data.announcementBody || null,
                announcementCTALink: data.announcementCTALink || null,
            }
        })

        return newAnnoun

    }

}

const searchListProjectByNamePage = async (searchByName = '', language = 'TH', page = 1) => {

    if (language === 'EN') {
        // if language is en -> search en
        const search = await prisma.projects.findMany({
            skip: (page - 1) * 20,
            take: 20,
            where: {
                OR: [
                    {
                        projectNameEN: {
                            contains: searchByName
                        }
                    },
                    {
                        projectNickNameEN: {
                            contains: searchByName
                        }
                    }
                ]
            }
        })

        return search


    } else {
        // else -> default seach = if language is th
        const search = await prisma.projects.findMany({
            skip: (page - 1) * 20,
            take: 20,
            where: {

                OR: [
                    {
                        projectNameTH: {
                            contains: searchByName
                        }
                    },
                    {
                        projectNickNameTH: {
                            contains: searchByName
                        }
                    }
                ]
            }
        })

        return search

    }


}

module.exports = {
    getAnnouncementList,
    updateAnnouncement,
    deleteAnnouncement,
    newAnnouncement,

    searchListProjectByNamePage
}