require('dotenv').config()
const jwt = require('jsonwebtoken')
const prisma = require('../../prisma')

//**
// *
// * @param {String} jwtToken 'token from user'
// * @param {Boolean} forced 'read token even token is expired'
// */

const readDataFromJWT = async (jwtToken, forced = false) => {

    if (!jwtToken) {

        // no token provided
        return {
            dataAvailable: false,
            code: 'JWT-TOKEN-NOT-PROVIDED'
        }


    } else {

        // token provided

        // return verify
        if (forced) {
            const verify = await jwt.verify(jwtToken, process.env.PRIVATE_KEY, { ignoreExpiration: true })

            return {
                dataAvailable: true,
                data: verify
            }

        } else {


            // search token in db
            const searchToken = await prisma.userslogout.findFirst({
                where: {
                    token: jwtToken
                }
            })

            if (searchToken) {

                return {
                    dataAvailable: false,
                    code: 'JWT-TOKEN-EXPIRED'
                }

            } else {

                try {
                    const verify = await jwt.verify(jwtToken, process.env.PRIVATE_KEY)

                    return {
                        dataAvailable: true,
                        data: verify
                    }

                } catch (error) {
                    return {
                        dataAvailable: false,
                        code: 'JWT-TOKEN-EXPIRED'
                    }
                }

            }





        }




    }

}

module.exports = { readDataFromJWT }