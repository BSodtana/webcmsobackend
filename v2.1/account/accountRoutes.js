const express = require("express");
const router = express.Router();
// /v2.1/account/

// for v2
const login = require('./login')
const logout = require('./logout')
const register = require('./register/registerRoutes')
const profile = require('./profile')
const resetPassword = require('./reset-password')
const affiliate = require('./affiliate')

router.use('/login', login)
router.use('/logout', logout)
router.use('/register', register)
router.use('/profile', profile)
router.use('/reset-password', resetPassword)
router.use('/affiliate', affiliate)

// for v2.1
const accountControllers = require('./accountControllers')

router.post('/hello-world', accountControllers.helloWorldController)

//---------- default -----------------

router.get('/', (req, res) => {
    res.status(200).json({ status: 200, currentPath: '/v2.1/account/' })
})

module.exports = router