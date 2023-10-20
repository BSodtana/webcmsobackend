const express = require('express')
const router = express.Router()
const newUser = require('./helpers/newuser')
const SendMailToUserToGetEmailVerified = require('./helpers/verifyEmail')
const CheckVerificationCode = require('./helpers/checkVerificationCode')

// ____/v1/user-management/register/newuser

router.get('/', async (req, res) => {
  res.status(405).json({ status: 'error', code: 405, detail: '405 Method Not Allowed' })
})

router.post('/verifyemail', async (req, res) => {
  await SendMailToUserToGetEmailVerified(req, res)
})

router.post('/verifycode', async (req, res) => {
  await CheckVerificationCode(req, res)
})

// This route handle user registration
// it accepts parameters: email, password, student_id in a post request
router.post('/', async (req, res) => {
  await newUser(req, res)
})

module.exports = router
