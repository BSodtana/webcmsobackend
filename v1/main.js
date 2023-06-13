const express = require('express')
const router = express.Router()

// IMPORTS
const projects = require('./projects')
const user_management = require('./user-management/')
const structure = require('./structure')
const docxtemplates = require('./docx_templates')

router.use('/projects', projects)
router.use('/user-management', user_management)
router.use('/structure', structure)
router.use('/docx-template', docxtemplates)

router.get('/', (req, res) => {
  res.status(200).json({ currentPath: '/v1/' })
})

module.exports = router
