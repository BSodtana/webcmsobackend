const MAIL_TOKEN = process.env.MAIL_TOKEN
const MAIL_ENDPOINT = process.env.MAIL_ENDPOINT_V2 || process.env.MAIL_ENDPOINT || 'https://w3.med.cmu.ac.th/api/v1/mail'

module.exports = { MAIL_TOKEN, MAIL_ENDPOINT }
