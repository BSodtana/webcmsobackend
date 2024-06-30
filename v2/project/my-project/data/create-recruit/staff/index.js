const express = require('express')
const router = express.Router()
const prisma = require('../../../../../prisma')
const VerifyUserJWT = require('../../../../../account/login/token/verifyUserJwt')

// /v2/project/my-project/data
router.use('/position', require('./position'))

router.post('/:projectID', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  const { projectID } = req.params
  const { registerFrom, registerUntil, yearAllowed } = req.body
  if (!token) {
    res.status(401).json({
      status: 'unauthorized',
      detail: "No token in header's authoriazation",
    })
  }
  if (token) {
    try {
      const tokenData = await VerifyUserJWT(token)
      const projectData = await prisma.projects.findUnique({
        where: { projectID: projectID },
      })
      console.log(projectData.studentID === tokenData.data.studentID)
      if (projectData.studentID !== tokenData.data.studentID) {
        res.status(401).json({
          status: 'fail',
          detail:
            'unauthorized, student-id does not matches owner of this project',
        })
      }
      if (projectData.studentID === tokenData.data.studentID) {
        const currentRows = await prisma.projectstaffrecruit.count({
          where: { projectID: { equals: projectID } },
        })
        console.log(currentRows)
        const recruitID = `S${currentRows + 1}-${projectID}`
        await prisma.projectstaffrecruit.create({
          data: {
            staffRecruitID: recruitID,
            registerFrom: registerFrom,
            registerUntil: registerUntil,
            isAllowed: 1,
            yearAllowed: yearAllowed,
            projectID: projectID,
          },
        })
        res.status(200).json({ status: 'success' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({
        status: 'internal server error',
        detail: 'Internal Server Error - Check Server Log',
      })
    }
  }
})

router.put('/:recruitID', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  const { recruitID } = req.params
  const { registerFrom, registerUntil, yearAllowed, isAllowed } = req.body
  if (!token) {
    res.status(401).json({
      status: 'unauthorized',
      detail: "No token in header's authoriazation",
    })
  }
  if (token) {
    try {
      const tokenData = await VerifyUserJWT(token)
      await prisma.projectstaffrecruit.update({
        where: { staffRecruitID: recruitID },
        data: {
          staffRecruitID: recruitID,
          registerFrom: registerFrom,
          registerUntil: registerUntil,
          isAllowed: isAllowed,
          yearAllowed: yearAllowed,
        },
      })
      res.status(200).json({ status: 'success' })
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
