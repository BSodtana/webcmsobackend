const express = require("express");
const router = express.Router({ mergeParams: true });
// /v2.1/manage/account/credential

// middleware
const isLoggedIn = require("../../../_middleware/isLoggedIn");
const allowedByUserType = require("../../../_middleware/allowedByUserType");

// controller
const adminCredentialControllers = require('./adminCredentialControllers')

router.get('/search', [isLoggedIn(), allowedByUserType({ userType: ['ADMIN'] })], adminCredentialControllers.adminSearchUUIDfromStudentIDController)
router.post('/new', [isLoggedIn(), allowedByUserType({ userType: ['ADMIN'] })], adminCredentialControllers.adminSetUserEmailPasswordController)

router.use('/:uuid', require('./(uuid)/manageCredUUIDRoutes'))


//---------- default -----------------

router.get('/', (req, res) => {
    res.status(200).json({
        currentPath: '/v2.1/manage/account/credential'
    })
})

module.exports = router