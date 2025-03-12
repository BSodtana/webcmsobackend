const axios = require('axios')

const sentMail = async (recipient, subject, HTMLcontent) => {
  try {
    const mail = await axios.post(
      `${process.env.MAIL_ENDPOINT_V2 || process.env.MAIL_ENDPOINT || 'https://w3.med.cmu.ac.th/api/v1/mail'}`,
      {
        subject: `[CMSO] ${subject}`,
        content: HTMLcontent,
        relay: 'no-reply-cmso.med@cmu.ac.th',
        mailsent: [recipient],
        mailmaster: 'relay-noname',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MAIL_ACCESS_TOKEN_V2 || process.env.MAIL_TOKEN}`,
        },
      }
    )
    return mail.data.status
  } catch (error) {
    console.log('[Email Error]', error)
    throw {
      code: 'EMAIL-ERROR',
      desc: { userData: { recipient, subject, HTMLcontent }, error },
    }
  }
}

module.exports = { sentMail }
