const express = require("express");
const router = express.Router({ mergeParams: true });

const { pdfPCPController, pdfSTFController } = require("./pdfController");

// /v2.1/activity/:projectID/certificate/pdf

router.get('/1', pdfPCPController)
router.get('/2', pdfSTFController)


//---------- default -----------------
router.get('/', (req, res) => {
    res.status(200).json({ status: 200, currentPath: `/v2.1/activity/${req.params?.projectID || 'UNDEFINED'}/certificate/pdf` })
})


module.exports = router