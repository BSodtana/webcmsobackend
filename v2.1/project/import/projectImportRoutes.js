const express = require("express");
const router = express.Router();
const projectImportControllers = require('./projectImportControllers');
const isLoggedIn = require("../../_middleware/isLoggedIn");


// /v2.1/project/import

router.get('/list', [isLoggedIn()], projectImportControllers.getMSListProjectController)
router.post('/new', [isLoggedIn()], projectImportControllers.createNewProjectFromMSListCon)


//---------- default -----------------

router.get('/', (req, res) => {
    res.status(200).json({ status: 200, currentPath: '/v2.1/project/import' })
})

module.exports = router