const express = require('express')
const router = express.Router()
const db = require('../../../config/db')
const verifyJwt = require('../../utils/jwtVerify')

// PATH: /projects/user/register

router.get('/:recruitID', async (req, res) => {
  const { recruitID } = req.params
  const jwt = req.header('Authorization')?.split(' ')[1]
  const positionID = await generateParticipantPositionID(recruitID)
  if (!jwt) res.status(400).json({ status: 'error', payload: 'No JWT provided - Bad Request' })
  console.log(positionID)
  if (jwt) {
    const token = await verifyJwt(jwt)
    if (token.isAuthenticated) {
      await db.query('INSERT INTO project_participants (participantPositionID, recruitID, student_id) VALUES (?,?,?) ', [positionID, recruitID, token.data.studentID])
      res.status(200).json({ status: 'success', payload: { positionID }, data: token.data })
    }
    if (!token.isAuthenticated) {
      res.status(401).json({ status: 'error', payload: token.reason })
    }
  }
})

async function generateParticipantPositionID (recruitID) {
  if (!recruitID) throw new Error('recruitID MUST be provided')
  const data = await db.query('SELECT COUNT(DISTINCT(student_id)) AS count FROM project_participants WHERE recruitID = ? ', [recruitID])
  const rows = parseInt(data[0].count)
  if (rows < 9) return (`${recruitID}-00${rows + 1}`)
  if ((rows < 99) && (rows >= 9)) return (`${recruitID}-0${rows + 1}`)
  if (rows >= 99) return (`${recruitID}-${rows + 1}`)
}

module.exports = router
