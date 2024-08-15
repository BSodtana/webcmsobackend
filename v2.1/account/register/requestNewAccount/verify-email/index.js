const express = require('express')
const router = express.Router()
const prisma = require('../../../../prisma')

// /v2/account/register/getFirstnameAndLastnameWithStudentID
router.post('/', async (req, res) => {
  const { code, studentID, email, referenceID } = req.body
  try {
    const verifyCode = await prisma.userCodeVerification.findFirst({
      where: { student_id: studentID },
      select: { code: true, referenceID: true , student_id: true, },
    })
    if (verifyCode.code === code && verifyCode.referenceID === referenceID) {
      await prisma.userCredentials.update({
        where: { student_id: studentID },
        data: { emailVerified: 1 },
      })
      res.status(200).json({ status: 200, status: 'success' })
    } else {
      res.status(400).json({
        status: 400,
        detail: 'fail-either referenceID, code, or studentID is wrong',
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: 500, detail: 'INTERNAL SERVER ERROR' })
  }
})
module.exports = router
