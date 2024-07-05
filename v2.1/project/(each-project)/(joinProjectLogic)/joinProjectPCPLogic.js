const { getAllPCPInProject } = require("../(allPCPLogic)/allPCPLogic")
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
    const maxNumSearch = await prisma.projectparticipantrecruit.findUnique({
        where: {
            participantRecruitID: recruitID
        }
    })
    const maxNum = maxNumSearch.maxNumber

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
    const projectAllPCP = await getAllPCPInProject(recruitData.projectID)

    //check if user is alredy joined
    const isJoined = projectAllPCP.some((key) => {
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
    checkIfUserJoinAsPCPAlready
}