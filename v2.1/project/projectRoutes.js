const express = require("express");
const router = express.Router();
// /v2.1/project/

// for v2
router.use('/my-project', require('./my-project'))


// for v2.1
const eachProjectRoute = require('./(each-project)/eachProjectRoutes')
const projectImportRoute = require('./import/projectImportRoutes')

const projectControllers = require('./projectControllers');

const isLoggedIn = require("../_middleware/isLoggedIn");


router.get('/announcement', [isLoggedIn()], projectControllers.getAnnouncementListController)
router.get('/list', projectControllers.searchListProjectByNamePageController)
router.use('/import', projectImportRoute)
router.post('/new', [isLoggedIn()], projectControllers.createNewProjectCon)

router.use('/:projectID', eachProjectRoute)


//---------- default -----------------

router.get('/', (req, res) => {
    const today = new Date()

    res.status(200).json({
        status: 200,
        currentPath: '/v2.1/project/',
    })
})

module.exports = router