const express = require('express')
const router = express.Router()

// IMPORTS
const account = require('./account/accountRoutes')
const project = require('./project')

router.use('/account', account)
router.use('/project', project)

router.get('/', (req, res) => {
  res.status(200).json({ currentPath: '/v2.1/' })
})

module.exports = router
