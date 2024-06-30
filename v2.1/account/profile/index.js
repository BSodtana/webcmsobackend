const express = require('express')
const router = express.Router()
const prisma = require('../../prisma')

// /v2/account/profile/
router.use('/update', require('./update'))

router.get('/', async (req, res) => {
  res.status(200).json({ currentPath: '/v2/account/profile' })
})
module.exports = router
