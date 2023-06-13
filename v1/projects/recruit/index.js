const express = require('express')
const router = express.Router()

// PATH : /projects/recruit
const projects = require('./projects')
router.use('/projects/', projects)

router.get('/', (req, res) => {
  res.status(200).json({ current_path: '/projects/recruit' })
})

module.exports = router
