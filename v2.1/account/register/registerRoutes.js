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
const registerControllers = require('./registerControllers');
const { rateLimiter } = require("../../_middleware/rateLimit");

// for prelim data
router.get('/prelim-data/:studentID', [rateLimiter], registerControllers.prelimDataController)

// // for verification
router.post('/verify/sent', [rateLimiter], registerControllers.genStudentVerificationCode)
router.post('/verify/check', [rateLimiter], registerControllers.verifiedEmailStudentCon)


router.get('/', (req, res) => {
    res.status(200).json({ status: 200, currentPath: '/v2.1/account/register/' })
})

module.exports = router