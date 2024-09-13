const express = require("express");
const router = express.Router({ mergeParams: true });
// /v2.1/common/:orgID


// for v2.1
const eachOrgControllers = require('./eachOrgControllers');

const isLoggedIn = require("../../../_middleware/isLoggedIn");
const isOrgOwner = require("../../../_middleware/isOrgOwner");


router.get('/data', [isLoggedIn()], eachOrgControllers.getSpecificOrgDetailsCon)
router.put('/data', [isLoggedIn(), isOrgOwner()], eachOrgControllers.editOrgSpecificCon)

router.get('/sub-org', [isLoggedIn()], eachOrgControllers.getSubOrgListCon)

router.get('/projects', [isLoggedIn()], eachOrgControllers.getProjectOrgOwnedCon)



//---------- default -----------------
router.get('/', [isLoggedIn()], eachOrgControllers.getSpecificOrgDetailsCon)


module.exports = router