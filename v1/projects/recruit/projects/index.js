const express = require('express')
const router = express.Router()
const db = require('../../../../config/db')
const verifyJwt = require('../../../utils/jwtVerify')

// PATH: /projects/user

router.get('/', async (req, res) => {
  const jwtHeader = req.header('Authorization')
  const jwt = jwtHeader?.split(' ')[1] || false
  if (!jwt) res.status(400).json({ status: 'error', payload: 'No JWT provided - Bad Request' })
  if (jwt) {
    const token = await verifyJwt(jwt)
    if (token.isAuthenticated) {
      const projects = await db.query("SELECT pd.project_id, pd.name, pd.division_id, pd.updatedDateTime, pd.register_date_from, pd.register_date_until, pd.participant, CASE WHEN c.id IS NOT NULL THEN CONCAT(c.name, ' ', d2.name)WHEN d.id IS NOT NULL THEN d.name END AS org_name FROM projects pd LEFT JOIN clubs c ON pd.division_id = c.id LEFT JOIN divisions d ON pd.division_id = d.id LEFT JOIN divisions d2 ON c.owner_org = d2.id WHERE pd.owner_id = ?", [token.data.student_id])
      res.status(200).json({ status: 'success', payload: projects, data: token.data })
    }
    if (!token.isAuthenticated) {
      res.status(401).json({ status: 'error', payload: token.reason })
    }
  }
})

module.exports = router
