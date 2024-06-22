const express = require("express");
const router = express.Router({ mergeParams: true });
// /v2.1/project/:projectID


// for v2.1
const eachProjectControllers = require('./eachProjectControllers');
const isLoggedIn = require("../../_middleware/isLoggedIn");
const isProjectOwner = require("../../_middleware/isProjectOwner");

router.get('/data', eachProjectControllers.getProjectBriefDataCon)
router.put('/data', [isLoggedIn(), isProjectOwner()], eachProjectControllers.putProjectBriefDataCon)
router.delete('/data', [isLoggedIn(), isProjectOwner()], eachProjectControllers.deleteProjectBriefDataCon)

router.get('/detail', [isLoggedIn()], eachProjectControllers.getProjectFullDataCon)
router.put('/detail', [isLoggedIn(), isProjectOwner()], eachProjectControllers.putProjectFullDataCon)


//---------- default -----------------
router.get('/', eachProjectControllers.getProjectBriefDataCon)


module.exports = router