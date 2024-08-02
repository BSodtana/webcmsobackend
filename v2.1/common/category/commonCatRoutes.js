const express = require("express");
const commonCatControllers = require("./commonCatControllers");
const isLoggedIn = require("../../_middleware/isLoggedIn");
const router = express.Router();
// /v2.1/common/category


// router.get('/list', [isLoggedIn()], commonControllers.listAllOrgCMSOCon)
// router.use('/:orgID', eachOrgRoute)

router.get('/cmso-mission', [isLoggedIn()], commonCatControllers.cmsoMission)
router.get('/cmso-project', [isLoggedIn()], commonCatControllers.cmsoProject)
router.get('/cmu-med-grad', [isLoggedIn()], commonCatControllers.cmuMedGrad)
router.get('/cmu-med-org', [isLoggedIn()], commonCatControllers.cmuMedOrg)
router.get('/cmu-project', [isLoggedIn()], commonCatControllers.cmuProject)

//---------- default -----------------
router.get('/', (req, res) => {
    res.status(200).json({ status: 200, currentPath: '/v2.1/common/category/' })
})



module.exports = router