const { errorCodeToResponse } = require("../../_helpers/errorCodeToResponse")
const { successCodeToResponse } = require("../../_helpers/successCodeToResponse")
const registerServices = require("./registerServices")

const prelimDataController = async (req, res) => {
    try {

        const { studentID } = req.params

        if (!studentID) {
            res.status(400).json(errorCodeToResponse('REGISTER-PRELIM-NO-STUDENT-ID', studentID))
        } else {
            const results = await registerServices.getPrelimDataFromStudentID(studentID.toString())
            res.status(200).json(successCodeToResponse(results, 'REGISTER-PRELIM-STUDENT-ID-SUCCESS', studentID))
        }

    } catch (error) {
        console.log('prelimDataController', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'prelimDataController'))
    }
}

const genStudentVerificationCode = async (req, res) => {
    try {

        const { studentID, email } = req.body

        if (!studentID || !email) {
            res.status(400).json(errorCodeToResponse('REGISTER-GENERATE-EMAIL-NOT-ENOUGH-DATA', studentID.toString()))
        } else {

            // check email requirement (RegEx) cmu.ac.th
            // const condition = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
            const condition = /^[A-Za-z0-9._%+-]+@cmu\.ac\.th$/;
            const check = condition.exec(email)

            if (!check) {
                // password not pass
                throw {
                    code: 'REGISTER-EMAIL-NOT-CMU',
                    desc: { userData: { studentID, email }, check }
                }

            } else {

                // check if this email or studentID was already registered
                const arrayChecked = [
                    await registerServices.checkIfStdIDWasRegistered(studentID),
                    await registerServices.checkIfEmailWasRegistered(email)
                ]
                const notPass = arrayChecked.some(data => data === true)

                if (notPass) {
                    throw {
                        code: 'REGISTER-ACCOUNT-ALREADY-EXIST',
                        desc: { userData: { studentID, email }, arrayChecked }
                    }

                } else {
                    const results = await registerServices.generateVerificationEmail(studentID.toString(), check[0])
                    res.status(200).json(successCodeToResponse(results, 'REGISTER-GENERATE-EMAIL-SUCCESS', studentID.toString()))

                }

            }

        }

    } catch (error) {
        console.log('genStudentVerificationCode', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'genStudentVerificationCode'))
    }
}

const verifiedEmailStudentCon = async (req, res) => {
    try {

        const { studentID, code, referenceID, password } = req.body

        if (!studentID || !code || !referenceID || !password) {
            res.status(400).json(errorCodeToResponse('NOT-ENOUGH-DATA', studentID.toString()))
        } else {



            // check password requirement (RegEx)
            const condition = /^(?=.*[A-Z]{1,})(?=.*[!@#$&%^*_=()]{1,})(?=.*[0-9]{1,})(?=.*[a-z]).{8,}$/;
            const check = condition.exec(password)

            if (!check) {
                // password not pass
                throw {
                    code: 'REGISTER-PASSWORD-NOT-PASS-CONDITION',
                    desc: { userData: { studentID, code, referenceID, password }, check }
                }

            } else {
                const results1 = await registerServices.verifiedEmailStudent(studentID.toString(), code.toString(), referenceID.toString())
                const results2 = await registerServices.createPasswordForUser(studentID.toString(), results1.userData.email, check[0])
                res.status(200).json(successCodeToResponse(results2, 'REGISTER-CREATE-PASSWORD-SUCCESS', studentID.toString()))
            }

        }

    } catch (error) {
        console.log('verifiedEmailStudentCon', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'verifiedEmailStudentCon'))
    }
}


module.exports = {
    prelimDataController,
    genStudentVerificationCode,
    verifiedEmailStudentCon,
}