const express = require("express");
const router = express.Router();
// /v2.1/common/

// for v2.1

router.use('/organization', require('./organization/orgRoutes'))
router.use('/category', require('./category/commonCatRoutes'))

//---------- default -----------------

router.get('/', (req, res) => {
    res.status(200).json({ status: 200, currentPath: '/v2.1/common/' })
})


module.exports = router