const express = require("express");
const router = express.Router();
const db = require("../../../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
// const JS_PRIVATE_KEY = require("../../../config/private")

// ____/v1/user-management/login/
const jwtHandler = require("./jwt")

router.use("/jwt", jwtHandler)

router.post("/userandpass", async (req, res) => {
    let { email, password } = req.body
    if (email && password) {
        try {
            let credential = await db.query("SELECT email, password, uuid, student_id FROM users WHERE email = ? LIMIT 1", [email])
            if (credential.length === 0) res.status(400).json({ success: false, error: "NO_USER_USING_THIS_EMAIL" })
            if (credential.length === 1) {
                let compare = await bcrypt.compare(password, credential[0].password)
                if (compare) {
                    try {
                        let token = await jwt.sign({ uuid: credential[0].uuid, student_id: credential[0].student_id }, process.env.PRIVATE_KEY, { expiresIn: "1h" })
                        res.status(200).json({ success: true, jwt: token })
                    } catch (err) {
                        console.log(err)
                        res.status(500).json({ success: false, detail: err })
                    }
                }
                if (!compare) res.status(200).json({ success: false, jwt: null })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, error: err })
        }
    } else (
        res.status(400).json({ success: false, error: `Request body malformed, both username and password are required, you provided only ${email ? "email" : password ? "password" : "none"}` })
    )
})

module.exports = router;