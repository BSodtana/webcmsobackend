const express = require('express')
const router = express.Router()
const prisma = require('../../../prisma')
const VerifyUserJWT = require('../../login/token/verifyUserJwt')
// /v2/account/profile/update
router.post('/', async (req, res) => {
  const header = req.headers.authorization?.split(' ')[1]
  if (!header) {
    res.status(400).json({ detail: 'TOKEN MUST BE DEFINED IN HEADER' })
  }
  const {
    firstNameTH,
    firstNameEN,
    lastNameTH,
    lastNameEN,
    nickNameTH,
    currentYear,
    lineID,
    phoneNumber,
    instagram,
    facebook,
    medicalCondition,
    allergy,
    specialNeed,
    titleEN,
  } = req.body.data
  const token = await VerifyUserJWT(header)
  try {
    if (token.isAuthenticated && token) {
      await prisma.users.update({
        where: { studentID: token.data.studentID },
        data: {
          firstNameTH: firstNameTH,
          lastNameTH: lastNameTH,
          firstNameEN: firstNameEN,
          lastNameEN: lastNameEN,
          nickNameTH: nickNameTH,
          currentYear: currentYear,
          lineID: lineID,
          phoneNumber: phoneNumber,
          instagram: instagram,
          facebook: facebook,
          medicalCondition: medicalCondition,
          allergy: allergy,
          specialNeed: specialNeed,
          updatedDateTime: new Date(),
          titleEN: titleEN,
        },
      })
      res
        .status(200)
        .json({ status: 'success', text: 'THE UPDATE IS SUCCESSFUL' })
    }
    if (!token.isAuthenticated) {
      res
        .status(401)
        .json({ status: 401, detail: 'USER JWT IS NOT AUTHENTICATED' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 500, error: 'INTERNAL SERVER ERROR' })
  }
})
module.exports = router
