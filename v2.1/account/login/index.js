const express = require('express')
const router = express.Router()

// /v2/account/login/
const emailandpassword = require('./emailandpassword')
const token = require('./token')

router.use('/emailandpassword', emailandpassword)
router.use('/token', token)

router.get('/', (req, res) => {
  res.status(200).json({ status: 200, currentPath: '/v2/account/login/' })
})
module.exports = router
