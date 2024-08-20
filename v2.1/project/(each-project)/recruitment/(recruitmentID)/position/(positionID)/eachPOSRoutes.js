const express = require("express");

const router = express.Router({ mergeParams: true });
// /v2.1/project/:projectID/recruitment/:recruitmentID/position/:positionID

// for v2.1
const isLoggedIn = require("../../../../../../_middleware/isLoggedIn");
const isProjectOwner = require("../../../../../../_middleware/isProjectOwner");

const eachPOSControllers = require("./eachPOSControllers");

router.get('/data', [isLoggedIn()], eachPOSControllers.getDataStaffSpecificPositionIDCon)
router.put('/data', [isLoggedIn(), isProjectOwner()], eachPOSControllers.editStaffPositionCon)
router.delete('/data', [isLoggedIn(), isProjectOwner()], eachPOSControllers.deleteStaffPositionCon)



//---------- default -----------------

router.get('/', [isLoggedIn()], eachPOSControllers.getDataStaffSpecificPositionIDCon)

module.exports = router