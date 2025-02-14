const express = require("express");
const router = express.Router();
const fileManagerRouter = require('./manage/fileManagerRoutes')

// /v2.1/file/

const fileControllers = require('./fileControllers');

const isLoggedIn = require("../_middleware/isLoggedIn");


// todo
router.post('/upload', [isLoggedIn()], fileControllers.uploadFileCon)
router.get('/view', [isLoggedIn({ allowedGuestNotLogin: true })], fileControllers.getFileCon)

router.use('/manage', fileManagerRouter)



//---------- default -----------------

router.get('/', (req, res) => {
    res.status(200).json({ status: 200, currentPath: '/v2.1/file/' })
})

module.exports = router