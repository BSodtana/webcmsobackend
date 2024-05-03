const express = require('express')
const router = express.Router()
const VerifyUserJWT = require('./verifyUserJwt')

// /v2/account/login/token

router.get('/', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  const user = await VerifyUserJWT(token)
  if (!user.isAuthenticated)
    res.status(401).json({
      data: {
        isAuthenticated: false,
        data: '',
        reason: 'Unauthorized access',
      },
    })
  if (user.isAuthenticated)
    res.status(200).json({ data: { isAuthenticated: true, data: user.data } })
})

module.exports = router
