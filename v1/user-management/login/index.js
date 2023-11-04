const express = require('express')
const router = express.Router()
const db = require('../../../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const JS_PRIVATE_KEY = require("../../../config/private")

// ____/v1/user-management/login/
const jwtHandler = require('./jwt')
const JS_PRIVATE_KEY = require('../../../config/private')

router.use('/jwt', jwtHandler)

router.post('/userandpass', async (req, res) => {
  const { email, password } = req.body
  if (email && password) {
    try {
      const credential = await db.query('SELECT email, password, student_id, role FROM users_credential WHERE email = ? LIMIT 1', [email])
      if (credential.length === 0) res.status(400).json({ success: false, error: 'NO_USER_USING_THIS_EMAIL' })
      if (credential.length === 1) {
        const compare = await bcrypt.compare(password, credential[0].password)
        if (compare) {
          try {
            const token = await jwt.sign({ studentID: credential[0].student_id, role: credential[0].role }, JS_PRIVATE_KEY, { expiresIn: '7d' })
            res.status(200).json({ success: true, jwt: token })
          } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, detail: err })
          }
        }
        if (!compare) res.status(200).json({ success: false, jwt: null, error: 'WRONG_PASSWORD' })
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({ success: false, error: err })
    }
  } else {
    (
      res.status(400).json({ success: false, error: `Request body malformed, both username and password are required, you provided only ${email ? 'email' : password ? 'password' : 'none'}` })
    )
  }
})

module.exports = router
