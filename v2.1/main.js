const express = require('express')
const router = express.Router()

// IMPORTS
const account = require('./account/accountRoutes')
const project = require('./project')
const demo = require('./demo/demoRoutes')

router.use('/account', account)
router.use('/project', project)
router.use('/demo', demo)

router.get('/', (req, res) => {
  res.status(200).json({ currentPath: '/v2.1/' })
})

module.exports = router
