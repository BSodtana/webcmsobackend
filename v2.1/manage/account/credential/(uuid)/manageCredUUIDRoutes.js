const express = require("express");
const router = express.Router({ mergeParams: true });
// /v2.1/manage/account/credential/:uuid

// middleware
const isLoggedIn = require("../../../../_middleware/isLoggedIn");
const allowedByUserType = require("../../../../_middleware/allowedByUserType");

// controller
const manageCredUUIDControllers = require('./manageCredUUIDControllers')

router.get('/', [isLoggedIn(), allowedByUserType({ userType: ['ADMIN'] })], manageCredUUIDControllers.adminGetDataFromUUIDController)
router.delete('/', [isLoggedIn(), allowedByUserType({ userType: ['ADMIN'] })], manageCredUUIDControllers.adminDeleteCredentaialDataFromUUIDController)


//---------- default -----------------

// router.get('/', (req, res) => {
//     res.status(200).json({
//         currentPath: `/v2.1/manage/account/credential/${req.params?.uuid || 'UNDEFINED'}`
//     })
// })

module.exports = router