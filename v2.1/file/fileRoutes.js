const express = require("express");
const router = express.Router();

// /v2.1/file/

// const eachProjectRoute = require('./(each-project)/eachProjectRoutes')

const fileControllers = require('./fileControllers');

const isLoggedIn = require("../_middleware/isLoggedIn");


// todo
router.post('/upload', [isLoggedIn()], fileControllers.uploadFileCon)
// router.get('/view', projectControllers)
// router.use('/manage', projectControllers)



//---------- default -----------------

router.get('/', (req, res) => {
    res.status(200).json({ status: 200, currentPath: '/v2.1/file/' })
})

module.exports = router