const { errorCodeToResponse } = require('../_helpers/errorCodeToResponse')
const { readDataFromJWT } = require('../_helpers/jwt/readDataFromJWT')

module.exports = function (options = {
    userType: ['ADMIN', 'PRES', 'VP', 'STAFF', 'USER'],
}) {
    return allowedByUserType = async (req, res, next) => {
        // options {userType: ['ADMIN',  'PRES',  'VP',  'STAFF', 'USER', 'none', 'all']}

        try {

            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                const jwt = req.headers.authorization.split(' ')[1]
                const data = await readDataFromJWT(jwt)
                req.userData = data?.data


                if (options.userType.includes('none')) {
                    res.status(400).json(errorCodeToResponse("ACCESS-DENIED-ALL", req.userData))
                } else if (options.userType.includes('all')) {
                    next()
                } else if (options.userType.includes(data?.data.role)) {
                    next()
                } else {
                    res.status(400).json(errorCodeToResponse("ACCESS-DENIED-ROLE", req.userData))
                }

            } else {
                res.status(400).json(errorCodeToResponse("jwt-malformed", 'PERMISSION-FAILED'))
            }

        } catch (error) {
            console.log('allowedByUserType', error)
            res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'allowedByUserType'))
        }
    }
}
