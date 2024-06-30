const express = require('express')
const router = express.Router()
const prisma = require('../../../../../../prisma')
const VerifyUserJWT = require('../../../../../../account/login/token/verifyUserJwt')

// /v2/project/my-project/data

router.post('/:positionID', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  const { positionID } = req.params
  const { registerFrom, registerUntil, positionName, maxNumber } = req.body
  if (!token) {
    res.status(401).json({
      status: 'unauthorized',
      detail: "No token in header's authoriazation",
    })
  }
  if (token) {
    try {
      const tokenData = await VerifyUserJWT(token)
      await prisma.projectstaffrecruitposition.update({
        where: { staffPositionID: positionID },
        data: {
          registerFrom: registerFrom,
          registerUntil: registerUntil,
          maxNumber: maxNumber,
          positionName: positionName,
          isAllowed: 1,
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
