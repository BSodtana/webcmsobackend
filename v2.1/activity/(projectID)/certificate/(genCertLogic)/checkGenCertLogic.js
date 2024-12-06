const { getProjectIJoinAsPCP, getProjectIJoinAsSTF } = require("../../../../account/profile/project/myProjectServices")
const { checkIfUserDoneEvaluation } = require("../../activityServices")

const checkIfUserJoinedProject = async (studentID, projectID, returnAsData = false) => {


    // 1 user join activity and has role data
    const joinedPCPData = await getProjectIJoinAsPCP(studentID)
    const joinedSTFData = await getProjectIJoinAsSTF(studentID)

    const iJoinedAsPCP = joinedPCPData.some((project) => project.projectID === projectID)
    const iJoinedAsSTF = joinedSTFData.some((project) => project.projectID === projectID)
    const iJoinedAs = iJoinedAsPCP ? { as: 'PCP', data: joinedPCPData.filter((each) => each.projectID === projectID)[0] }
        : iJoinedAsSTF ? { as: 'STF', data: joinedSTFData.filter((each) => each.projectID === projectID)[0] }
            : false

    if (!iJoinedAs) {
        return false
    } else if (returnAsData) {
        return iJoinedAs
    } else {
        return true
    }
}

const checkIfUserDidEvaluationForm = async (studentID, projectID) => {

    const check = await checkIfUserDoneEvaluation(studentID, projectID)
    return check.userDoneEvaluation

}



module.exports = {
    checkIfUserJoinedProject,
    checkIfUserDidEvaluationForm
}