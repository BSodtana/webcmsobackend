const express = require("express");
const router = express.Router();
// /v2.1/account/login

// /v2/account/login/
const emailandpassword = require('./emailandpassword')
const token = require('./token')

router.use('/emailandpassword', emailandpassword)
router.use('/token', token)

// for v2.1
const loginControllers = require('./loginControllers')

router.post('/', loginControllers.loginControllers)

//---------- default -----------------
router.get('/', (req, res) => {
    res.status(200).json({ status: 200, currentPath: '/v2.1/account/login/' })
})
module.exports = router