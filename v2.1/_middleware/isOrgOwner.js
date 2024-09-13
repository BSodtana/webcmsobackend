const { errorCodeToResponse } = require('../_helpers/errorCodeToResponse')
const { readDataFromJWT } = require('../_helpers/jwt/readDataFromJWT')
const prisma = require('../prisma')

module.exports = function (options = {
    allowedOrgRole: [],
    allowedAdminRole: []
}) {
    return isOrgOwner = async (req, res, next) => {

        // option = {
        // allowedOrgRole = ['PRESIDENT', 'VICE_PRESIDENT', 'SECRETARY', 'MEMBER']
        // allowedAdminRole = ['ADMIN', 'PRES', 'VP', 'STAFF', 'USER']
        // -> allowed other user roles to edit this org, even if they are not the owner of this project 
        // }


        try {

            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                const jwt = req.headers.authorization.split(' ')[1]
                const data = await readDataFromJWT(jwt)

                if (!data.dataAvailable) {
                    res.status(400).json(errorCodeToResponse("JWT-TOKEN-EXPIRED", 'NO-TOKEN-INFO'))

                } else {

                    // get project id
                    const { orgID } = req.params
                    req.userData = data?.data

                    console.log('req.userData', req.userData);



                    // check project owner
                    const check = await prisma.useraffiliation.findFirst({
                        where: {
                            affiliatedOrg: orgID,
                            studentID: req.userData?.studentID
                        }
                    })



                    // ---------- implement role here ------

                    if (!check) {
                        // no org found
                        throw {
                            code: 'ROLE-ORG-NOT-FOUND',
                            desc: { userData: { orgID } }
                        }
                    } else {
                        if (check.affiliationType === 'PRESIDENT') {
                            next()
                        } else {
                            // not an org owner
                            res.status(403).json(errorCodeToResponse("ACCESS-DENIED-ROLE", req.userData?.studentID))
                        }
                    }



                }

            } else {
                res.status(400).json(errorCodeToResponse("JWT-TOKEN-NOT-FOUND", 'NO-TOKEN-LOGIN'))
            }

        } catch (error) {
            console.log('isOrgOwner', error)
            res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'isOrgOwner'))
        }
    }
}
