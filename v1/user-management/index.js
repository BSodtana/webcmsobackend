const express = require("express");
const router = express.Router();

const register = require("./register")
const data = require("./register/data")
const login = require("./login")
const credential = require("./data")
const permission = require("./affiliation")
const verify = require("./verify-email")

// path = /v1/user-management/
router.use("/register", register)
router.use("/data", data)
router.use("/login", login)
router.use("/credential", credential)
router.use("/affiliation", permission)
router.use("/verify", verify)


router.get("/", (req,res)=>{
    res.status(200).json({currentPath: "/v1/user-management/"})
})

module.exports = router;