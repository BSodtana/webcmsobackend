const express = require('express')
const router = express.Router()
const db = require('../../../../config/db')
const verifyJwt = require('../../../utils/jwtVerify')
// PATH: /projects/recruit/participant/create

router.get('/', async (req, res) => {
  res.status(200).json({ status: 'success', payload: '/projects/recruit/participant/create' })
})

router.post('/', async (req, res) => {
  const jwtHeader = req.header('Authorization')
  const jwt = jwtHeader?.split(' ')[1] || false
  const { projectID, registerFrom, registerUntil, maxNumber } = req.body
  if (!jwt) res.status(400).json({ status: 'error', payload: 'No JWT provided - Bad Request' })
  if (jwt) {
    const token = await verifyJwt(jwt)
    if (token.isAuthenticated) {
      try {
        const recruitID = await GenerateRecruitmentID(projectID)
        console.log(recruitID)
        await db.query('INSERT INTO project_recruit_participant (recruitID, projectID, registerFrom, registerUntil, maxNumber, isAllowed) VALUES (?,?,?,?,?,?)',
          [recruitID, projectID, registerFrom, registerUntil, maxNumber, 1])
        res.status(200).json({ status: 'success', data: token.data })
      } catch (err) {
        res.status(500).json({ status: 'error', data: 'Internal Server Error' })
        console.log(err)
      }
    }
    if (!token.isAuthenticated) {
      res.status(401).json({ status: 'error', payload: token.reason })
    }
  }
})

async function GenerateRecruitmentID (projectID) {
  const query = await db.query('SELECT COUNT(projectID) AS COUNT FROM project_recruit_participant WHERE projectID = ?', [projectID])
  const num = parseInt(query[0].COUNT)
  return `${projectID}-P${num + 1}`
}
module.exports = router
