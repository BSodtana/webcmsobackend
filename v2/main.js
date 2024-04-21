const express = require('express')
const router = express.Router()

// IMPORTS
const account = require('./account')

router.use('/account', account)

router.get('/', (req, res) => {
  res.status(200).json({ currentPath: '/v2/', DB_HOST: process.env.DB_HOST })
})

module.exports = router
