const express = require('express')
const router = express.Router()
const prisma = require('../../../prisma')
const {
  CreateReferenceID,
} = require('../../register/requestNewAccount/createReferenceString')

// /v2/account/reset-password/request-verification-code
router.post('/', async (req, res) => {
  const { email } = req.body
  const code = CreateReferenceID(6)
  const refCode = CreateReferenceID(6)
  if (!email) {
    res.status(400).json({ detail: 'Email must be sent in request body' })
  }
  if (email) {
    const studentID = prisma.userCredentials.findFirst({
      where: { email: email },
      select: { student_id: true },
    })
    prisma.userCodeVerification.create({
      data: {
        student_id: studentID.student_id,
        code: code,
        referenceID: refCode,
      },
    })
    res
      .status(200)
      .json({ status: 'success', code: code, referenceID: refCode })
  }
})
module.exports = router
