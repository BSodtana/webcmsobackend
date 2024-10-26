const express = require("express");
const router = express.Router({ mergeParams: true });

const activityControllers = require('./activityControllers');

const isLoggedIn = require("../../_middleware/isLoggedIn");
const isProjectOwner = require("../../_middleware/isProjectOwner");

// /v2.1/activity/:projectID
// router.get('/check-in/', [isLoggedIn()], activityControllers.getCheckInCodeCon)
// router.get('/check-in/data', [isLoggedIn()], activityControllers.getCheckInCodeCon)
router.post('/check-in/bulk', [isLoggedIn(), isProjectOwner()], activityControllers.checkInBulkCon)


//---------- default -----------------
router.get('/', (req, res) => {
    res.status(200).json({ status: 200, currentPath: `/v2.1/activity/${req.params?.projectID || 'UNDEFINED'}` })
})


module.exports = router