const express = require("express");
const router = express.Router();

// /v2.1/account/profile/

// for v2
router.use('/update', require('./update'))

// for v2.1
const profileControllers = require('./profileControllers');
const isLoggedIn = require("../../_middleware/isLoggedIn");

router.get('/personal', [isLoggedIn()], profileControllers.getUserFullDataController)
router.put('/personal', [isLoggedIn()], profileControllers.putUserFullDataController)


//---------- default -----------------
router.get('/', [isLoggedIn()], profileControllers.getUserFullDataController)


module.exports = router