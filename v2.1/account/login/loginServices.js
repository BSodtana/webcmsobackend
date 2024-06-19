require('dotenv').config()
const prisma = require('../../prisma')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginByEmailPass = async (email, password) => {

    const searchUser = await prisma.usercredentials.findFirst({
        where: {
            email: email
        }
    })

    if (!searchUser) {

        // account not existed
        throw {
            code: 'LOGIN-EMAIL-NOT-EXISTS',
            desc: { userData: { email }, searchUser }
        }

    } else {

        // account existed
        // check pw

        const compare = await bcrypt.compare(password, searchUser?.hashPassword)

        if (!compare) {

            throw {
                code: 'LOGIN-PASSWORD-INCORRECT',
                desc: { userData: { email }, compare }
            }
        } else {

            // get basic info and gen jwt to frontend

            const userData = await prisma.users.findUnique({
                where: {
                    studentID: searchUser.studentID
                },
                include: {
                    usercredentials: true
                }

            })

            const dataToFrontend = {
                studentID: userData.studentID,
                titleTH: userData.titleTH,
                firstNameTH: userData.firstNameTH,
                lastNameTH: userData.lastNameTH,
                nickNameTH: userData.nickNameTH,
                titleEN: userData.titleEN,
                firstNameEN: userData.firstNameEN,
                lastNameEN: userData.lastNameEN,
                currentYear: userData.currentYear,
                admissionCategory: userData.admissionCategory,
                role: userData.usercredentials.role,
                uuid: userData.usercredentials.uuid,
                email: userData.usercredentials.email,
                emailVerified: userData.usercredentials.emailVerified
            }


            const token = jwt.sign(dataToFrontend, process.env.PRIVATE_KEY, { expiresIn: '7d' })

            return {
                studentID: userData.studentID,
                token: token,
                updatedDateTime: userData.updatedDateTime
            }

        }

    }


}

module.exports = {
    loginByEmailPass
}