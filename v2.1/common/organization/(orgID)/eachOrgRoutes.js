const express = require("express");
const router = express.Router({ mergeParams: true });
// /v2.1/common/:orgID


// for v2.1
const eachOrgControllers = require('./eachOrgControllers');

const isLoggedIn = require("../../../_middleware/isLoggedIn");
// const isLoggedIn = require("../../_middleware/isLoggedIn");
// const isProjectOwner = require("../../_middleware/isProjectOwner");

router.get('/data', [isLoggedIn()], eachOrgControllers.getSpecificOrgDetailsCon)
router.get('/sub-org', [isLoggedIn()], eachOrgControllers.getSubOrgListCon)


//---------- default -----------------
router.get('/', [isLoggedIn()], eachOrgControllers.getSpecificOrgDetailsCon)


module.exports = router