const express = require('express')
const router = express.Router()
const prisma = require('../../../prisma')
const VerifyUserJWT = require('../../../account/login/token/verifyUserJwt')

// /v2/project/my-project/data

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
      const data = await prisma.projects.findUnique({
        where: { project_id: projectID },
        include: {
          ownerOrg: { select: { orgName: true, orgType: true } },
          projectData: true,
          projectConsiderationStatus: true,
          participantRecruit: true,
          staffRecruit: { include: { positions: true } },
        },
      })
      res.status(200).json({ data })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        status: 'internal server error',
        detail: 'Internal Server Error - Check Server Log',
      })
    }
  }
})

module.exports = router
