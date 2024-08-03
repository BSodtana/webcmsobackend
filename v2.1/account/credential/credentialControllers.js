const { errorCodeToResponse } = require("../../_helpers/errorCodeToResponse")
const { successCodeToResponse } = require("../../_helpers/successCodeToResponse")
const credentialServices = require("./credentialServices")


const genStudentVerificationCode = async (req, res) => {
    try {

        const { email } = req.body

        if (!email) {
            res.status(400).json(errorCodeToResponse('FORGOT-PASSWORD-NOT-ENOUGH-DATA'))
        } else {
            const results = await credentialServices.generateRecoverCodeEmail(email)
            res.status(200).json(successCodeToResponse(results, 'FORGOT-PASSWORD-GENERATE-EMAIL-SUCCESS', email))
        }

    } catch (error) {
        console.log('genStudentVerificationCode2', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'genStudentVerificationCode2'))
    }
}

const resetPasswordCon = async (req, res) => {
    try {

        const { email, code, referenceID, password } = req.body

        if (!email || !code || !referenceID || !password) {
            res.status(400).json(errorCodeToResponse('NOT-ENOUGH-DATA', email))
        } else {

            // check password requirement (RegEx)
            const condition = /^(?=.*[A-Z]{1,})(?=.*[!@#$&%^*_=()]{1,})(?=.*[0-9]{1,})(?=.*[a-z]).{8,}$/;
            const check = condition.exec(password)

            if (!check) {
                // password not pass
                throw {
                    code: 'REGISTER-PASSWORD-NOT-PASS-CONDITION',
                    desc: { userData: { email, code, referenceID, password }, check }
                }

            } else {
                const results1 = await credentialServices.verifiedCodeStudent(email, code.toString(), referenceID.toString())
                const results2 = await credentialServices.createPasswordForUser(email, check[0])

                // todo: revoke token and logout
                res.status(200).json(successCodeToResponse(results2, 'FORGOT-PASSWORD-RESET-SUCCESS', email))
            }

        }

    } catch (error) {
        console.log('resetPasswordCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'resetPasswordCon'))
    }
}


module.exports = {
    genStudentVerificationCode,
    resetPasswordCon,
}