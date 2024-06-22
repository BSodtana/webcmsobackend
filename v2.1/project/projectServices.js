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
    searchListProjectByNamePage
}