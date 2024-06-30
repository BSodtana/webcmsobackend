const express = require('express')
const router = express.Router()
const prisma = require('../../prisma')
const { successCodeToResponse } = require('../../_helpers/successCodeToResponse')
const { errorCodeToResponse } = require('../../_helpers/errorCodeToResponse')
const { readDataFromJWT } = require('../../_helpers/jwt/readDataFromJWT')


// /v2/account/logout
router.post('/', async (req, res) => {

  try {

    // read data from token
    const token = req.headers.authorization?.split(' ')[1]
    const tokenData = await readDataFromJWT(token, true)

    if (!tokenData.dataAvailable) {
      res.status(200).json(successCodeToResponse(tokenData.dataAvailable, 'LOGOUT-TOKEN-NOT-FOUND-SUCCESS', 'LOGOUT-UNKNOWN-TOKEN'))

    } else {
      await prisma.userslogout.create({
        data: {
          studentID: tokenData.data?.studentID || '000000000',
          token: token
        }
      })

      res.status(200).json(successCodeToResponse(tokenData.dataAvailable, 'LOGOUT-TOKEN-FOUND-SUCCESS', tokenData.data?.studentID || 'LOGOUT-UNKNOWN-USER'))

    }



  } catch (error) {
    console.log('logout', error)
    res.status(500).json(errorCodeToResponse(error?.code || "INTERNAL-ERROR", error?.desc || 'logout'))
  }
})
module.exports = router
