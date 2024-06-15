const express = require('express')
const router = express.Router()
const prisma = require('../../prisma')
// /v2/account/logout
router.get('/', async (req, res) => {
  const header = req.headers.authorization?.split(' ')[1]
  try {
    await prisma.usersLogout.create({ data: { token: header } })
    res.status(200).json({ status: 200, detail: 'THE LOGOUT IS SUCCESSFUL' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 500, error: 'INTERNAL SERVER ERROR' })
  }
})
module.exports = router
