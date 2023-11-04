const db = require('../../../../../config/db')
const axios = require('axios')
const { MAIL_TOKEN, MAIL_ENDPOINT } = require('../../../../../config/mail')
const { MakeRandomStringCapitalAndNumber } = require('../../helper')
async function SendMailToUserToGetEmailVerified (req, res) {
  const { email, student_id } = req.body
  const code = MakeRandomStringCapitalAndNumber(6)
  const referenceID = MakeRandomStringCapitalAndNumber(5)
  try {
    // ใส่อีเมลลงในฐานข้อมูล
    await db.query('REPLACE INTO users_credential (student_id, email) VALUES (?,?)', [student_id, email])
    //   ใส่โค้ดลงในฐานข้อมูล
    await db.query('INSERT INTO users_code_verification (student_id, code, referenceID) VALUES (?,?,?) ON DUPLICATE KEY UPDATE code = ?, referenceID = ?', [student_id, code, referenceID, code, referenceID])
    ส่งอีเมล
    const sendmail = await axios.post(
        `${MAIL_ENDPOINT}`,
        {
          subject: `${code} คือรหัสยืนยันของคุณ`,
          content: `
            <style>
                h1 {text-align: center;}
                p {text-align: center;}
            </style>
          <h2>ยินดีต้อนรับสู่ CMSO SuperPlatform</h2><br/></br>
          <p>โปรดกรอกรหัสที่อยู่ด้านล่างนี้ลงในเว็บไซต์เพื่อยืนยันอีเมล</p><br/>
          <div><h1>${code}</h1></div><br/><br/>
          <p>Reference ID: ${referenceID}</p>
          <strong>อีเมลฉบับนี้ถูกสร้างโดยอัตโนมัติ หากท่านพบปัญหาให้ติดต่อฝ่ายพัฒนาเทคโนโลยีและสารสนเทศ สโมสรนักศึกษาคณะแพทยศาสตร์ มหาวิทยาลัยเชียงใหม่</strong><br/>`,
          relay: 'no-reply-cmso.med@cmu.ac.th',
          mailsent: [email],
          mailmaster: 'relay-noname'
        },
        {
          headers: {
            Authorization: `Bearer ${MAIL_TOKEN}`
          }
        }
    )
    // const sendmail = { data: { status: 'Y' } }
    if (sendmail.data.status === 'Y') res.status(200).json({ status: 'success', detail: 'An email was successfully sent', referenceID })
    if (sendmail.data.status === 'N') res.status(500).json({ status: 'error', detail: 'An email was not sent', error_code: 'RG03-2' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: 'error', detail: err, error_code: 'RG03-99' })
  }
}

module.exports = SendMailToUserToGetEmailVerified
