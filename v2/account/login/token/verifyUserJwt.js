const prisma = require('../../../prisma')
const jwt = require('jsonwebtoken')
const JS_PRIVATE_KEY = require('../../../../config/private')

async function VerifyUserJWT(token) {
  if (!token || token === '')
    return {
      isAuthenticated: false,
      data: null,
      reason: 'jwt must be provided',
    }
  try {
    const isLogout = await prisma.userslogout.count({ where: { token } })
    if (isLogout)
      return { isAuthenticated: false, data: null, reason: 'USER_LOGGED_OUT' }
    if (!isLogout) {
      try {
        const verify = await jwt.verify(token, JS_PRIVATE_KEY)
        return { isAuthenticated: true, data: verify, reason: null }
      } catch (err) {
        throw new Error(err)
      }
    }
  } catch (err) {
    return { isAuthenticated: false, data: null, reason: err }
  }
}

module.exports = VerifyUserJWT
