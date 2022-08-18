const express = require("express")
const morgan = require("morgan")
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require("cors")
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors({
    origin: ["http://127.0.0.1:5173","https://cmso.med.cmu.ac.th"]
}))
const port = process.env.port || 8080

const logger = morgan("common")
// IMPORT API V1
const v1 = require("./v1/main")

app.use(logger)
app.use("/v1", v1)

app.get("/", (req,res)=>{
    res.status(200).json({status: `Server is Up and Running at port ${port}`, ENV_PORT: process.env.PORT})
})

app.listen(port, ()=>{
    console.log(`Server is up and running at port ${port}`)
})