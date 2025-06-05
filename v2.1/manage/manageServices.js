require('dotenv').config()
const { newProjectID } = require('../_helpers/id_generator/projectIDGen');
const prisma = require('../prisma');
const { getProjectBriefData } = require('./(each-project)/eachProjectServices');

const getAnnouncementList = async (project = null) => {
    console.log('[getAnnouncementList]', project);

    const search = await prisma.cmsoprojectannouncement.findMany({
        where: { projectID: project },
        select: {
            announcementID: true,
            studentID: true,
            projectID: true,
            isPublic: true,
            announcementTitle: true,
            announcementBody: true,
            announcementCTALink: true,
            isAnnouncementPinned: true,
            announcementTarget: true,
            updatedDateTime: true,
            users: {
                select: {
                    titleTH: true,
                    firstNameTH: true,
                    lastNameTH: true
                }
            }
        }
    })

    return search.map((each) => {
        return {
            announcementID: each.announcementID,
            studentID: each.studentID,
            projectID: each.projectID,
            announcementTitle: each.announcementTitle,
            announcementBody: each.announcementBody,
            announcementCTALink: each.announcementCTALink,

            isPublic: each.isPublic,
            isAnnouncementPinned: each.isAnnouncementPinned,
            announcementTarget: each.announcementTarget.split(','),

            updatedDateTime: each.updatedDateTime,

            titleTH: each.users?.titleTH || null,
            firstNameTH: each.users?.firstNameTH || null,
            lastNameTH: each.users?.lastNameTH || null,
        }
    })

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

const searchListProjectByNamePage = async (searchByName = '', language = 'TH', page = 1, ended = false) => {

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
                ],
                AND: ended ? {} : {
                    eventDateFinish: {
                        gte: new Date()
                    }
                }

            },
            orderBy: {
                eventDateFinish: {
                    sort: 'asc',
                    nulls: 'last'
                }
            },
            select: {
                projectID: true,
                studentID: true,
                orgID: true,

                projectNameTH: true,
                projectNickNameTH: true,
                projectShortDescriptionTH: true,

                projectNameEN: true,
                projectNickNameEN: true,

                eventDateStart: true,
                eventDateFinish: true,

                academicYear: true,
                projectdata: {
                    select: {
                        placeInCMU: true,
                        placeOutsideCMU: true
                    }
                }
            }

        })

        return search.map((each) => {
            return {
                projectID: each.projectID,
                studentID: each.studentID,
                orgID: each.orgID,

                projectNameTH: each.projectNameTH,
                projectNickNameTH: each.projectNickNameTH,
                projectShortDescriptionTH: each.projectShortDescriptionTH,

                projectNameEN: each.projectNameEN,
                projectNickNameEN: each.projectNickNameEN,

                eventDateStart: each.eventDateStart,
                eventDateFinish: each.eventDateFinish,

                academicYear: each.academicYear,

                placeInCMU: each.projectdata?.placeInCMU || null,
                placeOutsideCMU: each.projectdata?.placeOutsideCMU || null

            }
        })


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
                ],
                AND: ended ? {} : {
                    eventDateFinish: {
                        gte: new Date()
                    }
                }
            },
            orderBy: {
                eventDateFinish: {
                    sort: 'asc',
                    nulls: 'last'
                }
            },
            select: {
                projectID: true,
                studentID: true,
                orgID: true,

                projectNameTH: true,
                projectNickNameTH: true,
                projectShortDescriptionTH: true,

                projectNameEN: true,
                projectNickNameEN: true,

                eventDateStart: true,
                eventDateFinish: true,

                academicYear: true,
                projectdata: {
                    select: {
                        placeInCMU: true,
                        placeOutsideCMU: true
                    }
                }
            }
        })

        return search.map((each) => {
            return {
                projectID: each.projectID,
                studentID: each.studentID,
                orgID: each.orgID,

                projectNameTH: each.projectNameTH,
                projectNickNameTH: each.projectNickNameTH,
                projectShortDescriptionTH: each.projectShortDescriptionTH,

                projectNameEN: each.projectNameEN,
                projectNickNameEN: each.projectNickNameEN,

                eventDateStart: each.eventDateStart,
                eventDateFinish: each.eventDateFinish,

                academicYear: each.academicYear,

                placeInCMU: each.projectdata?.placeInCMU || null,
                placeOutsideCMU: each.projectdata?.placeOutsideCMU || null

            }
        })

    }


}

const createNewProject = async (
    studentID,
    orgID,
    projectNameTH,
    projectNickNameTH,
    projectNameEN,
    projectNickNameEN,
    eventDateStart,
    eventDateFinish,
    academicYear = "202501",
) => {

    // extract data
    const academicYr = academicYear.slice(0, 4)
    const semester = academicYear.slice(-2)

    // gen proj id
    const newProjID = await newProjectID(academicYr, semester)

    try {
        const newProj = await prisma.projects.create({
            data: {
                projectID: newProjID,
                studentID: studentID,
                orgID: orgID,

                projectNameTH: projectNameTH,
                projectNickNameTH: projectNickNameTH,

                projectNameEN: projectNameEN,
                projectNickNameEN: projectNickNameEN,

                eventDateStart: eventDateStart,
                eventDateFinish: eventDateFinish,

                academicYear: academicYear

            }
        })

        const getNewProjData = await getProjectBriefData(newProj.projectID)

        return getNewProjData

    } catch (error) {

        console.log('[createNewProject.newProj]', error);

        throw {
            code: 'CREATE-NEW-PROJECT-INTERNAL-ERROR',
            desc: {
                userData: {
                    studentID,
                    orgID,
                    projectNameTH,
                    projectNickNameTH,
                    projectNameEN,
                    projectNickNameEN,
                    eventDateStart,
                    eventDateFinish,
                    academicYear
                }, error
            }
        }
    }


}

module.exports = {
    getAnnouncementList,
    updateAnnouncement,
    deleteAnnouncement,
    newAnnouncement,

    searchListProjectByNamePage,

    createNewProject
}