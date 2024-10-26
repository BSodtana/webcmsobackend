const express = require("express");
const router = express.Router();
// /v2.1/activity

router.use('/:projectID', require('./(projectID)/activityRoutes'))

//---------- default -----------------

router.get('/', (req, res) => {
    res.status(200).json({ status: 200, currentPath: '/v2.1/activity' })
})

module.exports = router