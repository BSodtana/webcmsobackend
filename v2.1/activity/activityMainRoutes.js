const express = require("express");
const { getCertInfoDataCon } = require("./(projectID)/certificate/activityCertControllers");
const router = express.Router();
// /v2.1/activity

router.use('/:projectID', require('./(projectID)/activityRoutes'))

router.get('/info/:certID', [], getCertInfoDataCon)


//---------- default -----------------

router.get('/', (req, res) => {
    res.status(200).json({ status: 200, currentPath: '/v2.1/activity' })
})

module.exports = router