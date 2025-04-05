require('dotenv').config()
const { default: axios } = require('axios');
const projectServices = require('../projectServices');

const getMSListProject = async (studentID) => {

    try {

        // get data from ms list
        const fetch = await axios.post(
            `https://prod-00.southeastasia.logic.azure.com:443/workflows/f9156a8b6c2a4a0ea99e162c9142decf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=OsXuxbUDTnEaUW89PAWi_Cl3f1g_-ApwgmJIUsIMnwI`,
            {
                studentID: "660710029",
                internalKey: process.env.MS_LIST_SECRET_KEY
            }
        )

        if (fetch?.data?.status === 'success') {
            return fetch?.data?.payload.map((each) => {
                return {
                    autoID: each?.autoID || 0,
                    studentID: each?.studentID || "",
                    orgID: each?.orgID || "CMSO",
                    projectNameTH: each?.projectNameTH || "",
                    projectNickNameTH: each?.projectNickNameTH || "",
                    projectShortDescriptionTH: each?.projectShortDescriptionTH || "",
                    projectNameEN: each?.projectNameEN || "",
                    projectNickNameEN: each?.projectNickNameEN || "",
                    projectFullDetail: each?.projectFullDetail || "",
                    eventDateStart: each?.eventDateStart || "",
                    eventDateFinish: each?.eventDateFinish || "",
                    createdDateTime: each?.createdDateTime || "",
                    updatedDateTime: each?.updatedDateTime || "",
                    isShown: each?.isShown || 0,
                    academicYear: each?.academicYear || "202501",
                    projectdata: {
                        projectID: each?.projectdata?.projectID || 0,
                        placeInCMU: each?.projectdata?.placeInCMU || "",
                        placeOutsideCMU: each?.projectdata?.placeOutsideCMU || "",
                        datePrepareStart: each?.projectdata?.datePrepareStart || "",
                        datePrepareEnd: each?.projectdata?.datePrepareEnd || "",
                        dateEventStart: each?.projectdata?.dateEventStart || "",
                        dateEventEnd: each?.projectdata?.dateEventEnd || "",
                        dateSummationStart: each?.projectdata?.dateSummationStart || "",
                        dateSummationEnd: each?.projectdata?.dateSummationEnd || "",
                        professorFullName: each?.projectdata?.professorFullName || "",
                        professorAffiliation: each?.projectdata?.professorAffiliation || "",
                        otherOrgName: each?.projectdata?.otherOrgName || "",
                        cmsoProjectType: each?.projectdata?.cmsoProjectType || null,
                        cmuProjectType: each?.projectdata?.cmuProjectType || null,
                        cmuMedGradType: each?.projectdata?.cmuMedGradType || null,
                        cmsoMissionType: each?.projectdata?.cmsoMissionType || null,
                        cmuMedOrgType: each?.projectdata?.cmuMedOrgType || null,
                        background: each?.projectdata?.background || "",
                        aims: each?.projectdata?.aims || "",
                        numberStudentParticipant: each?.projectdata?.numberStudentParticipant || 0,
                        numberFacultyStaffParticipant: each?.projectdata?.numberFacultyStaffParticipant || 0,
                        numberProfessorParticipant: each?.projectdata?.numberProfessorParticipant || 0,
                        numberOutsideParticipant: each?.projectdata?.numberOutsideParticipant || 0,
                        numberStudentStaff: each?.projectdata?.numberStudentStaff || 0,
                        goalQualitative: each?.projectdata?.goalQualitative || "",
                        indicatorParticipantQuantitative: each?.projectdata?.indicatorParticipantQuantitative || "",
                        indicatorSatisfactory: each?.projectdata?.indicatorSatisfactory || "",
                        indicatorAims: each?.projectdata?.indicatorAims || "",
                        outcome: each?.projectdata?.outcome || ""
                    }
                }
            })
        } else {
            console.log('[getMSListProject failed1]', fetch.data.response);

            throw {
                code: fetch?.data?.description?.code || "RETREIVE-MSLIST-DATA-FAILED-INTERNAL-ERROR",
                desc: { userData: { studentID }, data: fetch.data.response },
            }
        }

    } catch (error) {
        throw {
            code: error?.response?.data?.description?.code || "RETREIVE-MSLIST-DATA-FAILED-INTERNAL-ERROR",
            desc: { userData: { studentID }, error: error?.response?.data },
        }

    }

}

const parseNameNickname = (projectFullName) => {

    if (projectFullName) {
        const extractName = projectFullName.split("(")
        const extractNickName = extractName[1]?.split(")") || [""]

        return {
            fullName: extractName[0]?.trim(),
            nickName: extractNickName[0]?.trim()
        }
    } else {
        return {
            fullName: "",
            nickName: ""
        }
    }


}

const createNewProjectFromMSList = async (studentID, autoID, orgID, editedProjectNameTH, editedProjectNickNameTH, editedDateEventStart, editedDateEventEnd) => {

    try {
        const msListProject = await getMSListProject(studentID)
        const filteredProject = msListProject.filter((each) => each?.autoID == parseInt(autoID))

        if (filteredProject.length != 1) {
            throw {
                code: "CREATE-NEW-PROJECT-MSLIST-FAILED-MULTIPLE-OR-NO-DATA",
                desc: { userData: { studentID, autoID } },
            }
        } else {
            const result = await projectServices.createNewProject(
                studentID,
                orgID ? orgID : filteredProject[0]?.orgID,
                editedProjectNameTH ? editedProjectNameTH : parseNameNickname(filteredProject[0]?.projectNameTH || "โครงการใหม่").fullName,
                editedProjectNickNameTH ? editedProjectNickNameTH : parseNameNickname(filteredProject[0]?.projectNameTH || "โครงการใหม่").nickName,
                null,
                null,
                editedDateEventStart ? new Date(editedDateEventStart) : new Date(filteredProject[0]?.projectdata?.dateEventStart) || new Date(),
                editedDateEventEnd ? new Date(editedDateEventEnd) : new Date(filteredProject[0]?.projectdata?.dateEventEnd) || new Date(),
                filteredProject[0]?.academicYear
            )
            return result

        }


    } catch (error) {

        throw {
            code: error?.desc?.error?.code || error?.code || "CREATE-NEW-PROJECT-MSLIST-FAILED-INTERNAL-ERROR",
            desc: { userData: { studentID, autoID, orgID, editedProjectNameTH, editedProjectNickNameTH, editedDateEventStart, editedDateEventEnd } },
        }
    }

}


module.exports = {
    createNewProjectFromMSList,
    getMSListProject
}