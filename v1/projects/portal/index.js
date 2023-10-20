const express = require('express')
const router = express.Router()
const db = require('../../../config/db')
const verifyJwt = require('../../utils/jwtVerify')

// PATH: /projects/portal/
const project_announcement = require('./announcement')

router.use('/announcements', project_announcement)

router.get('/', async (req, res) => {
  const jwt = req.header('Authorization')
  if (!jwt) res.status(400).json({ status: 'error', payload: 'No JWT provided - Bad Request' })
  if (jwt) {
    const token = await verifyJwt(jwt)
    if (token.isAuthenticated) {
      res.status(200).json({ status: 'success', payload: 'hello', data: token.data })
    }
    if (!token.isAuthenticated) {
      res.status(401).json({ status: 'error', payload: token.reason })
    }
  }
})

module.exports = router
