const express = require('express')
const router = express.Router()
const db = require('../../../config/db')
const verifyJwt = require('../../utils/jwtVerify')

// ____/v1/user-management/affiliation/

const current = require('./current')

router.get('/', (req, res) => {
  res.status(418).json({ status: 'fail', error: "You are not giving me page number, I'm not brewing" })
})

router.use('/current', current)

router.get('/:year-P:page', async (req, res) => {
  let { year, page } = req.params || 1
  try {
    // let query = await db.query("SELECT users.student_id, first_name, middle_name, last_name, current_year, affiliated_club, affiliated_division FROM users JOIN user_affiliation ON users.uuid = user_affiliation.uuid")
    const countQuery = await db.query('SELECT COUNT(DISTINCT(users.student_id)) AS COUNT FROM users WHERE current_year = ?', [year])
    page = parseInt(page)
    const count = parseInt(countQuery[0].COUNT)
    let offset = page !== 1 ? (page - 1) * 50 : 0
    const mainQuery = await db.query('SELECT student_id, uuid, CONCAT(first_name," ",  last_name) AS full_name, current_year, email FROM users WHERE current_year = ? ORDER BY student_id ASC LIMIT ? OFFSET ?', [year, 50, offset])
    res.status(200).json({
      payload: {
        current_page: page,
        records: count,
        number_of_pages: Math.ceil(count / 50),
        begin: offset = 0 ? 1 : offset + 1,
        end: offset + 49,
        list: mainQuery
      }
    })
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})

router.get('/id/:id', async (req, res) => {
  s
  const { id } = req.params
  try {
    // let query = await db.query("SELECT users.student_id, first_name, middle_name, last_name, current_year, affiliated_club, affiliated_division FROM users JOIN user_affiliation ON users.uuid = user_affiliation.uuid")
    const mainQuery = await db.query('SELECT student_id, CONCAT(first_name," ",  last_name) AS full_name, current_year, email FROM users WHERE student_id LIKE ? ORDER BY student_id ASC', [`%${id}%`])
    res.status(200).json({
      payload: {
        list: mainQuery
      }
    })
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})

router.put('/:uuid', async (req, res) => {
  const token = req.header('Authorization')
  const { affiliation } = req.body
  try {
    const verify = await verifyJwt(token)
    if (verify.isAuthenticated) {
      try {

      } catch (err) {
        res.status(500).json(err)
      }
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
