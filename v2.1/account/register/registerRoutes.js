const express = require("express");
const router = express.Router();
// .../v2.1/account/register/


// for v2
const getFirstnameAndLastnameWithStudentID = require('./getFirstnameAndLastnameWithStudentID')
const requestNewAccount = require('./requestNewAccount')

// /v2/account/register/getFirstnameAndPasswordWithStudentID
router.use(
    '/getFirstnameAndLastnameWithStudentID',
    getFirstnameAndLastnameWithStudentID
)
router.use('/requestNewAccount', requestNewAccount)


// for v2.1
const registerControllers = require('./registerControllers')

// for prelim data
router.get('/prelim-data/:studentID', registerControllers.prelimDataController)

// // for verification
router.post('/verify/sent', registerControllers.genStudentVerificationCode)
router.post('/verify/check', registerControllers.verifiedEmailStudentCon)


router.get('/', (req, res) => {
    res.status(200).json({ status: 200, currentPath: '/v2.1/account/register/' })
})

module.exports = router