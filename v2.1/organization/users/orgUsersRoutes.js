const express = require("express");
const isLoggedIn = require("../../_middleware/isLoggedIn");
const isOrgOwner = require("../../_middleware/isOrgOwner");
const orgUsersControllers = require("./orgUsersControllers");
const router = express.Router({ mergeParams: true });

// /v2.1/organization/:orgID/users

router.get('/list', [isLoggedIn(), isOrgOwner()], orgUsersControllers.getUsersInSpecifigOrgCon)


//---------- default -----------------

router.get('/', [isLoggedIn(), isOrgOwner()], orgUsersControllers.getUsersInSpecifigOrgCon)


module.exports = router