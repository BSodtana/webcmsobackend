const db = require('../../../../../config/db')
const bcrypt = require('bcrypt')
const GenerateNewJwt = require('./generateNewJwt')

/**
 *
 * @param {object} req
 * @param {object} res
 */
async function newUser (req, res) {
  const { email, password, student_id } = req.body
  if (!email || !password || !student_id) res.status(400).json({ status: 'error', detail: 'username and/or password must be provided' })
  if (email && password && student_id) {
    // Check if the student id exist
    // Check if email is verified
    const getIfEmailVerified = await db.query('SELECT emailVerified FROM users_credential WHERE student_id = ? LIMIT 1', [email])
    const emailVerified = parseInt(getIfEmailVerified[0]?.emailVerified)
    // Email was not verified
    if (emailVerified) res.status(400).json({ status: 'error', detail: 'This email was not verified yet, contact IT support if you think this is an error', error_code: 'RG02-3' })
    // Email was verified
    if (!emailVerified) {
      try {
        // const salt = MakeSalt(100)
        const round = 14
        bcrypt.hash(password, round, async (err, hash) => {
          if (err) {
            res.status(500).json({ status: 'error', detail: `an error occured with encryption by bcrypt, plase explore console log for details, ${err}`, error_code: 'RG02-1' })
            console.log(err)
          }
          if (hash) {
            const pwd = hash
            // Store hashed password email and student_id into database
            await db.query('REPLACE users_credential SET student_id = ?, email = ?, password = ?, role = "user"', [student_id, email, pwd])
            const rowQuery = await db.query('SELECT role FROM users_credential WHERE student_id = ?', [student_id])
            const role = rowQuery[0]?.role
            const token = await GenerateNewJwt(student_id, role, '7d')
            res.status(200).json({ status: 'success', detail: 'a users was successfully created', token })
          }
        })
      } catch (err) {
        res.status(500).json({ status: 'error', detail: 'an error occured, please specify in console log', error_code: 'RG02-02' })
        throw new Error(err)
      }
    }
  }
}

module.exports = newUser
