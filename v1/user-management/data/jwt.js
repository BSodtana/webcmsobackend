const express = require('express')
const router = express.Router()
const db = require('../../../config/db')
const verifyJwt = require('../../utils/jwtVerify')
const { UpdateUserPersonalData } = require('./Helpers/UpdateUserPersonalData')

// ____/v1/user-management/credential/

router.get('/', async (req, res) => {
  const token = req.header('Authorization')?.split(' ')[1]
  try {
    const verify = await verifyJwt(token)
    if (verify.isAuthenticated) {
      try {
        const query = await db.query('SELECT title, first_name, last_name, nick_name, student_id, current_year, phone_number, line_id, facebook, instagram, medical_condition, allergy, special_need, createdDateTime FROM users WHERE student_id = ? LIMIT 1', [verify.data.studentID])
        const account = await db.query('SELECT email FROM users_credential WHERE student_id = ? LIMIT 1', [verify.data.studentID])
        // Must include role query
        const vaccine = await db.query('SELECT dose, type, date FROM users_vaccine WHERE owner_uuid = ?', [verify.data.studentID])
        const infection = await db.query('SELECT dose, date FROM users_infection WHERE owner_uuid = ?', [verify.data.studentID])
        if (query.length === 1) res.status(200).json({ isAuthenticated: true, data: { basics: query[0], account: account[0], vaccine, infection }, reason: null })
        if (query.length === 0) res.status(400).json({ isAuthenticated: false, data: '', reason: 'cannot find user based on uuid from token, suspect malfored token.', error_code: 'CRD01-2' })
      } catch (err) {
        res.status(500).json({ status: 'error', detail: err, error_code: 'CRD01-3' })
      }
    }
    if (!verify.isAuthenticated) res.status(401).json({ isAuthenticated: false, data: '', reason: 'Unauthorized access', error_code: 'CRD01-1' })
  } catch (err) {
    res.status(500).json({ status: 'error', detail: err, error_code: 'CRD01-4' })
  }
})

router.put('/', async (req, res) => {
  await UpdateUserPersonalData(req, res)
})

module.exports = router
