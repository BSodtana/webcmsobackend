const express = require('express')
const router = express.Router()

// IMPORTS
const account = require('./account/accountRoutes')
const project = require('./project/projectRoutes')
// const demo = require('./demo/demoRoutes')
const common = require('./common/commonRoutes')
const organization = require('./organization/organizationRoutes')
const activity = require('./activity/activityMainRoutes')
const file = require('./file/fileRoutes')
const adminManage = require('./manage/manageRoutes')
const studentManage = require('./manage/account/users/studentRoutes')

router.use('/account', account)
router.use('/project', project)
router.use('/common', common)
router.use('/organization', organization)
router.use('/activity', activity)
router.use('/file', file)
router.use('/manage', adminManage)
router.use('/manage/student', studentManage)


router.get('/', (req, res) => {
  res.status(200).json({ currentPath: '/v2.1/' })
})

module.exports = router
