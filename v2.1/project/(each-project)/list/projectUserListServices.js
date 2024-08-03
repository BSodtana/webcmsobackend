require('dotenv').config()
const prisma = require('../../prisma')
const eachRCMServices = require('./(joinProjectLogic)/joinProjectPCPLogic')
const { getDataSpecificRecruitID } = require('./recruitment/(recruitmentID)/eachRCMServices')

// // ----- brief data -----
// const getProjectBriefData = async (projectID) => {

//     const search = await prisma.projects.findUnique({
//         where: {
//             projectID: projectID
//         },
//         include: {
//             users: {
//                 select: {
//                     studentID: true,
//                     titleTH: true,
//                     firstNameTH: true,
//                     lastNameTH: true,
//                     nickNameTH: true,
//                     titleEN: true,
//                     firstNameEN: true,
//                     lastNameEN: true,
//                     currentYear: true,
//                 }
//             },
//             projectdata: {
//                 select: {
//                     placeInCMU: true,
//                     placeOutsideCMU: true
//                 }
//             }
//         }
//     })

//     // if search = 0
//     if (!search) {
//         throw {
//             code: 'GET-PROJECT-BRIEF-DATA-NOT-EXIST',
//             desc: { userData: { projectID }, search }
//         }
//     } else {
//         return search
//     }

// }

// const putProjectBriefData = async (projectID, data) => {

//     const updatedResults = await prisma.projects.update({
//         where: {
//             projectID: projectID
//         },
//         data: {
//             ...data,
//             updatedDateTime: new Date()
//         }
//     })

//     return updatedResults
// }

// const deleteProjectBriefData = async (projectID, confirmed = false) => {


//     // check if confirmed?
//     if (!confirmed) {

//         throw {
//             code: 'DECLINED-CONFIRM-DELETE',
//             desc: { userData: { projectID, confirmed } }
//         }

//     } else {

//         const deleteResult = await prisma.projects.delete({
//             where: {
//                 projectID: projectID
//             }
//         })

//         return {}


//     }

// }


// // ---- full data ---
// const getProjectFullData = async (projectID) => {

//     const search = await prisma.projectdata.findUnique({
//         where: {
//             projectID: projectID
//         }
//     })

//     // if search = 0
//     if (!search) {
//         throw {
//             code: 'GET-PROJECT-FULL-DATA-NOT-EXIST',
//             desc: { userData: { projectID }, search }
//         }
//     } else {
//         return search
//     }

// }

// const putProjectFullData = async (projectID, data) => {

//     const updatedResults = await prisma.projectdata.update({
//         where: {
//             projectID: projectID
//         },
//         data: {
//             ...data,
//             updatedDateTime: new Date()
//         }
//     })

//     return updatedResults
// }


// // ----- joining a project -----

// const joinProjectPCP = async (recruitID, studentID, password, forced = false) => {

//     const checkListForJoining = [
//         await eachRCMServices.checkIfRecruitIsOpen(recruitID),
//         await eachRCMServices.checkIfUserYearIsAllowed(recruitID, studentID),
//         await eachRCMServices.checkIfMaxNumberExceed(recruitID),
//         await eachRCMServices.checkIfPasswordIsTrue(recruitID, password),
//         await eachRCMServices.checkIfUserJoinAsPCPAlready(recruitID, studentID),
//         await eachRCMServices.checkIfUserJoinAsSTFAlready(recruitID, studentID)
//     ]

//     const dictDesc = [
//         {
//             "textTH": "รอบสมัครนี้ยังไม่เปิดรับสมัคร",
//             "textEN": "This recruitment is not open yet",
//         },
//         {
//             "textTH": "ไม่อนุญาติชั้นปีนี้ให้สมัคร",
//             "textEN": "Student yeat not met criteria",
//         },
//         {
//             "textTH": "จำนวนรับของตำแหน่งนี้เต็มแล้ว",
//             "textEN": "This position was full",
//         },
//         {
//             "textTH": "รหัสผ่านไม่ถูกต้อง",
//             "textEN": "Password not correct",
//         },
//         {
//             "textTH": "คุณเข้าร่วมกิจกรรมนี้ในฐานะผู้เข้าร่วมกิจกรรมไปแล้ว",
//             "textEN": "You already join this project as participant",
//         },
//         {
//             "textTH": "คุณเข้าร่วมกิจกรรมนี้ในฐานะผู้จัดกิจกรรมไปแล้ว",
//             "textEN": "You already join this project as staff",
//         },
//     ]

//     // check if can regis?
//     const isNotAllowedRegis = checkListForJoining.includes(false)
//     const error = dictDesc.filter((d, ind) => !checkListForJoining[ind])

//     if (!forced && isNotAllowedRegis) {
//         throw {
//             code: 'JOIN-PROJECT-AS-PCP-FAILED-NOT-MEET-CRITERIA',
//             desc: { userData: { recruitID, studentID }, error }
//         }
//     } else {

//         // generate join id
//         const searchAll = await prisma.projectparticipants.count({
//             where: {
//                 recruitID: recruitID
//             }
//         })

//         const joinIDNew = `${recruitID}-${(searchAll).toString().padStart(4, '0')}`

//         const joinProjectAsPCP = await prisma.projectparticipants.create({
//             data: {
//                 participantApplicationID: joinIDNew,
//                 recruitID: recruitID,
//                 studentID: studentID
//             }, include: {
//                 projectparticipantrecruit: {
//                     select: {
//                         recruitName: true,

//                     }
//                 }
//             }
//         })

//         return {
//             "participantApplicationID": joinProjectAsPCP.participantApplicationID,
//             "recruitID": joinProjectAsPCP.recruitID,
//             "studentID": joinProjectAsPCP.studentID,
//             "createdDateTime": joinProjectAsPCP.createdDateTime,
//             "recruitName": joinProjectAsPCP.projectparticipantrecruit.recruitName
//         }
//     }

// }

// const joinProjectAsSTF = async (recruitID, positionID, studentID, password, forced = false) => {

//     const checkListForJoining = [
//         await eachRCMServices.checkIfRecruitIsOpen(recruitID),
//         await eachRCMServices.checkIfPositionIsOpen(positionID),
//         await eachRCMServices.checkIfUserYearIsAllowed(recruitID, studentID),
//         await eachRCMServices.checkIfMaxNumberPositionExceed(positionID),
//         await eachRCMServices.checkIfPasswordIsTrue(recruitID, password),
//         await eachRCMServices.checkIfUserJoinAsPCPAlready(recruitID, studentID),
//         await eachRCMServices.checkIfUserJoinAsSTFAlready(recruitID, studentID)
//     ]

//     const dictDesc = [
//         {
//             "textTH": "รอบสมัครนี้ยังไม่เปิดรับสมัคร",
//             "textEN": "This recruitment is not open yet",
//         },
//         {
//             "textTH": "ตำแหน่งนี้ยังไม่เปิดรับสมัคร",
//             "textEN": "This position is not open yet",
//         },
//         {
//             "textTH": "ไม่อนุญาติชั้นปีนี้ให้สมัคร",
//             "textEN": "Student yeat not met criteria",
//         },
//         {
//             "textTH": "จำนวนรับของตำแหน่งนี้เต็มแล้ว",
//             "textEN": "This position was full",
//         },
//         {
//             "textTH": "รหัสผ่านไม่ถูกต้อง",
//             "textEN": "Password not correct",
//         },
//         {
//             "textTH": "คุณเข้าร่วมกิจกรรมนี้ในฐานะผู้เข้าร่วมกิจกรรมไปแล้ว",
//             "textEN": "You already join this project as participant",
//         },
//         {
//             "textTH": "คุณเข้าร่วมกิจกรรมนี้ในฐานะผู้จัดกิจกรรมไปแล้ว",
//             "textEN": "You already join this project as staff",
//         },
//     ]

//     // check if can regis?
//     const isNotAllowedRegis = checkListForJoining.includes(false)
//     const error = dictDesc.filter((d, ind) => !checkListForJoining[ind])

//     if (!forced && isNotAllowedRegis) {
//         throw {
//             code: 'JOIN-PROJECT-AS-STF-FAILED-NOT-MEET-CRITERIA',
//             desc: { userData: { recruitID, positionID, studentID }, error }
//         }
//     } else {

//         // generate join id
//         const searchAll = await prisma.projectstaffs.count({
//             where: {
//                 positionID: positionID
//             }
//         })

//         const joinIDNew = `${positionID}-${(searchAll).toString().padStart(4, '0')}`

//         const joinProjectAsSTF = await prisma.projectstaffs.create({
//             data: {
//                 staffApplicationID: joinIDNew,
//                 positionID: positionID,
//                 recruitID: recruitID,
//                 studentID: studentID
//             },
//             include: {
//                 projectstaffrecruit: {
//                     select: {
//                         projectID: true,
//                         recruitName: true
//                     }
//                 },
//                 projectstaffrecruitposition: {
//                     select: {
//                         staffPositionID: true,
//                         recruitID: true,
//                         positionName: true,
//                     }
//                 }
//             }
//         })

//         return {
//             "staffApplicationID": joinProjectAsSTF.staffApplicationID,
//             "recruitID": joinProjectAsSTF.recruitID,
//             "positionID": joinProjectAsSTF.positionID,
//             "projectID": joinProjectAsSTF.projectstaffrecruit.projectID,
//             "studentID": joinProjectAsSTF.studentID,
//             "recruitName": joinProjectAsSTF.projectstaffrecruit.recruitName,
//             "positionName": joinProjectAsSTF.projectstaffrecruitposition.positionName,
//             "createdDateTime": joinProjectAsSTF.createdDateTime,
//         }

//     }

// }


module.exports = {
    // getProjectBriefData,
    // putProjectBriefData,
    // deleteProjectBriefData,

    // getProjectFullData,
    // putProjectFullData,

    // joinProjectPCP,
    // joinProjectAsSTF
}