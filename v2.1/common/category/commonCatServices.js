require('dotenv').config()
const prisma = require('../../prisma')

const listCMSOMission = async () => {
    const lists = await prisma.categorycmsomission.findMany({
        select: {
            cmsoMissionType: true,
            cmsoMissionTypeName: true
        }
    })

    return lists
}

const listCMSOProject = async () => {
    const lists = await prisma.categorycmsoproject.findMany({
        select: {
            cmsoProjectType: true,
            cmsoProjectTypeName: true
        }
    })

    return lists
}

const listCMUMedGrad = async () => {
    const lists = await prisma.categorycmumedgrad.findMany({
        select: {
            cmuMedGradType: true,
            cmuMedGradTypeName: true
        }
    })

    return lists
}

const listCMUMedOrg = async () => {
    const lists = await prisma.categorycmumedorg.findMany({
        select: {
            cmuMedOrgType: true,
            cmuMedOrgTypeName: true
        }
    })

    return lists
}

const listCMUProject = async () => {
    const lists = await prisma.categorycmuproject.findMany({
        select: {
            cmuProjectType: true,
            cmuProjectTypeName: true
        }
    })

    return lists
}


module.exports = {
    listCMSOMission,
    listCMSOProject,
    listCMUMedGrad,
    listCMUMedOrg,
    listCMUProject
}