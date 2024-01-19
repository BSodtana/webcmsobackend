const express = require('express')
const router = express.Router()
const db = require('../../../config/db')
const verifyJwt = require('../../utils/jwtVerify')

// PATH: /projects/user/vacancy

router.get('/:date', async (req, res) => {
  const { date } = req.params
  const jwt = req.header('Authorization')?.split(' ')[1]
  if (!jwt) res.status(400).json({ status: 'error', payload: 'No JWT provided - Bad Request' })
  if (jwt) {
    const token = await verifyJwt(jwt)
    if (token.isAuthenticated) {
      const projects = await db.query('SELECT prp.recruitID, prj.projectName, prp.createdDateTime AS registeredDTM, prp.projectID, prj.eventDateStart, prj.eventDateFinish FROM project_participants prptcp JOIN project_recruit_participant prp ON prptcp.recruitID = prp.recruitID JOIN projects prj ON prj.project_id = prp.projectID WHERE prptcp.student_id = ? AND ? BETWEEN prj.eventDateStart AND prj.eventDateFinish ', [token.data.studentID, date])
      res.status(200).json({ status: 'success', payload: projects, data: token.data })
    }
    if (!token.isAuthenticated) {
      res.status(401).json({ status: 'error', payload: token.reason })
    }
  }
})

module.exports = router
