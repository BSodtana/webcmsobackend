const express = require('express')
const router = express.Router()
const db = require('../../../../config/db')
// PATH: /projects/recruit/participant/count/

router.get('/by-recruit-id/:recruitID', async (req, res) => {
  const { recruitID } = req.params
  try {
    const da = await db.query('SELECT COUNT(DISTINCT(student_id)) AS COUNT FROM project_participants WHERE recruitID = ?', [recruitID])
    const rows = parseInt(da[0].COUNT)
    res.status(200).json({ status: 'success', payload: { recruitID, count: rows } })
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: 'error', detail: 'Internal Server Error' })
  }
})

router.get('/by-project-id/:projectID', async (req, res) => {
  const { projectID } = req.params
  try {
    const da = await db.query('SELECT recruitID, CAST(COUNT(DISTINCT(student_id)) AS DECIMAL) AS COUNT FROM project_participants WHERE recruitID LIKE ? GROUP BY recruitID', [`${projectID}%`])
    console.log(da)
    res.status(200).json({ status: 'success', payload: da })
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: 'error', detail: 'internal server error' })
  }
})

module.exports = router
