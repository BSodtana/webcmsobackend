const express = require('express')
const router = express.Router()

// ____/v1/user-management/credential/
const jwtHandler = require('./jwt')
const accountData = require('./account')
const password = require('./password')

router.use('/', jwtHandler)
router.use('/account', accountData)
router.use('/password', password)

module.exports = router
