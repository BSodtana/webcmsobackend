const express = require('express')
const router = express.Router()
const prisma = require('../../prisma')

const getFirstnameAndLastnameWithStudentID = require('./getFirstnameAndLastnameWithStudentID')
const requestNewAccount = require('./requestNewAccount')
// /v2/account/register/getFirstnameAndPasswordWithStudentID

router.use(
  '/getFirstnameAndLastnameWithStudentID',
  getFirstnameAndLastnameWithStudentID
)
router.use('/requestNewAccount', requestNewAccount)
router.get('/', async (req, res) => {
  res.status(200).json({ currentPath: '/v2/account/register' })
})
module.exports = router
