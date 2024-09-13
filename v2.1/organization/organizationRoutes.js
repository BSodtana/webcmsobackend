const express = require("express");
const router = express.Router();

const isLoggedIn = require("../_middleware/isLoggedIn");

const orgControllers = require('../common/organization/orgControllers')
const eachOrgRoute = require('../common/organization/(orgID)/eachOrgRoutes')
// /v2.1/organization

router.get('/list', [isLoggedIn()], orgControllers.listAllOrgCMSOCon)
router.use('/:orgID', eachOrgRoute)

//---------- default -----------------

router.get('/', [isLoggedIn()], orgControllers.listAllOrgCMSOCon)


module.exports = router