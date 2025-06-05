const express = require("express");
const router = express.Router({ mergeParams: true });

// /v2.1/manage/account

// for v2.1
// const eachProjectRoute = require('./(each-project)/eachProjectRoutes')
// const projectImportRoute = require('./import/projectImportRoutes')

// const projectControllers = require('./accountManagerControllers');

// const isLoggedIn = require("../_middleware/isLoggedIn");


// router.get('/announcement', [isLoggedIn()], projectControllers.getAnnouncementListController)
// router.get('/list', projectControllers.searchListProjectByNamePageController)
// router.use('/import', projectImportRoute)
// router.post('/new', [isLoggedIn()], projectControllers.createNewProjectCon)

// router.use('/:projectID', eachProjectRoute)


//---------- default -----------------

router.get('/', (req, res) => {
    res.status(200).json({
        currentPath: '/v2.1/manage/account',
    })
})

module.exports = router