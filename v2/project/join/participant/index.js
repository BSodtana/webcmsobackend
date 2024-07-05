const express = require('express')
const prisma = require('../../../prisma')
const router = express.Router()
const VerifyUserJWT = require('../../../account/login/token/verifyUserJwt')

// /v2/project/

router.get('/:recruitID', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  const { recruitID } = req.params
  const zeroPad = (num, places) => String(num).padStart(places, '0')
  if (!token) {
    res.status(401).json({
      status: 'unauthorized',
      detail: "No token in header's authoriazation",
    })
  }
  if (token) {
    try {
      const tokenData = await VerifyUserJWT(token)
      const recruitData = await prisma.projectparticipantrecruit.findFirst({
        where: { participantRecruitID: { equals: recruitID } },
      })
      const yearAllowedArray = recruitData.yearAllowed.split(',')
      const countRows = await prisma.projectparticipants.count({
        where: {
          recruitID: { equals: recruitID },
        },
      })
      const alreadyRegistered = await prisma.projectparticipants.count({
        where: {
          AND: [
            { studentID: tokenData.data.studentID },
            { recruitID: recruitID },
          ],
        },
      })
      const applicationID = `${recruitID}-${zeroPad(countRows + 1, 4)}`
      if (alreadyRegistered > 0) {
        res.status(401).json({ status: 'fail - already registered' })
      } else {
        if (yearAllowedArray.includes(tokenData.data.currentYear.toString())) {
          await prisma.projectparticipants.create({
            data: {
              recruitID: recruitID,
              studentID: tokenData.data.studentID,
              participantApplicationID: applicationID,
            },
          })
          res.status(200).json({ status: 'success' })
        }
        if (!yearAllowedArray.includes(tokenData.data.currentYear.toString())) {
          res.status(401).json({ detail: 'Does not match criteria - year' })
        }
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

module.exports = router
