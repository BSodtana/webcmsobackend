const express = require('express')
const router = express.Router()
const db = require('../../../../config/db')
const verifyJwt = require('../../../utils/jwtVerify')
const create = require('./create')
const count = require('./number')
const data = require('./data')
// PATH: /projects/recruit/participant/

router.get('/', async (req, res) => {
  res.status(400).json({ status: 'error', payload: 'No projectID - Bad Request' })
})

router.use('/create', create)
router.use('/count', count)
router.use('/data', data)

router.get('/:projectID', async (req, res) => {
  const { projectID } = req.params
  const jwtHeader = req.header('Authorization')
  const jwt = jwtHeader?.split(' ')[1] || false
  if (!jwt) res.status(400).json({ status: 'error', payload: 'No JWT provided - Bad Request' })
  if (jwt) {
    const token = await verifyJwt(jwt)
    if (token.isAuthenticated) {
      const projects = await db.query('SELECT recruitID, projectID, projectName, registerFrom, registerUntil, maxNumber, prp.createdDateTime, isAllowed FROM project_recruit_participant prp JOIN projects ON projects.project_id = prp.projectID WHERE prp.projectID = ?', [projectID])
      res.status(200).json({ status: 'success', payload: projects, data: token.data })
    }
    if (!token.isAuthenticated) {
      res.status(401).json({ status: 'error', payload: token.reason })
    }
  }
})

router.put('/:recruitID', async (req, res) => {
  const { recruitID } = req.params
  const { newStatus } = req.body
  const jwtHeader = req.header('Authorization')
  const jwt = jwtHeader?.split(' ')[1] || false
  if (!jwt) res.status(400).json({ status: 'error', payload: 'No JWT provided - Bad Request' })
  if (jwt) {
    const token = await verifyJwt(jwt)
    if (token.isAuthenticated) {
      const ownerID = await db.query('SELECT projectID, student_id as ID FROM project_recruit_participant prp JOIN projects p ON p.project_id = prp.projectID WHERE recruitID = ?', [recruitID])
      if (parseInt(token.data.studentID) === ownerID[0].ID) {
        if (newStatus === '' || newStatus === 'undefined' || newStatus === null) res.status(400).json({ status: 'error', payload: 'No newStatus provided - Bad request' })
        else {
          await db.query('UPDATE project_recruit_participant SET isAllowed = ? WHERE recruitID = ?', [newStatus, recruitID])
          res.status(200).json({ status: 'success', data: token.data })
        }
      } else {
        res.status(401).json({ status: 'error', payload: 'There is error while trying to change recruitment status of the recruitment. Your token is valid but you are not owner of this project, plase do not try to breach our system!' })
      }
    }
    if (!token.isAuthenticated) {
      res.status(401).json({ status: 'error', payload: token.reason })
    }
  }
})

router.delete('/:recruitID', async (req, res) => {
  const { recruitID } = req.params
  const jwtHeader = req.header('Authorization')
  const jwt = jwtHeader?.split(' ')[1] || false
  if (!jwt) res.status(400).json({ status: 'error', payload: 'No JWT provided - Bad Request' })
  if (jwt) {
    const token = await verifyJwt(jwt)
    if (token.isAuthenticated) {
      const ownerID = await db.query('SELECT projectID, student_id as ID FROM project_recruit_participant prp JOIN projects p ON p.project_id = prp.projectID WHERE recruitID = ?', [recruitID])
      if (parseInt(token.data.studentID) === ownerID[0].ID) {
        await db.query('DELETE FROM project_recruit_participant WHERE recruitID = ? LIMIT 1', [recruitID])
        res.status(200).json({ status: 'success' })
      } else {
        res.status(401).json({ status: 'error', payload: 'There is error while trying to delete the recruitment. Your token is valid but you are not owner of this project, plase do not try to breach our system!', token })
      }
    }
    if (!token.isAuthenticated) {
      res.status(401).json({ status: 'error', payload: token.reason })
    }
  }
})

module.exports = router
