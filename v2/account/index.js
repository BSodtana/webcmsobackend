const express = require('express')
const router = express.Router()

// /v2/account/
const login = require('./login')
const logout = require('./logout')
const register = require('./register')
const profile = require('./profile')
const resetPassword = require('./reset-password')
const affiliate = require('./affiliate')

router.use('/login', login)
router.use('/logout', logout)
router.use('/register', register)
router.use('/profile', profile)
router.use('/reset-password', resetPassword)
router.use('/affiliate', affiliate)

router.get('/', (req, res) => {
  res.status(200).json({ status: 200, currentPath: '/v2/account/' })
})
module.exports = router
