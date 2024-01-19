const express = require('express')
const router = express.Router()
const db = require('../../../config/db')
const verifyJwt = require('../../utils/jwtVerify')
const vacancy = require('./vacancy')
const register = require('./register')

// PATH: /projects/user

router.use('/vacancy', vacancy)
router.use('/register', register)

router.get('/', async (req, res) => {
  const jwt = req.header('Authorization')?.split(' ')[1]
  if (!jwt) res.status(400).json({ status: 'error', payload: 'No JWT provided - Bad Request' })
  if (jwt) {
    const token = await verifyJwt(jwt)
    if (token.isAuthenticated) {
      const projects = await db.query('SELECT project_id, student_id, p.orgID, o.orgName, projectName, projectDescription, projectDetail, eventDateStart, eventDateFinish, updatedDateTime, createdDateTime FROM projects p JOIN organizations o ON o.orgID = p.orgID WHERE student_id = ?', [token.data.studentID])
      res.status(200).json({ status: 'success', payload: projects, data: token.data })
    }
    if (!token.isAuthenticated) {
      res.status(401).json({ status: 'error', payload: token.reason })
    }
  }
})

router.get('/status/:projectID', async (req, res) => {
  const { projectID } = req.params
  const jwt = req.header('Authorization')?.split(' ')[1]
  if (!jwt) res.status(400).json({ status: 'error', payload: 'No JWT provided - Bad Request' })
  if (jwt) {
    const token = await verifyJwt(jwt)
    if (token.isAuthenticated) {
      const projects = await db.query('SELECT COUNT(student_id) AS count FROM project_participants WHERE student_id = ? AND recruitID LIKE ?', [token.data.studentID, `${projectID}%`])
      if (parseInt(projects[0].count) === 0) { res.status(200).json({ registered: false, data: token.data }) }
      if (parseInt(projects[0].count) === 1) { res.status(200).json({ registered: true, data: token.data }) }
    }
    if (!token.isAuthenticated) {
      res.status(401).json({ status: 'error', payload: token.reason })
    }
  }
})

module.exports = router
