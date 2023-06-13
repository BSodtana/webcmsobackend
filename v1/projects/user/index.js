const express = require('express')
const router = express.Router()
const db = require('../../../config/db')
const verifyJwt = require('../../utils/jwtVerify')

// PATH: /projects/user

router.get('/', async (req, res) => {
  const jwt = req.header('Authorization')
  if (!jwt) res.status(400).json({ status: 'error', payload: 'No JWT provided - Bad Request' })
  if (jwt) {
    const token = await verifyJwt(jwt)
    if (token.isAuthenticated) {
      const projects = await db.query("SELECT pd.project_id, pd.project_name, pd.owner_student, pd.createdDateTime, CASE WHEN c.id IS NOT NULL THEN CONCAT(c.name, ' ', d2.name)WHEN d.id IS NOT NULL THEN d.name END AS org_name FROM projects_data pd LEFT JOIN clubs c ON pd.owner_org = c.id LEFT JOIN divisions d ON pd.owner_org = d.id LEFT JOIN divisions d2 ON c.owner_org = d2.id WHERE pd.owner_student = ?", [token.data.student_id])
      res.status(200).json({ status: 'success', payload: projects, data: token.data })
    }
    if (!token.isAuthenticated) {
      res.status(401).json({ status: 'error', payload: token.reason })
    }
  }
})

module.exports = router
