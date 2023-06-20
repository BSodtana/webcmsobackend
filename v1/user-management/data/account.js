const express = require('express')
const router = express.Router()
const db = require('../../../config/db')
const verifyJwt = require('../../utils/jwtVerify')

// ____/v1/user-management/credential/account

router.get('/', async (req, res) => {
  const token = req.header('Authorization')
  try {
    const verify = await verifyJwt(token)
    if (verify.isAuthenticated) {
      try {
        const query = await db.query('SELECT email, createdDateTime, uuid FROM users WHERE uuid = ? LIMIT 1', [verify.data.uuid])
        if (query.length === 1) res.status(200).json({ isAuthenticated: true, data: query[0], reason: null })
        if (query.length === 0) res.status(400).json({ isAuthenticated: false, data: '', reason: 'cannot find user based on uuid from token, suspect malfored token.' })
      } catch (err) {
        console.log(err)
        res.status(500).json(err)
      }
    }
    if (!verify.isAuthenticated) {
      res.status(401).json({ isAuthenticated: false, data: '', reason: 'Unauthorized access' })
      console.log(verify)
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
