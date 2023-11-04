const express = require('express')
const router = express.Router()

// PATH : /projects/recruit
const participant = require('./participant')
router.use('/participant', participant)
// router.use('/staff/', staff)

router.get('/', (req, res) => {
  res.status(200).json({ current_path: '/projects/recruit' })
})

module.exports = router
