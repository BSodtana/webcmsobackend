require('dotenv').config()
const prisma = require('../../prisma')

// ----- brief data -----
const getProjectBriefData = async (projectID) => {

    const search = await prisma.projects.findUnique({
        where: {
            projectID: projectID
        },
        include: {
            projectdata: {
                select: {
                    placeInCMU: true,
                    placeOutsideCMU: true
                }
            }
        }
    })

    // if search = 0
    if (!search) {
        throw {
            code: 'GET-PROJECT-BRIEF-DATA-NOT-EXIST',
            desc: { userData: { projectID }, search }
        }
    } else {
        return search
    }

}

const putProjectBriefData = async (projectID, data) => {

    const updatedResults = await prisma.projects.update({
        where: {
            projectID: projectID
        },
        data: {
            ...data,
            updatedDateTime: new Date()
        }
    })

    return updatedResults
}

const deleteProjectBriefData = async (projectID, confirmed = false) => {


    // check if confirmed?
    if (!confirmed) {

        throw {
            code: 'DECLINED-CONFIRM-DELETE',
            desc: { userData: { projectID, confirmed } }
        }

    } else {

        const deleteResult = await prisma.projects.delete({
            where: {
                projectID: projectID
            }
        })

        return deleteResult


    }

}


// ---- full data ---
const getProjectFullData = async (projectID) => {

    const search = await prisma.projectdata.findUnique({
        where: {
            projectID: projectID
        }
    })

    // if search = 0
    if (!search) {
        throw {
            code: 'GET-PROJECT-FULL-DATA-NOT-EXIST',
            desc: { userData: { projectID }, search }
        }
    } else {
        return search
    }

}

const putProjectFullData = async (projectID, data) => {

    const updatedResults = await prisma.projectdata.update({
        where: {
            projectID: projectID
        },
        data: {
            ...data,
            updatedDateTime: new Date()
        }
    })

    return updatedResults
}


// ----- announcement -----


module.exports = {
    getProjectBriefData,
    putProjectBriefData,
    deleteProjectBriefData,

    getProjectFullData,
    putProjectFullData
}