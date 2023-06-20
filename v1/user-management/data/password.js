const express = require('express')
const router = express.Router()
const db = require('../../../config/db')
const verifyJwt = require('../../utils/jwtVerify')
const bcrypt = require('bcrypt')

// ____/v1/user-management/credential/

router.put('/', async (req, res) => {
  const token = req.header('Authorization')?.split(' ')[1]
  const { oldPwd, newPwd } = req.body
  try {
    const verify = await verifyJwt(token)
    if (verify.isAuthenticated) {
      const studentID = verify.data.studentID
      try {
        const query = await db.query('SELECT password FROM users_credential WHERE student_id = ? LIMIT 1', [studentID])
        const compare = await bcrypt.compare(oldPwd, query[0].password)
        if (!compare) res.status(200).json({ success: false, reason: 'OLD_PASSWORD_MISMATCH' })
        if (compare) {
          try {
            const round = 14
            bcrypt.hash(newPwd, round, async (err, hash) => {
              if (err) res.status(500).json({ status: 'error', error_code: 'PD01-1' })
              await db.query('UPDATE users_credential SET password = ?, createdDateTime = NOW() WHERE student_id = ? LIMIT 1', [hash, studentID])
              res.status(200).json({ success: true })
            })
          } catch (err) {
            console.log(err)
            throw new Error(err)
          }
        }
      } catch (err) {
        console.log(err)
        res.status(500).json({ status: 'error', detail: err, error_code: 'PD01-3' })
      }
    }
    if (!verify.isAuthenticated) res.status(401).json({ isAuthenticated: false, data: '', reason: 'Unauthorized access', error_code: 'PD01-2' })
  } catch (err) {
    res.status(500).json({ status: 'error', detail: err, error_code: 'PD01-4' })
  }
})

module.exports = router
