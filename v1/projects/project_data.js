const express = require('express')
const router = express.Router()
const db = require('../../config/db')

// PATH : /projects/

const projects_list = require('./projects_list')

router.get('/:project_id', async (req, res) => {
  const { project_id } = req.params
  try {
    const data = await db.query('SELECT project_id, student_id, proj.orgID, projectName, projectDescription, projectDetail, eventDateStart, eventDateFinish FROM projects proj JOIN organizations org ON org.orgID = proj.orgID WHERE project_id = ? LIMIT 1', [project_id])
    res.status(200).json({ status: 'success', payload: data[0] })
  } catch (err) {
    res.status(500).json({ status: 'error', payload: err })
  }
})

module.exports = router
