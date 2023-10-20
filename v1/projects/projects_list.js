const express = require('express')
const router = express.Router()
const db = require('../../config/db')

// PATH: /projects/list

router.get('/:page', async (req, res) => {
  const { page } = req.params
  const query_from = page === 1 ? 1 * 20 : (page - 1) * 20
  const query_until = 20
  try {
    const count = await db.query(
      'SELECT COUNT(project_id) AS COUNT FROM projects'
    )
    const list = await db.query(
      'SELECT project_id, p.student_id, CONCAT(u.first_name," ",u.last_name," (",u.nick_name,")") AS ownerName, o.orgID, o.orgName, projectName, projectDescription, projectDetail, eventDateStart, eventDateFinish FROM projects p JOIN users u ON u.student_id = p.student_id JOIN organizations o ON o.orgID = p.orgID ORDER BY eventDateStart DESC LIMIT ? OFFSET ?',
      [query_until, query_from]
    )
    res.status(200).json({
      success: true,
      page_no: page,
      number_of_project: parseInt(count[0].COUNT),
      number_of_page:
        Math.ceil(parseInt(count[0].COUNT) / 20) === 0
          ? 1
          : Math.ceil(parseInt(count[0].COUNT) / 20),
      payload: list
    })
  } catch (err) {
    res.status(500).json({ success: false, payload: err })
  }
})

module.exports = router
