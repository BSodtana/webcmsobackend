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
    const accountExist = await prisma.usercredentials.count({
      where: { email },
    })
    if (!accountExist)
      res.status(401).json({
        status: 401,
        detail: 'there is no user associated with this email',
      })
    if (accountExist) {
      const thisAccount = await prisma.usercredentials.findFirst({
        where: { email },
        select: { hashPassword: true, studentID: true },
      })
      const compare = await bcrypt.compare(password, thisAccount.hashPassword)
      if (compare) {
        const accountInformation = await prisma.users.findFirst({
          where: {
            studentID: { equals: thisAccount.studentID },
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
        res.status(200).json({ status: 'success', token, accountInformation })
      }
      if (!compare)
        res.status(400).json({ status: 401, detail: 'unauthorized' })
    }
  }
  if (!email || !password) {
    res
      .status(400)
      .json({ status: 400, detail: 'Username OR password were not provided' })
  }
})
module.exports = router
