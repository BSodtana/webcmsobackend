const express = require("express");
const router = express.Router({ mergeParams: true });
// /v2.1/project/:projectID

// for v2.1
// for recruitment

router.use('/recruitment', require('./recruitment/recruitmentRoutes'))

// for others

const eachProjectControllers = require('./eachProjectControllers');
const isLoggedIn = require("../../_middleware/isLoggedIn");
const isProjectOwner = require("../../_middleware/isProjectOwner");

router.get('/data', eachProjectControllers.getProjectBriefDataCon)
router.put('/data', [isLoggedIn(), isProjectOwner()], eachProjectControllers.putProjectBriefDataCon)
router.delete('/data', [isLoggedIn(), isProjectOwner()], eachProjectControllers.deleteProjectBriefDataCon)

router.get('/detail', [isLoggedIn()], eachProjectControllers.getProjectFullDataCon)
router.put('/detail', [isLoggedIn(), isProjectOwner()], eachProjectControllers.putProjectFullDataCon)

// todo: middleware check if user is joining this activity be4 get announcement
// todo: middleware check if projectID is matching in the announcement b4 view/editing
router.get('/announcement', [isLoggedIn()], eachProjectControllers.getProjectAnnouncementCon)
router.put('/announcement', [isLoggedIn(), isProjectOwner()], eachProjectControllers.putProjectAnnouncementCon)
router.delete('/announcement', [isLoggedIn(), isProjectOwner()], eachProjectControllers.deleteProjectAnnouncementCon)
router.post('/announcement/new', [isLoggedIn(), isProjectOwner()], eachProjectControllers.newProjectAnnouncementCon)

router.get('/list', [isLoggedIn(), isProjectOwner()], eachProjectControllers.getProjectAllPCPCon)


//---------- default -----------------
router.get('/', eachProjectControllers.getProjectBriefDataCon)


module.exports = router