const express = require('express')
const router = express.Router()
const prisma = require('../../../prisma')
const VerifyUserJWT = require('../../../account/login/token/verifyUserJwt')

// /v2/project/my-project/recruit

router.get('/:projectID', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  console.log(req.headers.authorization)
  const { projectID } = req.params
  if (!token) {
    res.status(401).json({
      status: 'unauthorized',
      detail: "No token in header's authoriazation",
    })
  }
  if (token) {
    try {
      const tokenData = await VerifyUserJWT(token)
      const data = await prisma.projects.findFirst({
        where: { project_id: projectID },
        include: {
          projectParticipantRecruit: true,
          projectStaffRecruit: true,
        },
      })
      res.status(200).json({ data })
    } catch (error) {
      res.status(500).json({
        status: 'internal server error',
        detail: 'Internal Server Error - Check Server Log',
      })
    }
  }
})

module.exports = router
