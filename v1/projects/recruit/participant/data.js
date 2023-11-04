const express = require('express')
const router = express.Router()
const db = require('../../../../config/db')
const verifyJwt = require('../../../utils/jwtVerify')
// PATH: /projects/recruit/participant/

router.get('/', async (req, res) => {
  res.status(400).json({ status: 'error', payload: 'No projectID - Bad Request' })
})

router.get('/:recruitID', async (req, res) => {
  const { recruitID } = req.params
  const jwtHeader = req.header('Authorization')
  const jwt = jwtHeader?.split(' ')[1] || false
  if (!jwt) res.status(400).json({ status: 'error', payload: 'No JWT provided - Bad Request' })
  if (jwt) {
    const token = await verifyJwt(jwt)
    if (token.isAuthenticated) {
      const projects = await db.query('SELECT recruitID, projectID, projectName, registerFrom, registerUntil, maxNumber, prp.createdDateTime, isAllowed FROM project_recruit_participant prp JOIN projects ON projects.project_id = prp.projectID WHERE prp.recruitID = ?', [recruitID])
      res.status(200).json({ status: 'success', payload: projects, data: token.data })
    }
    if (!token.isAuthenticated) {
      res.status(401).json({ status: 'error', payload: token.reason })
    }
  }
})

router.get('/list/:projectID', async (req, res) => {
  const { projectID } = req.params
  const jwtHeader = req.header('Authorization')
  const jwt = jwtHeader?.split(' ')[1] || false
  if (!jwt) res.status(400).json({ status: 'error', payload: 'No JWT provided - Bad Request' })
  if (jwt) {
    const token = await verifyJwt(jwt)
    if (token.isAuthenticated) {
      const ownerID = await db.query('SELECT projectID, student_id as ID FROM project_recruit_participant prp JOIN projects p ON p.project_id = prp.projectID WHERE projectID = ?', [projectID])
      if (parseInt(token.data.studentID) === ownerID[0]?.ID) {
        const pID = ownerID[0]?.projectID
        const data = await db.query('SELECT DISTINCT(u.student_id), title, first_name, last_name, nick_name, current_year, line_id, up.createdDateTime FROM project_participants up JOIN users u ON u.student_id = up.student_id WHERE up.recruitID LIKE ? ORDER BY u.student_id ASC', [`${pID}%`])
        // const data = await db.query('SELECT DISTINCT(u.student_id), title, first_name, last_name, nick_name, current_year, line_id, ucd.email, up.createdDateTime FROM project_participants up JOIN users u ON u.student_id = up.student_id JOIN users_credential ucd ON ucd.student_id = u.student_id WHERE up.recruitID LIKE ?', [`${pID}%`])
        res.status(200).json({ status: 'success', data })
      } else {
        res.status(401).json({ status: 'error', payload: 'There is error while trying to fetch student list from this recruitment ID. Your token is valid but you are not owner of this project, please do not try to breach our system!', token })
      }
    }
    if (!token.isAuthenticated) {
      res.status(401).json({ status: 'error', payload: token.reason })
    }
  }
})

module.exports = router
