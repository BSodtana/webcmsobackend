const { errorCodeToResponse } = require('../_helpers/errorCodeToResponse')
const { readDataFromJWT } = require('../_helpers/jwt/readDataFromJWT')

module.exports = function (options = {
    allowedGuestNotLogin: false
}) {
    return isLoggedIn = async (req, res, next) => {
        // allowedGuestNotLogin = allowed to pass even not login by using guest data (but if login -> user data shown)

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

                // if guest login -> use template data
                if (options.allowedGuestNotLogin) {
                    req.userData = {
                        studentID: '680710000',
                        titleTH: 'คน',
                        firstNameTH: 'ผู้เข้าร่วม',
                        lastNameTH: 'ไม่ได้ล็อกอิน',
                        nickNameTH: 'เกสต์',
                        titleEN: 'People',
                        firstNameEN: 'Guest',
                        lastNameEN: 'NotLogin',
                        currentYear: 1,
                        admissionCategory: 'A',
                        role: 'USER',
                        uuid: 'GUEST',
                        email: 'guest@cmso.med.cmu.ac.th',
                        emailVerified: 1
                    }
                    next()

                } else {
                    res.status(400).json(errorCodeToResponse("JWT-TOKEN-NOT-FOUND", 'NO-TOKEN-LOGIN'))
                }
            }

        } catch (error) {
            console.log('isLoggedIn', error)
            res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'isLoggedIn'))
        }
    }
}
