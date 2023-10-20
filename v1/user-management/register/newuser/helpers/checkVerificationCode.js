const db = require('../../../../../config/db')

async function CheckVerificationCode (req, res) {
  const { studentID, referenceID, code } = req.body
  console.log({ studentID, referenceID, code })
  if (!studentID || !referenceID || !code) res.status(400).json({ status: 'error', detail: 'studentID, refernceID, code one of them was not provided', error_code: 'RG04-1' })
  if (studentID && referenceID && code) {
    try {
      const data = await db.query('SELECT code, referenceID FROM users_code_verification WHERE student_id = ? LIMIT 1', [studentID])
      const dbData = data[0]
      if (dbData.referenceID === referenceID && dbData.code === code) {
        db.query('UPDATE users_credential SET emailVerified = 1 WHERE student_id = ?', [studentID])
        res.status(200).json({ status: 'success', detail: 'An email is successfully verified' })
      }
      if (dbData.referenceID !== referenceID || dbData.code !== code) {
        res.status(400).json({ status: 'error', detail: 'referenceID OR code does not match those in database', error_code: 'RG04-3' })
      }
    } catch (err) {
      res.status(500).json({ status: 'error', detail: err, error_code: 'RG04-2' })
    }
  }
}

module.exports = CheckVerificationCode
