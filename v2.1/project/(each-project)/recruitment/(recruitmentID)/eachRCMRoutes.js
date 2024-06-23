const express = require("express");
const router = express.Router({ mergeParams: true });
// /v2.1/project/:projectID/recruitment/:recruitmentID/

// for v2.1
// const isLoggedIn = require("../../../_middleware/isLoggedIn");
// const isProjectOwner = require("../../../_middleware/isProjectOwner");

const eachRCMControllers = require("./eachRCMControllers");

const isProjectOwner = require("../../../../_middleware/isProjectOwner");
const isLoggedIn = require("../../../../_middleware/isLoggedIn");

router.get('/data', [isLoggedIn()], eachRCMControllers.getDataSpecificRecruitIDCon)
router.put('/data', [isLoggedIn(), isProjectOwner()], eachRCMControllers.editDataSpecificRecruitIDCon)
router.delete('/data', [isLoggedIn(), isProjectOwner()], eachRCMControllers.deleteDataSpecificRecruitIDCon)


//---------- default -----------------

router.get('/', [isLoggedIn()], eachRCMControllers.getDataSpecificRecruitIDCon)

module.exports = router