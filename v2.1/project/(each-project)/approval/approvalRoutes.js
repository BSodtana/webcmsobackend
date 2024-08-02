const express = require("express");
const approvalControllers = require("./approvalControllers");
const isLoggedIn = require("../../../_middleware/isLoggedIn");
const isProjectOwner = require("../../../_middleware/isProjectOwner");
const router = express.Router({ mergeParams: true });
// /v2.1/project/:projectID/approval


router.get('/data', [isLoggedIn(), isProjectOwner()], approvalControllers.getProjectApprovalData)
// router.put('/data', [isLoggedIn(), isProjectOwner()], approvalControllers.getProjectApprovalData)

// router.get('/status', [isLoggedIn(), isProjectOwner()], approvalControllers.getProjectApprovalData)
// router.put('/status', [isLoggedIn(), isProjectOwner()], approvalControllers.getProjectApprovalData)



//---------- default -----------------
router.get('/', [isLoggedIn(), isProjectOwner()], approvalControllers.getProjectApprovalData)


module.exports = router