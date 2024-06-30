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
  console.log(token)
  try {
    if (token) {
      const data = await VerifyUserJWT(token)
      if (data.isAuthenticated) {
        const affiliation = await prisma.users.findFirst({
          where: { studentID: data.data.studentID },
          select: {
            useraffiliation: { include: { organizations: true } },
          },
        })
        console.log(affiliation.useraffiliation)
        res.status(200).json({
          status: 200,
          currentPath: '/v2/account/login/affiliate/',
          affiliation,
        })
      }
    }
  } catch (err) {
    console.log(err)
  }
})
module.exports = router
