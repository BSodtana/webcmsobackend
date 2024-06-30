const { errorCodeToResponse } = require("../../_helpers/errorCodeToResponse")
const { successCodeToResponse } = require("../../_helpers/successCodeToResponse")
const accountServices = require("./loginServices")

const loginControllers = async (req, res) => {
    try {

        const { email, password } = req.body

        const results = await accountServices.loginByEmailPass(email, password)
        res.status(200).json(successCodeToResponse(results, 'LOGIN-PASSWORD-CORRECT', email))


    } catch (error) {
        console.log('loginControllers', error)
        res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'loginControllers'))
    }
}

module.exports = {
    loginControllers
}