const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require('cors')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const path = require('path')

app.use(
  cors({
    origin: [
      'https://cmso.med.cmu.ac.th',
      'http://localhost:3000',
      'http://10.125.161.181:3000',
    ],
  })
)
const port = process.env.PORT || 8080

const logger = morgan('dev')
// IMPORT API V1
const v1 = require('./v1/main')
const v2 = require('./v2/main')
const v2_1 = require('./v2.1/main')

app.use(logger)
app.use('/v1', v1)
app.use('/v1/static', express.static(path.join(__dirname, './assets')))

app.use('/v2', v2)
app.use('/v2/static', express.static(path.join(__dirname, './assets')))

app.use('/v2.1', v2_1)
app.use('/v2.1/static', express.static(path.join(__dirname, './assets')))

app.get('/', (req, res) => {
  res.status(200).json({
    status: `Server is Up and Running at port ${port}`,
    ENV_PORT: process.env.PORT,
  })
})
 


app.listen(port, () => {
  console.log(`Server NODE CMSO BACKEND is up and running at port ${port}`)
})
