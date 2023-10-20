const verifyJwt = require('../../utils/jwtVerify')
const db = require('../../../config/db')

async function InsertNewProject (req, res) {
  const { orgID, projectName, projectDescription, projectDetail, eventDateStart, eventDateFinish } = req.body
  const token = req.headers.authorization?.split(' ')[1]
  const credential = await verifyJwt(token)
  if (credential.isAuthenticated) {
    const studentID = credential.data.studentID
    try {
      const projectID = await CreateNewProjectID(orgID)
      await db.query('INSERT INTO projects (project_id, student_id, orgID, projectName, projectDescription, projectDetail, eventDateStart, eventDateFinish) VALUES (?,?,?,?,?,?,?,?)',
        [projectID, studentID, orgID, projectName, projectDescription, projectDetail, eventDateStart, eventDateFinish])
      res.status(200).json({ status: 'success', detail: 'Insert successful' })
    } catch (err) {
      console.log(err)
      res.status(500).json({ status: 'error', detail: 'SQL query failure' })
    }
  }
  if (!credential.isAuthenticated) res.status(401).json({ status: 'error', detail: 'UNAUTHORIZED' })
}

async function CreateNewProjectID (orgID) {
  try {
    const rowsQuery = await db.query('SELECT COUNT(project_id) AS COUNT FROM projects WHERE orgID = ?', [orgID])
    const rows = parseInt(rowsQuery[0]?.COUNT, 10)
    const currentDTM = new Date()
    const year = currentDTM.getUTCFullYear()
    return `${orgID}-${rows + 1}-${year}`
  } catch (err) {
    throw new Error(err)
  }
}
module.exports = InsertNewProject
