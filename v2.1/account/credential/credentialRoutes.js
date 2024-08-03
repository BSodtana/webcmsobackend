const express = require("express");
const credentialControllers = require("./credentialControllers");
const { rateLimiter } = require("../../_middleware/rateLimit");
const router = express.Router()


// .../v2.1/account/credential
router.get('/reset-password', (req, res) => {
    res.status(200).json({ status: 200, currentPath: '/v2.1/account/credential/reset-password' })
})
router.post('/reset-password/sent', [rateLimiter], credentialControllers.genStudentVerificationCode)
router.post('/reset-password/check', [rateLimiter], credentialControllers.resetPasswordCon)


router.get('/', (req, res) => {
    res.status(200).json({ status: 200, currentPath: '/v2.1/account/credential/' })
})

module.exports = router