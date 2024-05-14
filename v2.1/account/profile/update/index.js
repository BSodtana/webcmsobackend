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
    first_name,
    first_name_en,
    last_name,
    last_name_en,
    nick_name,
    current_year,
    line_id,
    phone_number,
    instagram,
    facebook,
    medical_condition,
    allergy,
    special_need,
    title_en,
  } = req.body.data
  const token = await VerifyUserJWT(header)
  try {
    if (token.isAuthenticated && token) {
      await prisma.users.update({
        where: { student_id: token.data.student_id },
        data: {
          first_name: first_name,
          last_name: last_name,
          first_name_en: first_name_en,
          last_name_en: last_name_en,
          nick_name: nick_name,
          current_year: current_year,
          line_id: line_id,
          phone_number: phone_number,
          instagram: instagram,
          facebook: facebook,
          medical_condition: medical_condition,
          allergy: allergy,
          special_need: special_need,
          updatedDateTime: new Date(),
          title_en: title_en,
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
