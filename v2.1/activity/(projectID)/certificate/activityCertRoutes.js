const express = require("express");
const router = express.Router({ mergeParams: true });

const activityCertControllers = require("./activityCertControllers");

const isLoggedIn = require("../../../_middleware/isLoggedIn");
const isProjectOwner = require("../../../_middleware/isProjectOwner");

// /v2.1/activity/:projectID/certificate


router.get('/status', [isLoggedIn()], activityCertControllers.getCertStatusPCPCon)
router.post('/status', [isLoggedIn(), isProjectOwner()], activityCertControllers.editCertStatusCon)

router.get('/data', [isLoggedIn()], activityCertControllers.getCertDefaultDataCon)
router.post('/data', [isLoggedIn(), isProjectOwner()], activityCertControllers.editCertDefaultDataCon)

// todo:
router.post('/generate', [isLoggedIn(), isProjectOwner()], activityCertControllers.editCertStatusWithConsentCon)
router.post('/consent', [isLoggedIn()], activityCertControllers.generateCertForUserCon)

router.use('/pdf', require('./(pdfCertLogic)/pdfRoute'))

// router.get('/download', [isLoggedIn()], activityControllers.getCheckInCodeCon)



//---------- default -----------------
router.get('/', (req, res) => {
    res.status(200).json({ status: 200, currentPath: `/v2.1/activity/${req.params?.projectID || 'UNDEFINED'}/certificate` })
})


module.exports = router