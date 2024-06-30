const express = require('express')
const router = express.Router()
const prisma = require('../../../prisma')

// /v2/account/register/getFirstnameAndLastnameWithStudentID
router.get('/:studentID', async (req, res) => {
  const { studentID } = req.params
  const count = await prisma.users.count({
    where: { studentID: { equals: studentID } },
  })
  const userExist = await prisma.usercredentials.count({
    where: { studentID: { equals: studentID } },
  })
  if (count) {
    const data = await prisma.users.findFirst({
      where: { studentID: { equals: studentID } },
      select: { firstNameTH: true, lastNameTH: true, currentYear: true },
    })
    if (userExist)
      res.status(200).json({
        status: 'existed',
        firstNameTH: data.firstNameTH,
        lastNameTH: data.lastNameTH,
        currentYear: data.currentYear,
      })
    else {
      res.status(200).json({
        status: 'success',
        firstNameTH: data.firstNameTH,
        lastNameTH: data.lastNameTH,
        currentYear: data.currentYear,
      })
    }
  }
  if (!count) res.status(200).json({ status: 'not found' })
})
module.exports = router
