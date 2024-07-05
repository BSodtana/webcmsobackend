const express = require('express')
const router = express.Router()

// /v2/project/
router.use('/participant', require('./participant'))
module.exports = router
