const express = require("express");
const router = express.Router();

// /v2.1/account/profile/project

// for v2
// router.use('/update', require('./update'))

// for v2.1
const myProjectControllers = require('./myProjectControllers');
const isLoggedIn = require("../../../_middleware/isLoggedIn");

router.get('/own', [isLoggedIn()], myProjectControllers.getProjectMyOwnController)
// router.put('/personal', [isLoggedIn()], profileControllers.putUserFullDataController)


//---------- default -----------------
// router.get('/', [isLoggedIn()], profileControllers.getUserFullDataController)


module.exports = router