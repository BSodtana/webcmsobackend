const express = require("express");
const router = express.Router({ mergeParams: true });

// /v2.1/manage/project

router.use('/annoucements', require('./announcements/projectRoutes'))

//---------- default -----------------

router.get('/', (req, res) => {
    res.status(200).json({
        currentPath: '/v2.1/manage/project',
    })
})

module.exports = router