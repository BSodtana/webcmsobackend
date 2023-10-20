const jwt = require('jsonwebtoken')
const PRIVATE_KEY = process.env.PRIVATE_KEY
async function GenerateNewJwt (studentID, role, expIn) {
  const token = jwt.sign({ studentID, role }, PRIVATE_KEY, { expiresIn: expIn })
  return token
}

module.exports = GenerateNewJwt
