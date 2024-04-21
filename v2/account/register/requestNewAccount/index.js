const express = require('express')
const router = express.Router()
const prisma = require('../../../prisma')
const { CreateReferenceID } = require('./createReferenceString')
const { SendEmailForCode } = require('./sendMail')

// /v2/account/register/getFirstnameAndLastnameWithStudentID

router.use('/verify-email', require('./verify-email'))
router.use('/create-password', require('./create-password'))

router.post('/', async (req, res) => {
  const { studentID, email } = req.body
  const referenceID = CreateReferenceID(6)
  const code = CreateReferenceID(6)
  try {
    await prisma.userCodeVerification.upsert({
      where: { student_id: studentID },
      update: {
        student_id: studentID,
        code: code,
        referenceID: referenceID,
      },
      create: {
        student_id: studentID,
        code: code,
        referenceID: referenceID,
      },
    })
    await prisma.userCredentials.upsert({
      where: { student_id: studentID },
      update: {
        email: email,
        student_id: studentID,
        role: 'USER',
      },
      create: {
        email: email,
        student_id: studentID,
        role: 'USER',
      },
    })
    const status = await SendEmailForCode(email, code)
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
