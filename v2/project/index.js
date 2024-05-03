const express = require('express')
const router = express.Router()

// /v2/project/

router.use('/my-project', require('./my-project'))

router.get('/', (req, res) => {
  res.status(200).json({ currentPath: '/v2/project' })
})

module.exports = router
