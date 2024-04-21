const express = require('express')
const router = express.Router()

// IMPORTS
const account = require('./account')

router.use('/account', account)

router.get('/', (req, res) => {
  res.status(200).json({ currentPath: '/v2/' })
})

module.exports = router
