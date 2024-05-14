const express = require('express')
const router = express.Router()
const prisma = require('../../../prisma')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JS_PRIVATE_KEY = require('../../../../config/private')

// /v2/account/login/emailandpassword

router.post('/', async (req, res) => {
  const { email, password } = req.body
  if (email && password) {
    const accountExist = await prisma.userCredentials.count({ where: { email } })
    if (!accountExist) res.status(401).json({ status: 401, detail: 'there is no user associated with this email' })
    if (accountExist) {
      const thisAccount = await prisma.userCredentials.findFirst({ where: { email }, select: { password: true, student_id: true } })
      const compare = await bcrypt.compare(password, thisAccount.password)
      if (compare) {
        const accountInformation = await prisma.users.findFirst(
          {
            where:
            {
              student_id:
              { equals: thisAccount.student_id }
            },
            select:
            { student_id: true, first_name: true, last_name: true, first_name_en: true, last_name_en: true, current_year: true, userCredential: { select: { email: true, role: true, updatedDateTime: true } } }
          })
        const token = await jwt.sign(accountInformation, JS_PRIVATE_KEY, { expiresIn: '30d' })
        res.status(200).json({ status: 'success', token, accountInformation })
      }
      if (!compare) res.status(400).json({ status: 401, detail: 'unauthorized' })
    }
  }
  if (!email || !password) {
    res.status(400).json({ status: 400, detail: 'Username OR password were not provided' })
  }
})
module.exports = router
