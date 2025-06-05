const express = require("express");
const router = express.Router();

// /v2.1/manage/

router.use('/account', require('./account/accountManagerRoutes'))
// router.use('/project', require('./account/accountManagerRoutes'))

//---------- default -----------------

router.get('/', (req, res) => {
    res.status(200).json({
        currentPath: '/v2.1/manage/'
    })
})

module.exports = router