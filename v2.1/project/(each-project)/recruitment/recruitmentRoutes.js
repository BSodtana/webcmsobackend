const express = require("express");
const router = express.Router({ mergeParams: true });
// /v2.1/project/:projectID/recruitment/

// for v2.1
const isLoggedIn = require("../../../_middleware/isLoggedIn");
const isProjectOwner = require("../../../_middleware/isProjectOwner");

const recruitmentControllers = require("./recruitmentControllers");


router.get('/list/participant', [isLoggedIn()], recruitmentControllers.getParticipantRecruitmentListController)
router.get('/list/staff', [isLoggedIn()], recruitmentControllers.getStaffRecruitmentListController)

router.post('/new/participant', [isLoggedIn(), isProjectOwner()], recruitmentControllers.newParticipantRecruitmentController)
router.post('/new/staff', [isLoggedIn(), isProjectOwner()], recruitmentControllers.newStaffRecruitmentController)

router.use('/:recruitmentID', require('./(recruitmentID)/eachRCMRoutes'))

//---------- default -----------------

router.get('/', [isLoggedIn()], recruitmentControllers.getPCPSTFListController)

module.exports = router