const express = require("express");
const router = express.Router({ mergeParams: true });

const pdfController = require("./pdfController");
const isLoggedIn = require("../../../../_middleware/isLoggedIn");

// /v2.1/activity/:projectID/certificate/download
router.get('/', [isLoggedIn()], pdfController.downloadCertCon)
router.get('/1', pdfController.downloadCertConTest)


// //---------- default -----------------
// router.get('/', (req, res) => {
//     res.status(200).json({ status: 200, currentPath: `/v2.1/activity/${req.params?.projectID || 'UNDEFINED'}/certificate/download` })
// })


module.exports = router