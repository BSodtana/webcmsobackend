const allPCPLogic = require("../(allPCPLogic)/allPCPLogic")
const { getUserFullPersonalData } = require("../../../account/profile/profileServices")
const prisma = require("../../../prisma")
const eachRCMServices = require('../recruitment/(recruitmentID)/eachRCMServices')

const checkIfRecruitIsOpen = async (recruitID = '') => {

    const recruitData = await eachRCMServices.getDataSpecificRecruitID(recruitID)

    if (recruitData.isAllowed) {
        return true
    } else {
        return false
    }


}

const checkIfPositionIsOpen = async (positionID = '') => {

    const positionData = await eachRCMServices.getDataSpecificPositionID(positionID)

    if (positionData.isAllowed) {
        return true
    } else {
        return false
    }


}

const checkIfUserYearIsAllowed = async (recruitID = '', studentID = '') => {

    // get student id
    const getData = await getUserFullPersonalData(studentID)
    const stdYear = getData.currentYear.toString()

    // get recruit data
    const recruitData = await eachRCMServices.getDataSpecificRecruitID(recruitID)
    const yearAllowed = recruitData.yearAllowed.split(',')

    return yearAllowed.includes(stdYear)

}

const checkIfMaxNumberExceed = async (recruitID = '') => {

    // check max number now
    const recruitData = await eachRCMServices.getDataSpecificRecruitID(recruitID)
    const maxNum = recruitData.maxNumber

    // check number of already join
    const searchAll = await prisma.projectparticipants.count({
        where: {
            recruitID: recruitID
        }
    })

    if (searchAll < maxNum) {
        return true
    } else {
        return false
    }

}

const checkIfMaxNumberPositionExceed = async (positionID = '') => {

    // check max number now
    const recruitData = await eachRCMServices.getDataSpecificPositionID(positionID)
    const maxNum = recruitData.maxNumber

    // check number of already join of each position
    const positionJoined = await prisma.projectstaffs.count({
        where: {
            positionID: positionID
        }
    })

    if (positionJoined < maxNum) {
        return true
    } else {
        return false
    }

}

const checkIfPasswordIsTrue = async (recruitID = '', password = null) => {

    // get recruit data
    const recruitData = await eachRCMServices.getDataSpecificRecruitID(recruitID)

    if (password === recruitData.password) {
        return true
    } else {
        return false
    }

}

const checkIfUserJoinAsPCPAlready = async (recruitID = '', studentID = '') => {

    const recruitData = await eachRCMServices.getDataSpecificRecruitID(recruitID)

    // const getAllPCPInThisActivity
    const projectAllPCP = await allPCPLogic.getAllPCPInProject(recruitData.projectID)

    //check if user is alredy joined
    const isJoined = projectAllPCP.some((key) => {
        if (key.studentID === studentID) {
            return true
        }
    })

    return !isJoined
}

const checkIfUserJoinAsSTFAlready = async (recruitID = '', studentID = '') => {

    const recruitData = await eachRCMServices.getDataSpecificRecruitID(recruitID)

    // const getAllPCPInThisActivity
    const projectAllSTF = await allPCPLogic.getAllSTFInProject(recruitData.projectID)

    //check if user is alredy joined
    const isJoined = projectAllSTF.some((key) => {
        if (key.studentID === studentID) {
            return true
        }
    })

    return !isJoined
}

module.exports = {
    checkIfRecruitIsOpen,
    checkIfUserYearIsAllowed,
    checkIfMaxNumberExceed,
    checkIfPasswordIsTrue,
    checkIfUserJoinAsPCPAlready,

    checkIfPositionIsOpen,
    checkIfMaxNumberPositionExceed,
    checkIfUserJoinAsSTFAlready
}