const express = require('express')
const router = express.Router()
const prisma = require('../../prisma')

// /v2/account/reset-password/
router.use('/request-verification-code', require('./request-verification-code'))

router.get('/', async (req, res) => {
  res.status(200).json({ currentPath: '/v2/account/reset-password/' })
})
module.exports = router
