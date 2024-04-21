const { PrismaClient } = require('@prisma/client')
const express = require('express')
const router = express.Router()
const db = require('../../config/db')
const prisma = new PrismaClient()

// PATH: /projects/list

router.get('/:page', async (req, res) => {
  await GetProjectList(req, res)
})

async function GetProjectList (req, res) {
  const { page } = req.params
  // const query_from = page === 1 ? 1 * 20 : (page - 1) * 20
  // const query_until = 20
  try {
    const count = await prisma.projects.count()
    console.log(count)
    const projects = await prisma.projects.findMany({
      include: { projectData: true, ownerData: { select: { first_name: true, last_name: true, first_name_en: true, last_name_en: true } } }
    })
    // const list = await db.query(
    //   'SELECT project_id, p.student_id, CONCAT(u.first_name," ",u.last_name," (",u.nick_name,")") AS ownerName, o.orgID, o.orgName, projectName, projectDescription, projectDetail, eventDateStart, eventDateFinish FROM projects p JOIN users u ON u.student_id = p.student_id JOIN organizations o ON o.orgID = p.orgID ORDER BY eventDateStart DESC LIMIT ? OFFSET ?',
    //   [query_until, query_from]
    // )
    res.status(200).json({
      success: true,
      page_no: page,
      number_of_project: count,
      number_of_page:
        Math.ceil(count / 20) === 0
          ? 1
          : Math.ceil(count / 20),
      payload: projects
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, payload: err })
  }
}

module.exports = router
