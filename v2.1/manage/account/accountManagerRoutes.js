const express = require("express");
const router = express.Router({ mergeParams: true });

// /v2.1/manage/account

router.use('/credential', require('./credential/adminCredentialRoutes'))
router.use('/users', require('./users/studentRoutes'))

//---------- default -----------------

router.get('/', (req, res) => {
    res.status(200).json({
        currentPath: '/v2.1/manage/account',
    })
})

module.exports = router