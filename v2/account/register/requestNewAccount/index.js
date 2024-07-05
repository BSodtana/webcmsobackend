const express = require('express')
const router = express.Router()
const prisma = require('../../../prisma')
const { CreateReferenceID } = require('./createReferenceString')
const { SendEmailForCode } = require('./sendMail')
const { v4: uuid } = require('uuid')

// /v2/account/register/getFirstnameAndLastnameWithStudentID

router.use('/verify-email', require('./verify-email'))
router.use('/create-password', require('./create-password'))

router.post('/', async (req, res) => {
  const { studentID, email } = req.body
  const referenceID = CreateReferenceID(6)
  const code = CreateReferenceID(6)
  console.log(uuid())
  try {
    await prisma.usercodeverification.upsert({
      where: { studentID: studentID },
      update: {
        studentID: studentID,
        code: code,
        referenceID: referenceID,
      },
      create: {
        studentID: studentID,
        code: code,
        referenceID: referenceID,
      },
    })
    await prisma.usercredentials.upsert({
      where: { studentID: studentID },
      update: {
        email: email,
        studentID: studentID,
        role: 'USER',
      },
      create: {
        email: email,
        studentID: studentID,
        role: 'USER',
        uuid: uuid(),
      },
    })

    const status = await SendEmailForCode(email, code)
    // const status = 'Y'
    if (status === 'Y')
      res.status(200).json({ email, studentID, referenceID, status: 'success' })
    if (status === 'N')
      res.status(500).json({ code: 500, detail: 'INTERNAL SERVER ERROR' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ code: 500, detail: 'INTERNAL SERVER ERROR' })
  }
})
module.exports = router
