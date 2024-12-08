const express = require("express");
const router = express.Router();
// /v2.1/file/

const eachProjectRoute = require('./(each-project)/eachProjectRoutes')

const projectControllers = require('./projectControllers');

const isLoggedIn = require("../_middleware/isLoggedIn");


router.get('/announcement', [isLoggedIn()], projectControllers.getAnnouncementListController)
router.get('/list', projectControllers.searchListProjectByNamePageController)
router.use('/:projectID', eachProjectRoute)


//---------- default -----------------

router.get('/', (req, res) => {
    res.status(200).json({ status: 200, currentPath: '/v2.1/file/' })
})

module.exports = router