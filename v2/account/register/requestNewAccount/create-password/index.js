const express = require('express')
const router = express.Router()
const prisma = require('../../../../prisma')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JS_PRIVATE_KEY = require('../../../../../config/private')

// /v2/account/register/getFirstnameAndLastnameWithStudentID
router.post('/', async (req, res) => {
  const { studentID, email, password } = req.body
  console.log(typeof studentID)
  console.log(studentID, email, password)
  try {
    if (!studentID || !email || !password)
      res.status(401).json({ status: 'fail', detail: 'BAD REQUEST' })
    if (studentID && email && password) {
      bcrypt.hash(password, 14, async (error, hash) => {
        if (error) {
          res.status(500).json({
            status: 'error',
            detail: `an error occured with encryption by bcrypt, plase explore console log for details, ${err}`,
          })
          console.log(err)
        }
        if (hash) {
          const password = hash
          await prisma.usercredentials.update({
            where: { studentID: studentID },
            data: { hashPassword: password },
          })

          const accountInformation = await prisma.users.findFirst({
            where: {
              studentID: { equals: studentID },
            },
            select: {
              studentID: true,
              firstNameTH: true,
              lastNameTH: true,
              firstNameEN: true,
              lastNameEN: true,
              currentYear: true,
              usercredentials: {
                select: { email: true, role: true, updatedDateTime: true },
              },
            },
          })
          const token = await jwt.sign(accountInformation, JS_PRIVATE_KEY, {
            expiresIn: '30d',
          })
          await prisma.usercodeverification.delete({
            where: { studentID: studentID },
          })
          res.status(200).json({
            status: 'success',
            token: token,
            detail: 'PASSWORD IS CREATED',
          })
        }
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: 'fail', detail: 'INTERNAL SERVER ERROR' })
  }
})
module.exports = router
