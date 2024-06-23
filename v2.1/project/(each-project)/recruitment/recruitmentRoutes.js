const express = require("express");
const router = express.Router({ mergeParams: true });
// /v2.1/project/:projectID/recruitment/

// for v2.1
const isLoggedIn = require("../../../_middleware/isLoggedIn");
const recruitmentControllers = require("./recruitmentControllers");

router.get('/list/participant', [isLoggedIn()], recruitmentControllers.getParticipantRecruitmentListController)
router.get('/list/staff', [isLoggedIn()], recruitmentControllers.getStaffRecruitmentListController)


//---------- default -----------------

router.get('/', (req, res) => {
    res.status(200).json({ status: 200, currentPath: `/v2.1/project/${req.params.projectID}/recruitment/` })
})

module.exports = router