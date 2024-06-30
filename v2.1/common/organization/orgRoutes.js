const express = require("express");
const router = express.Router();
// /v2.1/common/

// for v2.1
const eachOrgRoute = require('./(orgID)/eachOrgRoutes')

const commonControllers = require('./orgControllers');

const isLoggedIn = require("../../_middleware/isLoggedIn");


router.get('/list', [isLoggedIn()], commonControllers.listAllOrgCMSOCon)
router.use('/:orgID', eachOrgRoute)


//---------- default -----------------

router.get('/', [isLoggedIn()], commonControllers.listAllOrgCMSOCon)


module.exports = router