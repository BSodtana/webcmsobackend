const { errorCodeToResponse } = require('../_helpers/errorCodeToResponse')
const { readDataFromJWT } = require('../_helpers/jwt/readDataFromJWT')

module.exports = function () {
    return isLoggedIn = async (req, res, next) => {
        // options {userType: ['ADMIN',  'PRES',  'VP',  'STAFF', 'USER', 'none', 'all']}

        try {

            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                const jwt = req.headers.authorization.split(' ')[1]
                const data = await readDataFromJWT(jwt)

                if (!data.dataAvailable) {
                    res.status(400).json(errorCodeToResponse("JWT-TOKEN-EXPIRED", 'NO-TOKEN-INFO'))

                } else {
                    req.userData = data?.data
                    next()
                }

            } else {
                res.status(400).json(errorCodeToResponse("JWT-TOKEN-NOT-FOUND", 'NO-TOKEN-LOGIN'))
            }

        } catch (error) {
            console.log('isLoggedIn', error)
            res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'isLoggedIn'))
        }
    }
}
