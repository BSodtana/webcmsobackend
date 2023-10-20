const express = require('express')
const router = express.Router()
const db = require('../../../config/db')

// ____/v1/user-management/register
const newuser = require('./newuser')
router.use('/newuser', newuser)

//
// This get request is at route /v1/user-management/register/
// It requires paramater stu_id else it return error 404
// It return name, and year of the user
// It return JWT that contains studentID
//
router.get('/:stu_id', async (req, res) => {
  const { stu_id } = req.params
  let prior
  if (stu_id) {
    try {
      // Check if this user exist in student database
      const query = await db.query(
        'SELECT student_id from users WHERE student_id = ? LIMIT 1',
        [stu_id]
      )
      // If no user is associated with this student id
      if (!query.length) {
        res
          .status(200)
          .json({ studentIdIsValid: false, priorRegister: prior, data: null })
      }
      // If there is user associated with this id
      if (query.length) {
        try {
          const getData = await db.query(
            'SELECT student_id, title, first_name, last_name, current_year from users WHERE student_id = ? LIMIT 1',
            [stu_id]
          )
          res
            .status(200)
            .json({
              studentIdIsValid: true,
              priorRegister: prior,
              data: getData[0]
            })
        } catch (err) {
          res.status(500)
          console.error({ module: 'register initiation from stu_id' })
          throw err
        }
      }
    } catch (err) {
      res.status(500)
      console.error({ path: '/v1/user-management/register', error: err })
    }
  }
})

module.exports = router
