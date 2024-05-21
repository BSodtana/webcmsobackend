const express = require('express')
const router = express.Router()
const prisma = require('../../../prisma')

// /v2/account/register/getFirstnameAndLastnameWithStudentID
router.get('/:studentID', async (req, res) => {
  const { studentID } = req.params
  const count = await prisma.users.count({
    where: { student_id: { equals: parseInt(studentID) } },
  })
  const userExist = await prisma.userCredentials.count({
    where: { student_id: { equals: parseInt(studentID) } },
  })
  if (count) {
    const data = await prisma.users.findFirst({
      where: { student_id: { equals: parseInt(studentID) } },
      select: { first_name: true, last_name: true, current_year: true },
    })
    if (userExist)
      res.status(200).json({
        status: 'existed',
        first_name: data.first_name,
        last_name: data.last_name,
        year: data.current_year,
      })
    else {
      res.status(200).json({
        status: 'success',
        first_name: data.first_name,
        last_name: data.last_name,
        year: data.current_year,
      })
    }
  }
  if (!count) res.status(200).json({ status: 'not found' })
})
module.exports = router
