const verifyJwt = require('../../../../utils/jwtVerify')
const db = require('../../../../../config/db')

async function UpdateUserPersonalData (req, res) {
  const token = req.header('Authorization')?.split(' ')[1]
  const { nick_name, phone_number, line_id, facebook, instagram, medical_condition, allergy, special_need } = req.body
  try {
    const cred = await verifyJwt(token)
    if (cred.isAuthenticated) {
      try {
        const studentID = cred.data.studentID
        await db.query('UPDATE users SET nick_name = ?, phone_number = ?, line_id = ?, facebook = ?, instagram=? , medical_condition=?, allergy=?, special_need=? WHERE student_id = ? LIMIT 1',
          [nick_name, phone_number, line_id, facebook, instagram, medical_condition, allergy, special_need, studentID])
        res.status(200).json({ status: 'success', detail: 'Data has been successfully updated' })
      } catch (err) {
        console.log(err)

        res.status(500).json({ status: 'error', detail: err, error_code: 'CRD02-2' })
      }
    }
    if (!cred.isAuthenticated) throw new Error('Not authenticated')
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: 'error', detail: err, error_code: 'CRD02-1' })
  }
}

module.exports = { UpdateUserPersonalData }
