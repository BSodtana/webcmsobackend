const verifyJwt = require('../../utils/jwtVerify')
const db = require('../../../config/db')

async function DataProvider (req, res) {
  const token = req.header('Authorization')?.split(' ')[1] || null
  const { projectID } = req.params
  const tokenData = await verifyJwt(token)
  if (tokenData.isAuthenticated) {
    const projectDetail = await db.query(
      'SELECT project_id, p.student_id, CONCAT(u.first_name," ",u.last_name," (",u.nick_name,")") AS ownerName, o.orgID, o.orgName, projectName, projectDescription, projectDetail, eventDateStart, eventDateFinish FROM projects p JOIN users u ON u.student_id = p.student_id JOIN organizations o ON o.orgID = p.orgID WHERE project_id = ? AND p.student_id = ?',
      [projectID, tokenData.data.studentID]
    )
    const participantRecruit = await db.query('SELECT * FROM project_recruit_participant WHERE projectID = ?', [projectID])
    const staffRecruit = await db.query('SELECT * FROM project_recruit_staff WHERE projectID = ?', [projectID])

    console.log(projectDetail)
    res.status(200).json({ status: 'success', payload: { projectDetail: projectDetail[0], participantRecruit, staffRecruit } })
  }
  if (!tokenData.isAuthenticated) {
    res.status(401).json({ status: 'error', payload: 'TOKEN IS NOT AUTHENTICATED NOR NOT AUTHORIZED' })
  }
}

module.exports = DataProvider
