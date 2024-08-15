const express = require('express')
const VerifyUserJWT = require('../login/token/verifyUserJwt')
const prisma = require('../../prisma')
const router = express.Router()

// /v2/account/login/affiliate

router.get('/', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    res.status(400).json({ detail: 'TOKEN NEEDED' })
  }
  if (token) {
    const data = await VerifyUserJWT(token)
    if (data.isAuthenticated) {
      const affiliation = await prisma.users.findFirst({
        where: { student_id: data.data.student_id },
        select: { affiliation: { include: { orgData: true } } },
       //ไม่สามารถเพิ่ม select ได้
      })
      res.status(200).json({
        status: 200,
        currentPath: '/v2/account/login/affiliate/',
        affiliation,
      })
    }
  }
})
module.exports = router
