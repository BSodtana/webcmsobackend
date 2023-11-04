const jwt = require('jsonwebtoken')
const JS_PRIVATE_KEY = require('../../../../../config/private')
const PRIVATE_KEY = JS_PRIVATE_KEY
async function GenerateNewJwt (studentID, role, expIn) {
  const token = jwt.sign({ studentID, role }, PRIVATE_KEY, { expiresIn: expIn })
  return token
}

module.exports = GenerateNewJwt
