const express = require("express");
const router = express.Router({ mergeParams: true });

// middleware
const isLoggedIn = require("../../../_middleware/isLoggedIn");
const allowedByUserType = require("../../../_middleware/allowedByUserType");

// controller
const adminCredentialControllers = require('./adminCredentialControllers')

// /v2.1/manage/account/credential

// router.post('/upload', [isLoggedIn()], fileControllers.uploadFileCon)
// router.get('/view', [isLoggedIn({ allowedGuestNotLogin: true })], fileControllers.getFileCon)


router.get('/search', [isLoggedIn(), allowedByUserType({ userType: ['ADMIN'] })], adminCredentialControllers.adminSearchUUIDfromStudentIDController)


//---------- default -----------------

router.get('/', (req, res) => {
    res.status(200).json({
        currentPath: '/v2.1/manage/account/credential'
    })
})

module.exports = router