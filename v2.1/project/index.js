const express = require('express')
const prisma = require('../prisma')
const router = express.Router()

// /v2/project/

router.use('/my-project', require('./my-project'))

router.get('/', (req, res) => {
  const today = new Date()
  const month = today.getMonth()
  const firstDayOfMonth = new Date(today.setDate(1))
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  res.status(200).json({
    currentPath: '/v2/project',
    month,
    firstDayOfMonth,
    lastDayOfMonth,
  })
})

module.exports = router
