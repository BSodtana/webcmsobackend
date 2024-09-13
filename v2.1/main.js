const express = require('express')
const router = express.Router()

// IMPORTS
const account = require('./account/accountRoutes')
const project = require('./project/projectRoutes')
// const demo = require('./demo/demoRoutes')
const common = require('./common/commonRoutes')
const organization = require('./organization/organizationRoutes')

router.use('/account', account)
router.use('/project', project)
router.use('/common', common)
router.use('/organization', organization)

router.get('/', (req, res) => {
  res.status(200).json({ currentPath: '/v2.1/' })
})

module.exports = router
